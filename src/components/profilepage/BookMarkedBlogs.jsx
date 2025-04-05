import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";

const ArticleCard = ({ thumbnail, title, content, id, bookmarked, toggleBookmark }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-sm transition-shadow hover:shadow-md">
      {/* Article Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={thumbnail || "/api/placeholder/400/320"}
          alt="article"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Author and Date */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src="https://marketplace.canva.com/EAFOWUXOOvs/1/0/1600w/canva-green-gradient-minimalist-simple-instagram-profile-picture-tBlf3wVYGhg.jpg"
                alt="author"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-800">Yuna Min</p>
              <p className="text-sm text-gray-500">12 Jun 2024</p>
            </div>
          </div>

          {/* Bookmark icon */}
          <button onClick={() => toggleBookmark(id)} className="p-1 flex items-start justify-center">
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
              className={bookmarked ? "text-yellow-400" : "text-gray-400"}
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>

        {/* Title with line clamp */}
        <h2 className="text-xl font-bold text-gray-800 mb-2 overflow-hidden line-clamp-2">
          {title}
        </h2>

        {/* Excerpt with line clamp */}
        <p
          className="text-gray-600 mb-4 overflow-hidden line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content),
          }}
        />
      </div>
    </div>
  );
};

const BookmarkedBlogs = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  useEffect(() => {
    // Load bookmarked IDs from localStorage
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarkedIds")) || [];
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
      localStorage.setItem("bookmarkedIds", JSON.stringify(serverBookmarkedIds));

      // Filter and format articles
      const formattedArticles = articlesData
        .filter((article) => serverBookmarkedIds.includes(article.id))
        .map((article) => ({
          id: article.id,
          thumbnail: article.thumbnail || article.image,
          title: article.title,
          content: article.content || article.excerpt || article.description || "",
          bookmarked: true,
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

      const response = await fetch(`https://readkh-api.istad.co/blogs/${id}/bookmark`, {
        method: "POST",
        headers: myHeaders,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      console.log("✅ Bookmark response:", result);

      // Optionally re-fetch the data to ensure the UI is in sync with the server
      // This step can be skipped if the optimistic update is sufficient
      // const fetchBookmarkedBlogs = async () => {
      //   const response = await fetch("https://readkh-api.istad.co/users/bookmarked-blogs", requestOptions);
      //   const result = await response.json();
      //   const articlesData = result.data || result;
      //   const formattedArticles = articlesData.map((article) => ({
      //     id: article.id,
      //     thumbnail: article.thumbnail || article.image,
      //     title: article.title,
      //     content: article.content || article.excerpt || article.description || "",
      //     bookmarked: updatedBookmarks.includes(article.id),
      //   }));
      //   setArticles(formattedArticles);
      // };
      // fetchBookmarkedBlogs();
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
    return <div className="pt-6 bg-white w-full text-center text-red-500">{error}</div>;
  }

  return (
    <div className="pt-6 bg-white w-full">
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
          <p className="col-span-3 text-center text-gray-500">
            Your bookmaeks is nothing
          </p>
        )}
      </div>
    </div>
  );
};

export default BookmarkedBlogs;