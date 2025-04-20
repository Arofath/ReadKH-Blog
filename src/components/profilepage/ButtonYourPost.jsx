import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { IoMdMore } from "react-icons/io";

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
  const [author, setAuthor] = useState(null);
  const dropdownRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);

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
      const profile = data.profile || {};

      // Set the author data, including profile image (previewImage)
      setAuthor(profile);
      const profileId = profile?.id;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorId, categories]);

  const displayedBlogs = blogs.slice(0, 5);

  if (loading)
    return (
      <p className="text-center text-gray-600 text-lg">Loading blogs...</p>
    );
  if (error)
    return <p className="text-center text-gray-500 text-lg">Error: {error}</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      // weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const toggleDropdown = (postId) => {
    setOpenDropdown(openDropdown === postId ? null : postId); // Toggle dropdown for each post
  };

  return (
    <>
      <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl border-gray-300">
          <span className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800">
            Your Post
          </span>
        </div>
      </div>
      <div className="w-full mx-auto my-4 sm:my-6 md:my-8 hover:cursor-pointer ">
        {displayedBlogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No posts available.
          </p>
        ) : (
          <div className="flex flex-col">
            {displayedBlogs.map((post) => (
              <div
                key={post.id}
                className="flex flex-col sm:flex-col md:flex-row md:space-x-4 mb-6 p-4 bg-white border-b border-gray-300"
              >
                <NavLink
                  to={`/blog/${post.id}`}
                  className="w-full md:w-auto md:flex-shrink-0"
                >
                  <div className="w-full h-48 sm:h-56 md:h-64 md:w-64 lg:w-96">
                    <img
                      src={
                        post.thumbnail ||
                        "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png"
                      }
                      alt="Image"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </NavLink>

                <div className="flex-1 flex flex-col justify-between mt-4 md:mt-0">
                  <div className="flex flex-col sm:flex-col md:flex-row md:space-x-4 mb-4 justify-between">
                    <NavLink to={`/blog/${post.id}`}>
                      <div>
                        {author && (
                          <div className="flex items-center mb-2">
                            <img
                              src={
                                author.profileUrl ||
                                "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                              }
                              alt="profile"
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-900 text-sm sm:text-base">
                                {author.username || "Unknown"}
                              </div>
                              <div className="text-gray-500 text-xs sm:text-sm">
                                {`${formatDate(post.created_at)}`}
                              </div>
                              {post.updatedAt && (
                                <div className="text-gray-500 text-xs sm:text-sm">
                                  {`${formatDate(post.updated_at)}`}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <h2 className="text-xl sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                          {post.title || "No title"}
                        </h2>

                        <p
                          className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3 sm:line-clamp-3 md:line-clamp-4"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              post.content || "No content"
                            ),
                          }}
                        ></p>
                      </div>
                    </NavLink>

                    <div className="relative">
                      <button onClick={() => toggleDropdown(post.id)}>
                        <IoMdMore
                          className="text-gray-500 w-6 h-6 hover:text-gray-700 hover:cursor-pointer"
                          aria-label="More options"
                        />
                      </button>
                      {openDropdown === post.id && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-0 w-48 py-2 mt-2 bg-white shadow-lg rounded-md border-2 border-gray-200"
                        >
                          <button
                            onClick={() => navigate(`/edit-post/${post.id}`)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(post.id)}
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
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
