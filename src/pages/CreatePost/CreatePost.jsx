import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

const CreatePost = () => {
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [setPosts] = useState([]); // Added state for posts
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" });
  const { id } = useParams();

  const navigate = useNavigate();

  // Fetch categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/categories`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();
        console.log("Result:", result);

        if (Array.isArray(result)) {
          const categoryOptions = result.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }));
          setCategories(categoryOptions);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        showNotification(
          "Failed to load categories. Please try again.",
          "error"
        );
      }
    };

    fetchCategories();
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      showNotification("Please login to access this page.", "error");
      navigate("/login");
    }
  }, [navigate]);

  // Fetch posts when the component loads
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/blogs/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch post");

        const data = await response.json();

        setTitle(data.title);
        setValue(data.content);
        setSelectedCategories(
          data.categories?.map((cat) => ({ value: cat.id, label: cat.name })) ||
            []
        );
        if (data.thumbnail) {
          setCoverImage({
            preview: data.thumbnail,
            uploadedUrl: data.thumbnail,
          });
        }
      } catch (err) {
        console.error(err);
        showNotification("Failed to load post for editing.", "error");
      }
    };

    fetchPost();
  }, [id]);

  // Show notifications
  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  // Handle cover image upload
  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        setCoverImage({
          preview: e.target.result,
          file: file,
        });

        try {
          const imageUrl = await handleImageUpload(file);
          setCoverImage({
            preview: e.target.result,
            file: file,
            uploadedUrl: imageUrl,
          });
        } catch (error) {
          console.error("Error uploading image:", error);
          showNotification(
            "Failed to upload image. Please try again.",
            "error"
          );
        }
      };
      reader.readAsDataURL(file);
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

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!value.trim()) {
      newErrors.content = "Content is required";
    }

    if (selectedCategories.length === 0) {
      newErrors.categories = "At least one category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Handle post publishing
  const handlePublish = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Upload image if available
      let imageUrl = null;
      if (coverImage && coverImage.file) {
        imageUrl = coverImage.uploadedUrl;
      }

      // Step 2: Create blog post with the image URL if available
      const token = localStorage.getItem("authToken");

      const postData = {
        title,
        content: value,
        category_ids: selectedCategories.map((cat) => cat.value),
      };

      if (imageUrl) {
        postData.thumbnail = imageUrl;
      }

      const blogResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}/blogs${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!blogResponse.ok) {
        const errorBody = await blogResponse.text();
        console.error("Blog creation error:", errorBody);
        throw new Error(
          `Blog creation failed: ${blogResponse.status} ${errorBody}`
        );
      }

      const blogResult = await blogResponse.json();
      console.log("Blog created successfully:", blogResult);

      // Step 3: Re-fetch posts after publishing
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/blogs`);
      const posts = await response.json();

      // Check if the response is an array before trying to sort
      if (Array.isArray(posts)) {
        const sortedPosts = posts.sort(
          (a, b) => new Date(b.publish_date) - new Date(a.publish_date)
        );
        setPosts(sortedPosts);
      } else {
        console.error("Expected posts to be an array, but received:", posts);
        showNotification("Failed to load posts. Please try again.", "error");
      }

      setIsPublished(true);
      showNotification("Post published successfully!", "success");
      navigate("/");
    } catch (error) {
      console.error("Failed to publish post:", error);
      showNotification(`Failed to publish: ${error.message}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["link", "image", "video", "code-block", "formula"],
        ["clean"],
      ],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "align",
    "script",
    "link",
    "image",
    "video",
    "code-block",
    "formula",
  ];

  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const customStyles = (isDark) => ({
    control: (base, state) => ({
      ...base,
      backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
      borderColor: state.isFocused
        ? isDark
          ? "#93C5FD"
          : "#3B82F6"
        : isDark
        ? "#374151"
        : "#D1D5DB",
      color: isDark ? "#F9FAFB" : "#111827",
      boxShadow: "none",
      "&:hover": {
        borderColor: isDark ? "#93C5FD" : "#3B82F6",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#111827" : "#FFFFFF",
      color: isDark ? "#F9FAFB" : "#111827",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? isDark
          ? "#2563EB"
          : "#DBEAFE"
        : state.isFocused
        ? isDark
          ? "#1E3A8A"
          : "#EFF6FF"
        : "transparent",
      color: isDark ? "#F9FAFB" : "#111827",
      cursor: "pointer",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDark ? "#374151" : "#E5E7EB",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDark ? "#F9FAFB" : "#111827",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: isDark ? "#F9FAFB" : "#111827",
      ":hover": {
        backgroundColor: isDark ? "#6B7280" : "#D1D5DB",
        color: isDark ? "#111827" : "#000000",
      },
    }),
  });

  return (
    <div className="mt-10 p-6 max-w-7xl mx-auto border rounded-lg shadow-md bg-white dark:bg-gray-900 dark:border-gray-700 relative">
      {/* Notification Component */}
      {notification.message && (
        <div
          className={`absolute top-2 right-2 left-2 p-3 rounded-lg shadow-md ${
            notification.type === "error"
              ? "bg-red-100 text-red-800 border border-red-300 dark:bg-red-800 dark:text-red-100"
              : "bg-green-100 text-green-800 border border-green-300 dark:bg-green-800 dark:text-green-100"
          }`}
        >
          {notification.message}
        </div>
      )}

      {isPublished ? (
        <div>
          {coverImage && (
            <img
              src={coverImage.preview}
              alt="Cover"
              className="w-full max-w-lg h-auto md:h-64 object-cover rounded-md mx-auto"
            />
          )}
          <h1 className="text-2xl font-bold my-2 text-gray-900 dark:text-white">
            {title}
          </h1>
          <div className="text-gray-600 dark:text-gray-300 mb-4">
            Categories: {selectedCategories.map((cat) => cat.label).join(", ")}
          </div>
          <div
            className="p-2 text-gray-900 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      ) : (
        <div>
          <div className="mb-4">
            {coverImage ? (
              <div className="relative">
                <img
                  src={coverImage.preview}
                  alt="Cover"
                  className="w-full max-w-lg h-auto md:h-64 object-fill rounded-md mx-auto"
                />
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => setCoverImage(null)}
                    className="px-3 py-1 bg-red-500 text-white rounded-full mr-2"
                  >
                    Remove
                  </button>
                  <label
                    htmlFor="change-cover"
                    className="px-3 py-1 bg-blue-500 text-white rounded-full cursor-pointer"
                  >
                    Change
                  </label>
                  <input
                    type="file"
                    id="change-cover"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            ) : (
              <label className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-full cursor-pointer">
                Add a cover image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="mb-2">
            <input
              type="text"
              placeholder="New post title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full text-2xl font-bold border-b-2 outline-none py-2 bg-transparent text-gray-900 dark:text-white ${
                errors.title
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-600"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <Select
              isMulti
              options={categories}
              value={selectedCategories}
              onChange={setSelectedCategories}
              placeholder="Add categories..."
              className="text-sm"
              classNamePrefix="react-select"
              styles={customStyles(isDarkMode)}
            />
            {errors.categories && (
              <p className="text-red-500 text-sm mt-1">{errors.categories}</p>
            )}
          </div>

          <div
            className={`border p-6 rounded-md ${
              errors.content ? "border-red-500" : "dark:border-gray-600"
            }`}
          >
            {isEditing ? (
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
                placeholder="Write your post content here..."
                className="text-black dark:text-white responsive-editor"
                style={{
                  backgroundColor: "transparent",
                  color: "#FFF",
                  minHeight: "100px",
                  height: "auto",
                  maxHeight: "600px",
                  overflow: "auto",
                }}
              />
            ) : (
              <div
                className="p-2 text-gray-900 dark:text-gray-200"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            )}
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className={`px-3 py-1 border rounded-full ${
                  isEditing
                    ? "bg-[#A27B5C] text-white"
                    : "bg-transparent text-[#A27B5C] border-[#A27B5C]"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={`px-3 py-1 border rounded-full ${
                  !isEditing
                    ? "bg-[#A27B5C] text-white"
                    : "bg-transparent text-[#A27B5C] border-[#A27B5C]"
                }`}
              >
                Preview
              </button>
            </div>

            <button
              onClick={handlePublish}
              disabled={isSubmitting}
              className={`px-6 py-2 bg-[#A27B5C] text-white rounded-full border border-[#A27B5C] hover:cursor-pointer ${
                isSubmitting ? "opacity-70" : ""
              }`}
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
