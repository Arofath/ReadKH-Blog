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

  // Set default category to "Lifestyle"
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      const defaultCategoryId = "5aa8924c-7cf0-4916-b104-51c56607b56d";
      setSelectedCategory(defaultCategoryId);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!selectedCategory) return; // Don't fetch if no category selected

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/blogs?category_id=${selectedCategory}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();
        if (result?.blogs && Array.isArray(result.blogs)) {
          setBlogs(result.blogs);
          setFilteredBlogs(result.blogs); // Set filtered blogs to all blogs initially
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
  }, [selectedCategory]);

  const handleSearchSubmit = (query) => {
    if (query) {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query.toLowerCase()) ||
          blog.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBlogs(filtered); // Set filtered blogs based on the search query
    } else {
      setFilteredBlogs(blogs); // Show all blogs if query is empty
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
      <NavbarComponents onSearchSubmit={handleSearchSubmit} />
      <div className="ml-4">
        <div>
          <ScrollableCategories
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            blogList
          )}
        </div>
        <div>
          <ReadKHBanner />
        </div>
        <div>
          <RandomBlog />
        </div>
      </div>
    </>
  );
}

export default App;
