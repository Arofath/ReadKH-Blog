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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

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
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const url =
          selectedCategory === "all"
            ? `${baseUrl}/blogs?limit=50`
            : `${baseUrl}/blogs?category_id=${selectedCategory}&limit=50`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const result = await response.json();
        if (result?.blogs && Array.isArray(result.blogs)) {
          setBlogs(result.blogs);
          setFilteredBlogs(result.blogs);
          console.log(`Fetched ${result.blogs.length} blogs`);
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
  const handleSearchSubmit = (query) => {
    if (query) {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBlogs(filtered); // Set filtered blogs based on the search query
    } else {
      setFilteredBlogs(blogs); // Show all blogs if query is empty
    }
  };

  const blogList = filteredBlogs.map((data) => (
    <ContentCardComponent
      key={data.id}
      id={data.id}
      title={data.title}
      content={data.content}
      thumbnail={data.thumbnail}
      username={data.author?.username}
      profileUrl={data.author?.profileUrl}
      created_at={data.created_at}
      update_at={data.author?.updated_at}
    />
  ));

  return (
    <>
      <NavbarComponents
        onSearchSubmit={handleSearchSubmit}
        setSelectedCategory={setSelectedCategory}
        blogs={blogs}
        mobileSearchOpen={mobileSearchOpen}
        setMobileSearchOpen={setMobileSearchOpen}
      />

      {/* Wrapper for search and categories */}
      <div
        className={`px-4 pt-4 transition-all duration-300 ease-in-out ${
          mobileSearchOpen ? "" : ""
        }`}
        style={{ marginTop: mobileSearchOpen ? "64px" : "0px" }}
      >
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
