import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { Bookmark } from "lucide-react";
import { NavLink } from "react-router-dom";

const ArticleCard = ({
  thumbnail,
  title,
  content,
  id,
  bookmarked,
  toggleBookmark,
  username,
  profileUrl,
  created_at,
  update_at,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDisplayDateLabel = (created, updated) => {
    if (!created) return "";
    const createdTime = new Date(created).getTime();
    const updatedTime = new Date(updated).getTime();

    const isUpdated = updated && updatedTime > createdTime;
    const displayDate = isUpdated ? updated : created;

    return `${formatDate(displayDate)}`;
  };

  return (
    <NavLink
      to={`/blog/${id}`}
      className="hover:shadow-lg transition duration-200 ease-in-out rounded-xl cursor-pointer block"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden w-full max-w-sm">
        <div className="w-full h-48 overflow-hidden">
          <img
            src={
              thumbnail ||
              "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png"
            }
            alt="article"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src={
                    profileUrl ||
                    "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                  }
                  alt="author"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {username || "Unknown Author"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getDisplayDateLabel(created_at, update_at)}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation on bookmark click
                toggleBookmark(id);
              }}
              className="p-1 flex items-start justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={bookmarked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={
                  bookmarked
                    ? "text-yellow-400"
                    : "text-gray-400 dark:text-gray-500"
                }
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 overflow-hidden line-clamp-2">
            {title}
          </h2>

          <p
            className="text-gray-600 dark:text-gray-300 mb-4 overflow-hidden line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content),
            }}
          />
        </div>
      </div>
    </NavLink>
  );
};

// Rest of your BookmarkedBlogs component remains unchanged
const BookmarkedBlogs = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  useEffect(() => {
    // Load bookmarked IDs from localStorage
    const storedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedIds")) || [];
    setBookmarkedIds(storedBookmarks);

    // Fetch bookmarked blogs
    const fetchBookmarkedBlogs = async () => {
      try {
        const myHeaders = new Headers();
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          "https://readkh-api.istad.co/users/bookmarked-blogs",
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const articlesData = result.data || result;

        // Update bookmarkedIds based on the API response
        const serverBookmarkedIds = articlesData.map((article) => article.id);
        setBookmarkedIds(serverBookmarkedIds);
        localStorage.setItem(
          "bookmarkedIds",
          JSON.stringify(serverBookmarkedIds)
        );

        // Filter and format articles
        const formattedArticles = articlesData
          .filter((article) => serverBookmarkedIds.includes(article.id))
          .map((article) => ({
            id: article.id,
            thumbnail: article.thumbnail || article.image,
            title: article.title,
            content:
              article.content || article.excerpt || article.description || "",
            bookmarked: true,
            profileUrl:
              article.author?.profileUrl || article.author?.profile_url || "",
            username: article.author?.username || "Unknown Author",
            created_at: article.created_at,
            update_at: article.updated_at,
          }));

        // // Map API response to match ArticleCard props
        // const formattedArticles = articlesData.map((article) => ({
        //   id: article.id,
        //   thumbnail: article.thumbnail || article.image,
        //   title: article.title,
        //   content: article.content || article.excerpt || article.description || "",
        //   // bookmarked: storedBookmarks.includes(article.id),
        //   // bookmarked: true,
        // }));

        setArticles(formattedArticles);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error("Error fetching bookmarked blogs:", error);
      }
    };

    fetchBookmarkedBlogs();
  }, []);

  const toggleBookmark = async (id) => {
    // Optimistic update: Update UI immediately
    const newBookmarked = !bookmarkedIds.includes(id);
    const updatedBookmarks = newBookmarked
      ? [...bookmarkedIds, id]
      : bookmarkedIds.filter((bookmarkId) => bookmarkId !== id);

    // If unbookmarking, filter out the article from the UI
    if (!newBookmarked) {
      const newArticles = articles.filter((article) => article.id !== id);
      setArticles(newArticles);
    } else {
      // If bookmarking, update the bookmarked state (though this component only shows bookmarked blogs, so this case might not apply)
      const newArticles = articles.map((article) =>
        article.id === id ? { ...article, bookmarked: true } : article
      );
      setArticles(newArticles);
    }

    // Update bookmarkedIds and localStorage
    setBookmarkedIds(updatedBookmarks);
    localStorage.setItem("bookmarkedIds", JSON.stringify(updatedBookmarks));

    // Make the API call to sync with the server
    try {
      const myHeaders = new Headers();
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch(
        `https://readkh-api.istad.co/blogs/${id}/bookmark`,
        {
          method: "POST",
          headers: myHeaders,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      console.log("✅ Bookmark response:", result);
    } catch (error) {
      console.error("❌ Bookmark error:", error);
      // Revert changes on error
      setArticles(articles); // Revert articles
      setBookmarkedIds(bookmarkedIds); // Revert bookmarkedIds
      localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds)); // Revert localStorage
    }
  };

  if (loading) {
    return <div className="pt-6 bg-white w-full text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="pt-6 bg-white w-full text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-2 sm:gap-3">
            <Bookmark
              className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400"
              fill="currentColor"
            />
            <span className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 dark:text-white">
              Saved
            </span>
          </div>
        </div>
      </div>

      <div className="pt-6 bg-white dark:bg-gray-950 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard
                key={article.id}
                {...article}
                toggleBookmark={toggleBookmark}
              />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500 dark:text-gray-400 dark:bg-gray-950">
              Your bookmark is empty
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BookmarkedBlogs;
