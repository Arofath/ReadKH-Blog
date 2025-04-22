import React, { useState, useEffect } from "react";
import NavbarComponents from "./components/layout/NavBarComponent";
import ScrollableCategories from "./components/Categories/CategoriesComponent";
import ContentCardComponent from "./components/card/ContentCardComponent";
import ReadKHBanner from "./components/banner/ReadKhBanner";
import RandomBlog from "./components/card/RandomBlog";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Category ID
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Set default category
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    setSelectedCategory(categoryParam || "all");
  }, []);

  // Fetch blogs for selected category (only if not in search mode)
  useEffect(() => {
    if (!selectedCategory || isSearchMode) return;

    const fetchBlogs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url =
          selectedCategory === "all"
            ? `${import.meta.env.VITE_BASE_URL}/blogs`
            : `${
                import.meta.env.VITE_BASE_URL
              }/blogs?category_id=${selectedCategory}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const result = await response.json();
        if (result?.blogs && Array.isArray(result.blogs)) {
          setBlogs(result.blogs);
          setFilteredBlogs(result.blogs);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory, isSearchMode]);

  // Sync category in URL
  useEffect(() => {
    if (selectedCategory) {
      const params = new URLSearchParams(window.location.search);
      params.set("category", selectedCategory);
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params}`
      );
    }
  }, [selectedCategory]);

  // Handle search across categories
  const handleSearchSubmit = async (query) => {
    if (!query) {
      setIsSearchMode(false);
      setFilteredBlogs(blogs);
      return;
    }

    setIsSearchMode(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/blogs/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const result = await response.json();
      if (result?.blogs && Array.isArray(result.blogs)) {
        setFilteredBlogs(result.blogs);

        // Automatically navigate to category of first result (if any)
        if (result.blogs.length > 0) {
          const firstCategoryId = result.blogs[0].category_id;
          setSelectedCategory(firstCategoryId);
          setIsSearchMode(false); // Let useEffect trigger fetch for new category
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err.message);
      setFilteredBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const blogList = filteredBlogs.map((data) => (
    <ContentCardComponent
      key={data.id}
      title={data.title}
      content={data.content}
      thumbnail={data.thumbnail}
      id={data.id}
      date={data.created_at}
    />
  ));

  return (
    <>
      <NavbarComponents
        onSearchSubmit={handleSearchSubmit}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="ml-4">
        <ScrollableCategories
          setSelectedCategory={(id) => {
            setIsSearchMode(false);
            setSelectedCategory(id);
          }}
          selectedCategory={selectedCategory}
        />
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center text-gray-500 mt-6">
              <p>No blogs found.</p>
              <p className="text-sm m-10">
                Try a different keyword or category.
              </p>
            </div>
          ) : (
            blogList
          )}
        </div>
        <ReadKHBanner />
        <RandomBlog />
      </div>
    </>
  );
}

export default App;
