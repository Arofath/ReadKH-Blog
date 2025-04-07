import { useState, useEffect } from "react";
import { SquarePen } from "lucide-react";

const DEFAULT_PROFILE_DATA = {
  profile: {
    username: "",
    bio: "",
    profileUrl: "",
  },
};

export default function ButtonEdit() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(DEFAULT_PROFILE_DATA);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bioInput, setBioInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const storedToken = localStorage.getItem("authToken");
        if (!storedToken) throw new Error("No authentication token found");
        setToken(storedToken);

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setProfileData(data);
        setBioInput(data.profile?.bio || "");
        setPreviewImage(data.profile?.profileUrl || "");
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle image upload
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Image upload failed: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      const imageUrl = result?.files?.[0]?.url;

      if (!imageUrl) {
        throw new Error("No image URL returned from upload");
      }

      return imageUrl;
    } catch (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
  };
  
  

  const handleSave = async () => {
    try {
      let profileUrl = profileData.profile?.profileUrl;

      if (selectedImage) {
        profileUrl = await handleImageUpload(selectedImage);
      }
      console.log("profileUrl:", profileUrl);	
      

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bio: bioInput,
            profileUrl,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedData = await response.json();
      setProfileData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          bio: updatedData.bio,
          profileUrl: updatedData.profileUrl,
        },
      }));
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4 sm:px-0">
      <img
        className="h-24 w-24 rounded-full border border-gray-300 object-cover"
        src={
          previewImage ||
          "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg"
        }
        alt="Profile"
      />

      <div className="flex items-center justify-center gap-3 mt-3">
        <h1 className="text-xl font-medium text-gray-800">
          {profileData.profile?.username}
        </h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-gray-600 hover:text-gray-800 transition-all"
          aria-label="Edit profile"
        >
          <SquarePen className="w-5 h-5 text-gray-500 hover:text-[#A27B5C]" />
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-2 text-center max-w-md">
        {profileData.profile?.bio || "No bio added yet."}
      </p>

      {successMessage && (
        <div className="text-green-600 mt-2 text-sm font-medium">
          ✅ {successMessage}
        </div>
      )}

      {isEditing && (
        <div className="mt-4 w-full max-w-md">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#A27B5C]"
            rows={4}
            placeholder="Write your bio..."
            value={bioInput}
            onChange={(e) => setBioInput(e.target.value)}
          />

          <label className="mt-3 inline-block cursor-pointer px-4 py-2 bg-[#A27B5C] text-white text-sm rounded hover:bg-[#8b664a] transition-all">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <div className="flex justify-end gap-3 mt-2">
            <button
              className="px-4 py-1 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 rounded bg-[#A27B5C] text-white hover:bg-[#8b664a]"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
