import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Added useNavigate
import DOMPurify from "dompurify";

const ContentCardComponent = ({
  thumbnail,
  title,
  content,
  id,
  username,
  profileUrl,
  created_at,
  update_at,
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const navigate = useNavigate(); // Added navigate hook

  // Load bookmark status
  useEffect(() => {
    const storedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedIds")) || [];
    if (storedBookmarks.includes(id)) {
      setBookmarked(true);
    }
  }, [id]);

  const toggleBookmark = () => {
    // Check if user is authenticated first
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/register");
      return;
    }

    // If authenticated, proceed with existing bookmark logic
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);

    const myHeaders = new Headers();
    const token = authToken; // Use the token we already checked
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
    };

    fetch(`https://readkh-api.istad.co/blogs/${id}/bookmark`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("✅ Bookmark response:", result);

        const storedBookmarks =
          JSON.parse(localStorage.getItem("bookmarkedIds")) || [];

        if (newBookmarked) {
          if (!storedBookmarks.includes(id)) {
            storedBookmarks.push(id);
          }
        } else {
          const index = storedBookmarks.indexOf(id);
          if (index > -1) {
            storedBookmarks.splice(index, 1);
          }
        }

        localStorage.setItem("bookmarkedIds", JSON.stringify(storedBookmarks));
      })
      .catch((error) => console.error("❌ Bookmark error:", error));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      // weekday: "short",
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
    <div className="w-full mx-auto my-4 sm:my-6 md:my-8 hover:cursor-pointer">
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-col md:flex-row md:space-x-4 mb-4">
          <NavLink
            to={`/blog/${id}`}
            className="w-full md:w-auto md:flex-shrink-0"
          >
            <div className="w-full h-48 sm:h-56 md:h-64 md:w-64 lg:w-96">
              <img
                src={
                  thumbnail ||
                  "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png"
                }
                alt="Image"
                className="w-full h-full object-fill rounded-lg"
              />
            </div>
          </NavLink>

          <div className="flex-1 flex flex-col justify-between mt-4 md:mt-0">
            <NavLink to={`/blog/${id}`}>
              <div>
                <div className="flex items-center mb-2">
                  <img
                    src={
                      profileUrl ||
                      "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                    }
                    alt="profile"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900 text-sm sm:text-base dark:text-white">
                      {username || "Unknown"}
                    </div>
                    <div className="text-gray-500 text-xs sm:text-sm dark:text-gray-400">
                      {getDisplayDateLabel(created_at, update_at)}
                    </div>
                  </div>
                </div>

                <h2 className="dark:text-white text-xl sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {title || "No title"}
                </h2>

                <p
                  className="dark:text-white text-gray-600 mb-4 text-sm sm:text-base line-clamp-3 sm:line-clamp-3 md:line-clamp-4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content || "No content"),
                  }}
                ></p>
              </div>
            </NavLink>

            <div className="flex justify-start">
              <button
                className="p-1 flex items-start justify-center cursor-pointer"
                onClick={toggleBookmark}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={bookmarked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${
                    bookmarked
                      ? "text-yellow-400"
                      : "text-gray-400 dark:text-gray-500"
                  } sm:w-5 sm:h-5 md:w-6 md:h-6`}
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 mt-2 dark:border-gray-700"></div>
      </div>
    </div>
  );
};

export default ContentCardComponent;
