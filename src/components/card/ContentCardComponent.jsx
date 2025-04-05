import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import DOMPurify from "dompurify";

const ContentCardComponent = ({ thumbnail, title, content, id }) => {
  const [bookmarked, setBookmarked] = useState(false);
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
      date: "22 Fab 2025",
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

  // Load author data from localStorage or generate new one
  useEffect(() => {
    // Check if we have a stored author for this specific content ID
    const storedAuthors = JSON.parse(localStorage.getItem("contentAuthors")) || {};
    
    if (storedAuthors[id]) {
      // Use the stored author if available
      setAuthor(storedAuthors[id]);
    } else {
      // Generate a new random author and store it
      const random = datalist[Math.floor(Math.random() * datalist.length)];
      setAuthor(random);
      
      // Save to localStorage
      storedAuthors[id] = random;
      localStorage.setItem("contentAuthors", JSON.stringify(storedAuthors));
    }
  }, [id]);

  // Load bookmark status
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarkedIds")) || [];
    if (storedBookmarks.includes(id)) {
      setBookmarked(true);
    }
  }, [id]);

  const toggleBookmark = () => {
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);
  
    const myHeaders = new Headers();
    const token = localStorage.getItem("authToken");
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
  
        // Save to localStorage
        const storedBookmarks = JSON.parse(localStorage.getItem("bookmarkedIds")) || [];
  
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
  
  return (
    <div className="w-full mx-auto my-8 hover:cursor-pointer">
      <div className="flex flex-col">
        <div className="flex flex-row space-x-4 mb-4">
          {/* Image Section */}
          <NavLink to={`/blog/${id}`}>
            <div className="w-96 h-64 flex-shrink-0">
              <img
                src={thumbnail || "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png"}
                alt="Image"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </NavLink>

          {/* Content Section */}
          <div className="flex-1 flex flex-col justify-between">
            <NavLink to={`/blog/${id}`}>
              <div>
                {/* Author Info */}
                {author && (
                  <div className="flex items-center mb-2">
                    <img
                      src={author.profileimage || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="}
                      alt="Profile picture"
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {author.name|| "Unknown"}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {author.date || "created date"}
                      </div>
                    </div>
                  </div>
                )}

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {title || "No title"}
                </h2>

                {/* Content */}
                <p
                  className="text-gray-600 mb-4 line-clamp-4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content || "No content"),
                  }}
                ></p>
              </div>
            </NavLink>

            {/* Bookmark */}
            <div className="flex justify-start">
              {/* <button
                onClick={toggleBookmark}
                className={`${
                  bookmarked ? { color: "#3b82f6" } : "text-gray-400"
                }  hover:cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill=""
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
          
              </button> */}
              <button
            className="p-1 flex items-start justify-center"
            onClick={toggleBookmark}
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
              className={bookmarked ? "text-yellow-400" : "text-gray-400"}
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="border-b border-gray-200"></div>
      </div>
    </div>
  );
};

export default ContentCardComponent;