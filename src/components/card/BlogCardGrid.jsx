import React from "react";

const ArticleCard = ({ image, title, excerpt, author, date, avatarUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full max-w-sm transition-shadow hover:shadow-md">
      {/* Article Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={image || "/api/placeholder/400/320"}
          alt={title}
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
                src={avatarUrl || "/api/placeholder/100/100"}
                alt={author}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-800">{author}</p>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
          </div>

          {/* Bookmark icon */}
          <button className="p-1 flex items-start justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
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
        <p className="text-gray-600 mb-4 overflow-hidden line-clamp-3">
          {excerpt}
        </p>
      </div>
    </div>
  );
};

// Demo with example cards
const BlogCardGrid = () => {
  const articles = [
    {
      image:
        "https://png.pngtree.com/thumb_back/fh260/background/20240801/pngtree-new-cb-background-images-photos-pics-wallpaper-pictures-image_16123145.jpg",
      title: "Avoid These Common UI/UX Mistakes That Frustrate User",
      excerpt:
        "The success of every digital product depends critically on the design of an understandable and pleasurable experience. Learn how to avoid common pitfalls that can ruin user experience.",
      author: "Orlando Diggs",
      date: "26 Jan 2025",
      avatarUrl:
        "https://png.pngtree.com/thumb_back/fh260/background/20240801/pngtree-new-cb-background-images-photos-pics-wallpaper-pictures-image_16123145.jpg",
    },
    {
      image:
        "https://png.pngtree.com/thumb_back/fh260/background/20240801/pngtree-new-cb-background-images-photos-pics-wallpaper-pictures-image_16123145.jpg",
      title:
        "UI Design Trends In 2025 and UX Trends - A Comprehensive Guide to Modern Design Principles",
      excerpt:
        "Designing for 2025 isn't just about hopping on the latest trends — it's about creating experiences that truly resonate with users and provide meaningful interactions.",
      author: "Natali Craig",
      date: "25 Jan 2025",
      avatarUrl:
        "https://png.pngtree.com/thumb_back/fh260/background/20240801/pngtree-new-cb-background-images-photos-pics-wallpaper-pictures-image_16123145.jpg",
    },
    {
      image:
        "https://png.pngtree.com/thumb_back/fh260/background/20240801/pngtree-new-cb-background-images-photos-pics-wallpaper-pictures-image_16123145.jpg",
      title: "8 practical learnings as a UX beginner",
      excerpt:
        "I wish I could have written this sooner, so that those with little to no experience working on real projects could learn from my mistakes and accelerate their growth in the UX design field.",
      author: "Demi Wilkinson",
      date: "16 Jan 2025",
      avatarUrl:
        "https://png.pngtree.com/thumb_back/fh260/background/20240801/pngtree-new-cb-background-images-photos-pics-wallpaper-pictures-image_16123145.jpg",
    },
  ];

  return (
    <div className="pt-6 bg-white w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </div>
  );
};

export default BlogCardGrid;
