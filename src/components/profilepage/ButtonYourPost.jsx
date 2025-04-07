import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

export default function ButtonYourPost() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authorId, setAuthorId] = useState("");
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const navigate = useNavigate();

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
    const token = localStorage.getItem("authToken");
    if (!token) return console.error("No token found");

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

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/categories`
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data.map((cat) => cat.id));
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) throw new Error("Please log in to view your profile");

      setToken(storedToken);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Profile fetch error:", errorText);
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      const profileId = data.profile?.id;

      if (profileId) {
        localStorage.setItem("userId", profileId);
        setAuthorId(profileId);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async (authorId, categoryId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/blogs?author_id=${authorId}&category_id=${categoryId}`
      );
      if (!response.ok) throw new Error(`Failed to fetch blogs`);
      return await response.json();
    } catch (err) {
      console.error("Error fetching blogs:", err);
      return { blogs: [] };
    }
  };
  
  const fetchAllBlogs = async () => {
    try {
      if (!authorId || categories.length === 0) return;
  
      const allBlogs = [];
  
      for (const category of categories) {
        const data = await fetchBlogs(authorId, category);
        if (data.blogs?.length) {
          allBlogs.push(...data.blogs);
        }
      }
  
      // Deduplicate blogs by ID
      const uniqueBlogsMap = new Map();
      allBlogs.forEach((blog) => {
        uniqueBlogsMap.set(blog.id, blog);
      });
  
      const uniqueBlogs = Array.from(uniqueBlogsMap.values());
  
      setBlogs(uniqueBlogs);
    } catch (err) {
      console.error("Error fetching all blogs:", err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchCategories();
    fetchProfile();
  }, []);

  useEffect(() => {
    if (authorId && categories.length > 0) {
      fetchAllBlogs();
    }
  }, [authorId, categories]);

  const displayedBlogs = blogs.slice(0, 5);

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
          <span className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800">
            Your Post
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {displayedBlogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No posts available.
          </p>
        ) : (
          <div className="space-y-6">
            {displayedBlogs.map((post) => (
              <div
                key={post.id}
                className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-200"
              >
                <div className="w-full sm:w-1/3 md:w-1/4">
                  <NavLink
                    to={`/blog/${post.id}`}
                    className="block aspect-[4/3] rounded-lg overflow-hidden"
                  >
                    <img
                      src={
                        post.thumbnail ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </NavLink>
                </div>

                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                        alt="Author"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      John Nora
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      25 Jan 2025
                    </span>
                  </div>

                  <h3
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className="text-lg sm:text-xl font-semibold cursor-pointer text-gray-900 mb-2 hover:text-[#3f4e4f]"
                  >
                    {post.title || "Untitled Post"}
                  </h3>

                  <p
                    className="text-sm text-gray-600 line-clamp-4 mb-3"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.content),
                    }}
                  ></p>

                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => openDeleteModal(post.id)}
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      <img src="/images/cards-images/delete.png" alt="delete" className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigate(`/edit-post/${post.id}`)}
                      className="cursor-pointer text-sm text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      {/* Update */}
                      <img src="/images/cards-images/edit-text.png" alt="update" className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-700">
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
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
