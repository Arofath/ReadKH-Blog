import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Added useNavigate
import DOMPurify from "dompurify";

const ContentCardComponent = ({ thumbnail, title, content, id }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [author, setAuthor] = useState(null);
  const navigate = useNavigate(); // Added navigate hook

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
    const storedAuthors = JSON.parse(localStorage.getItem("contentAuthors")) || {};
    
    if (storedAuthors[id]) {
      setAuthor(storedAuthors[id]);
    } else {
      const random = datalist[Math.floor(Math.random() * datalist.length)];
      setAuthor(random);
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
    // Check if user is authenticated first
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      // navigate("/register");
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
    <div className="w-full mx-auto my-4 sm:my-6 md:my-8 hover:cursor-pointer">
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-col md:flex-row md:space-x-4 mb-4">
          <NavLink to={`/blog/${id}`} className="w-full md:w-auto md:flex-shrink-0">
            <div className="w-full h-48 sm:h-56 md:h-64 md:w-64 lg:w-96">
              <img
                src={thumbnail || "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png"}
                alt="Image"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </NavLink>

          <div className="flex-1 flex flex-col justify-between mt-4 md:mt-0">
            <NavLink to={`/blog/${id}`}>
              <div>
                {author && (
                  <div className="flex items-center mb-2">
                    <img
                      src={author.profileimage || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="}
                      alt="profile"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">
                        {author.name || "Unknown"}
                      </div>
                      <div className="text-gray-500 text-xs sm:text-sm">
                        {author.date || "created date"}
                      </div>
                    </div>
                  </div>
                )}

                <h2 className="text-xl sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {title || "No title"}
                </h2>

                <p
                  className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3 sm:line-clamp-3 md:line-clamp-4"
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
                  className={`${bookmarked ? "text-yellow-400" : "text-gray-400"} sm:w-5 sm:h-5 md:w-6 md:h-6`}
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 mt-2"></div>
      </div>
    </div>
  );
};

export default ContentCardComponent;