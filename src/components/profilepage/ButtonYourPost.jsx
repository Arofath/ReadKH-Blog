
import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import DOMPurify from "dompurify";
import { Bookmark } from "lucide-react";

export default function ButtonYourPost() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authorId, setAuthorId] = useState("");
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const openDeleteModal = (blogId) => {
    setPostToDelete(blogId);
    setIsModalOpen(true);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setPostToDelete(null);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    await deleteBlog(postToDelete);
    setIsModalOpen(false);
    setPostToDelete(null);
  };

  const deleteBlog = async (blogId) => {
    const token = localStorage.getItem("authToken"); // Replace with the correct token retrieval method

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/blogs/${blogId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete blog: ${response.statusText}`);
      }

      // Successfully deleted, now update the state
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      console.log("Blog deleted successfully");
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/categories`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        console.log(data);
        const categoryIds = data.map((category) => category.id);
        setCategories(categoryIds);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const storedToken = localStorage.getItem("authToken");
        // just for debugging:
        // const storedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmM2MzY2MDctYTljYS00NjFkLWE4NGYtZjczMmFlNDNhYjQ5IiwiZXhwIjoxNzQzNzk4MDQ0fQ.LaPO8eeVMMJVzF0Wy-Jgip656lTh0mfyOFl6aVBCjd4";

        console.log("Stored token:", storedToken);

        if (!storedToken) {
          throw new Error("Please log in or register to view your profile");
        }

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

        // if (!response.ok) {
        //   throw new Error("Failed to fetch profile");
        // }

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Response error:", response.status, errorText);
          throw new Error("Failed to fetch profile");
        }

        if (!storedToken) {
          console.warn("No token found in localStorage");
          return;
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

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const allBlogs = [];

        for (let i = 0; i < categories.length; i++) {
          const category = categories.slice(i, i + 1)[0];
          console.log(`Processing category: ${category}`);

          const data = await fetchBlogs(authorId, category);
          console.log(`Blogs for category ${category}:`, data);

          if (
            data.blogs &&
            Array.isArray(data.blogs) &&
            data.blogs.length > 0
          ) {
            allBlogs.push(...data.blogs);
          }
        }

        console.log("All combined blogs:", allBlogs);
        setBlogs(allBlogs);
      } catch (err) {
        console.error("Error fetching all blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, [authorId, categories]);

  const fetchBlogs = async (authorId, categoryId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/blogs?author_id=${authorId}&category_id=${categoryId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched blogs for category:", categoryId, data.blogs);

      return data;
    } catch (err) {
      console.error("Error fetching blogs:", err);
      return { blogs: [] };
    }
  };

  const displayedBlogs = blogs.slice(0, 5); // Display only the first 5 blogs

  if (loading)
    return (
      <p className="text-center text-gray-600 text-lg">Loading blogs...</p>
    );
  if (error)
    return <p className="text-center text-gray-500 text-lg">Error: {error}</p>;

  return (
    <>
      <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl border-gray-300">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="currentColor" /> */}
            <span className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800">
              Your Post
            </span>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading blogs...</p>
        ) : displayedBlogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No posts available.
          </p>
        ) : (
          <>
            <div className="space-y-6 ">
              {displayedBlogs.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-200"
                >
                  {/* Left side - Image */}
                  <div className="w-full sm:w-1/3 md:w-1/4 ">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer">
                      <img
                        src={
                          post.thumbnail ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAj4_bJnqM046vfn4p9AsD79Hgy3mDlzCzTA&s"
                        }
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="flex-1">
                    {/* Author info row */}
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 cursor-pointer">
                        <img
                          src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg"
                          alt="Author"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                        John Doe
                      </span>
                      <span className="ml-2 text-xs text-gray-500 cursor-pointer">
                        25 Jan 2025
                      </span>
                    </div>

                    {/* Post title */}
                    <h3 className="text-lg sm:text-xl font-semibold cursor-pointer text-gray-900 mb-2 hover:text-[#3f4e4f] transition-colors">
                      {post.title || "Untitled Post"}
                    </h3>

                    {/* Post content preview */}
                    <p
                      className="text-sm text-gray-600 line-clamp-4 mb-3"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.content),
                      }}
                    ></p>

                    {/* Bottom row with bookmark icon */}
                    <div className="flex justify-between items-center ">
                      <button
                        onClick={() => openDeleteModal(post.id)}
                        className="cursor-pointer text-sm text-red-500 hover:text-red-600 transition-colors"
                      >
                        Delete
                      </button>

                      {/* Bookmark button */}
                      <button className="text-gray-400 hover:text-gray-700 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delete Confirmation Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Confirm Deletion
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to delete this post? This action
                    cannot be undone.
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={cancelDelete}
                      className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
