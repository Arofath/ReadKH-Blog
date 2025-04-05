import ScrollableCategories from "./components/Categories/CategoriesComponent";
import SearchComponent from "./components/search/SearchComponent";
import ContentCardComponent from "./components/card/ContentCardComponent";
import ReadKHBanner from "./components/banner/ReadKhBanner";
import RandomBlog from "./components/card/RandomBlog";
import React, { useState, useEffect } from "react";
import ButtonSave from "./components/profilepage/ButtonSave";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Category ID
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set default category to "Lifestyle" (you'll need the category ID)
  useEffect(() => {
    // Check URL for category param
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      // Your existing default category logic
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
          `${import.meta.env.VITE_BASE_URL}/blogs?category_id=${selectedCategory}`
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        if (result?.blogs && Array.isArray(result.blogs)) {
          setBlogs(result.blogs);
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
  }, [selectedCategory]); // Re-fetch when category changes

  const blogList = blogs.map((data) => (
    <ContentCardComponent
      key={data.id}
      title={data.title}
      content={data.content}
      thumbnail={data.thumbnail}
      id={data.id}
      date={data.created_at}
    />
  ));

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="ml-4">
        <div>
          {/* Category Selector */}
          <ScrollableCategories
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>
        <div>
          <SearchComponent />
        </div>
        <div>
          {/* Render the blog list */}
          {blogList}
        </div>
        <div>
          <ReadKHBanner />
        </div>
        <div>
          {/* Render the random blog */}
          {/* <ButtonSave /> */}
          <RandomBlog />
        </div>
      </div>
    </>
  );
}

export default App;
