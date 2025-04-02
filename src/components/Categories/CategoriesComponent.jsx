import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  "For You",
  "Lifestyle",
  "Technology",
  "Education",
  "Pop Culture",
  "Personal Finance & Budgeting",
  "Programming Language",
  "Cooking Skill & Technique",
];

const ScrollableCategories = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({ left: 0, behavior: "instant" });
        checkScrollPosition();
      }, 100);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth * 0.6;

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        if (container.scrollLeft - scrollAmount <= 0) {
          setTimeout(() => {
            container.scrollTo({ left: 0, behavior: "smooth" });
          }, 200);
        }
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      if (container)
        container.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full mt-5">
      {/* Left Scroll Button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="rounded-full z-10 flex hover:cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-[#3f4e4f]" />
        </button>
      )}

      {/* Scrollable Categories */}
      <div className="w-full max-w-full overflow-hidden mx-2">
        <div
          ref={scrollRef}
          className="flex space-x-3 overflow-x-auto scrollbar-hide py-2"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="px-4 py-2 text-[#3f4e4f] rounded-full cursor-pointer hover:text-[#a27b5c] transition whitespace-nowrap"
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Right Scroll Button */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-full z-10 flex hover:cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 text-[#3f4e4f] " />
        </button>
      )}
    </div>
  );
};

export default ScrollableCategories;
