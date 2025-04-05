import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ScrollableCategories = ({ setSelectedCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Fetch and format categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/categories`
        );
        if (response.ok) {
          const data = await response.json();

          // ✅ Transform to expected { value, label } format
          const formatted = Array.isArray(data)
            ? data.map((cat) => ({
                value: cat.id,
                label: cat.name ?? "",
              }))
            : [];

          setCategories(formatted);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Initial scroll setup
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo?.({ left: 0, behavior: "instant" });
        checkScrollPosition();
      }, 100);
    }
  }, []);

  // Scroll logic
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

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
  };

  // Detect scroll position
  const checkScrollPosition = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  // Attach scroll event listener
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();

    return () => {
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
          {categories.map((category) => (
            <div
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-1 rounded-full cursor-pointer transition whitespace-nowrap 
              ${
                selectedCategory === category.value
                  ? "text-[#a27b5c] bg-white"
                  : "text-[#3f4e4f] hover:text-[#a27b5c]"
              }`}
            >
              {/* ✅ Safe label rendering */}
              {category.label
                ? category.label.charAt(0).toUpperCase() +
                  category.label.slice(1)
                : ""}
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
          <ChevronRight className="w-5 h-5 text-[#3f4e4f]" />
        </button>
      )}
    </div>
  );
};

export default ScrollableCategories;
