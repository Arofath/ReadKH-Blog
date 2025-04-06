import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const ArticleCard = ({ thumbnail, title, content, id }) => {
  const [author, setAuthor] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);

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
    const storedAuthors =
      JSON.parse(localStorage.getItem("contentAuthors")) || {};

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
    const storedBookmarks =
      JSON.parse(localStorage.getItem("bookmarkedIds")) || [];
    if (storedBookmarks.includes(id)) {
      setBookmarked(true);
    }
  }, [id]);

  const toggleBookmark = () => {
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);
  
    // Get token from localStorage
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      console.error("No authentication token found");
      setBookmarked(!newBookmarked); // Revert state
      return;
    }
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
  
    fetch(`https://readkh-api.istad.co/blogs/${id}/bookmark`, {
      method: "POST",
      headers: myHeaders
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
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
      .catch((error) => {
        console.error("❌ Bookmark error:", error);
        setBookmarked(!newBookmarked); // Revert state on error
      });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-sm transition-shadow hover:shadow-md">
      <div className="w-full h-48 overflow-hidden">
        <img
          src={
            thumbnail ||
            "https://www.themgroup.co.uk/wp-content/uploads/2020/12/landscape-placeholder-e1608289113759.png"
          }
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src={
                  author?.profileimage ||
                  "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                }
                alt="avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-800">
                {author?.name || "Loading..."}
              </p>
              <p className="text-sm text-gray-500">
                {author?.date || "Loading..."}
              </p>
            </div>
          </div>
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

        <h2 className="text-xl font-bold text-gray-800 mb-2 overflow-hidden line-clamp-2">
          {title}
        </h2>

        <p
          className="text-gray-600 mb-4 overflow-hidden line-clamp-3"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        ></p>
      </div>
    </div>
  );
};

const RandomBlog = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchRandomPage = async () => {
      try {
        // Step 1: Fetch first page to get total count
        const firstRes = await fetch(
          "https://readkh-api.istad.co/blogs?page=1&page_size=1"
        );
        const firstData = await firstRes.json();
        const totalCount = firstData.total_count;

        if (totalCount === 0) return;

        // Step 2: Calculate total pages
        const pageSize = 6;
        const totalPages = Math.ceil(totalCount / pageSize);

        // Step 3: Pick random page
        const randomPage = Math.floor(Math.random() * totalPages) + 1;

        // Step 4: Fetch blogs from random page
        const res = await fetch(
          `https://readkh-api.istad.co/blogs?page=${randomPage}&page_size=${pageSize}`
        );
        const data = await res.json();
        setArticles(data.blogs || []);
      } catch (error) {
        console.error("Error fetching random blogs:", error);
      }
    };

    fetchRandomPage();
  }, []);

  return (
    <div className="pt-6 bg-white w-full">
      {/* <h2 className="text-2xl font-bold mb-4">អត្ថបទចៃដន្យ</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))
        ) : (
          <p className="text-gray-500 col-span-3">Not found!</p>
        )}
      </div>
    </div>
  );
};

export default RandomBlog;
