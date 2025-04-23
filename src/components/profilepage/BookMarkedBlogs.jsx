import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { Bookmark } from "lucide-react";

const ArticleCard = ({
  thumbnail,
  title,
  content,
  id,
  bookmarked,
  toggleBookmark,
}) => {
  const [author, setAuthor] = useState(null);

  const datalist = [
    {
      profileimage:
        "https://capecoraltech.edu/wp-content/uploads/2016/01/tutor-8-3.jpg",
      name: "John Doe",
      date: "14 Jan 2025",
    },
    {
      profileimage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMYR0TAT4xCZgg-7cvDs2gH02sMGHAIbFDYQ&s",
      name: "Jane Smith",
      date: "12 Nov 2024",
    },
    {
      profileimage:
        "https://preview.redd.it/colorized-photo-of-19-year-old-delta-blues-musician-robert-v0-abpi1m140mma1.jpg?width=640&crop=smart&auto=webp&s=6cc2af177b4adf38df3974b263d383aeb00e7290",
      name: "Robert Johnson",
      date: "10 June 2025",
    },
    {
      profileimage:
        "https://www.emilydavismusic.com/images/emily_davis_music_living_in_the_past_tense.jpg",
      name: "Emily Davis",
      date: "01 July 2025",
    },
    {
      profileimage:
        "https://images.rivals.com/image/upload/f_auto,q_auto,t_large/bzd4dr1966m2f50b36vm",
      name: "Michael Wilson",
      date: "22 Feb 2025",
    },
    {
      profileimage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6es7_u3ETPtLpPHgN3c7RGgFI2bq4rcr4pg&s",
      name: "Sarah Brown",
      date: "21 Jan 2025",
    },
    {
      profileimage:
        "https://img.olympics.com/images/image/private/t_social_share_thumb/f_auto/v1694950107/primary/ass1qd5m3qe39sammqrz",
      name: "David Taylor",
      date: "22 June 2025",
    },
    {
      profileimage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwykXmHb6GiTQkKosL3u9VYoORjRwmeUyovA&s",
      name: "Jennifer Martinez",
      date: "19 June 2025",
    },
    {
      profileimage:
        "https://upload.wikimedia.org/wikipedia/commons/c/c0/ThomasAnderson%281819-1874%29.jpg",
      name: "Thomas Anderson",
      date: "14 June 2025",
    },
    {
      profileimage:
        "https://www.jlgroup.net/wp-content/uploads/2023/07/LISA-T.jpg",
      name: "Lisa Thomas",
      date: "10 Dec 2024",
    },
  ];

  useEffect(() => {
    // Pick a random author on every render
    const random = datalist[Math.floor(Math.random() * datalist.length)];
    setAuthor(random);
  }, [id]); // Still depends on `id` to re-run if the article changes

  if (!author) {
    return null; // Prevent rendering until author is set
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden w-full max-w-sm transition-shadow hover:shadow-md">
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
                  author.profileimage ||
                  "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                }
                alt="author"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">
                {author.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {author.date}
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleBookmark(id)}
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
