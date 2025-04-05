import { useState, useEffect } from "react";
import { SquarePen } from "lucide-react"; 
import FormEditProfile from "../profilepage/FormEditProfile";

const DEFAULT_PROFILE_DATA = {
  name: "",
  email: "",
  password: "••••••••"
};


export default function ButtonEdit() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(DEFAULT_PROFILE_DATA);
  const [Token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // First, get the token from localStorage
        const storedToken = localStorage.getItem("authToken");
        console.log("Stored token:", storedToken);
  
        if (!storedToken) {
          throw new Error("No authentication token found");
        }
  
        setToken(storedToken);
  
        // Use the token to fetch the profile
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
  
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
  
        const data = await response.json();
        console.log("Profile data:", data);
        setProfileData(data);
        setLoading(false);
        const profileId = data.profile?.id;
        if (profileId) {
          localStorage.setItem("userId", profileId);
          console.log("User ID stored in localStorage:", profileId);
        } else {
          console.error("userId not found in response data");
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []);

  const handleSave = (updatedData) => {
    setProfileData(updatedData);
    setIsEditing(false);
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  return (
    <div className="flex flex-col items-center mt-20">
      <img
        className="h-24 w-24 rounded-full border border-gray-300"
        // src="https://media.licdn.com/dms/image/D4D12AQENkvRx8RBR8w/article-cover_image-shrink_720_1280/0/1682548841817?e=2147483647&v=beta&t=gtKEFL5W6SJ0I2MD-RXKPCYXJKlDBFuxJqQJBCLNog4"
        src={"https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg"}
        alt="Profile"
      />

      <div className="flex items-center justify-center gap-3 mt-3">
        <h1 className="text-xl font-medium text-gray-800">{profileData.profile?.username}</h1>
        <button
          onClick={toggleEditing}
          className="text-gray-600 hover:text-gray-800 transition-all"
          aria-label="Edit profile"
        >
          <SquarePen className="w-5 h-5 text-gray-500 hover:text-[#A27B5C]" />
        </button>
      </div>
      
      <h1 className="text-md font-medium text-gray-500">{profileData.profile?.email}</h1>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isEditing 
            ? "opacity-100 max-h-[600px] mt-4" 
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        <FormEditProfile
          initialData={profileData}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    </div>
  );
}