import ScrollableCategories from "./components/Categories/CategoriesComponent";
import SearchComponent from "./components/search/SearchComponent";
import ContentCardComponent from "./components/card/ContentCardComponent";
import ReadKHBanner from "./components/banner/ReadKhBanner";
import BlogCardGrid from "./components/card/BlogCardGrid";
import React,{ useState, useEffect } from "react";

function App() {

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/blogs`);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        if (result?.blogs && Array.isArray(result.blogs)) {
          setBlogs(result.blogs); // Extract blogs array from response
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
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <div>
      <h1>Blog List</h1>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index}>{blog.title}</li>
        ))}
      </ul>
    </div>
      <div className="ml-4">
        <div>
          <ScrollableCategories />
        </div>
        <div>
          <SearchComponent />
        </div>
        <div>
          <ContentCardComponent
            imgContent={
              "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
            }
          />
          <ContentCardComponent
            imgContent={
              "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            }
          />
          <ContentCardComponent
            imgContent={
              "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
            }
          />
        </div>
        <div>
          <ReadKHBanner />
        </div>
        <div>
          <BlogCardGrid />
          <BlogCardGrid />
        </div>
      </div>
    </>
  );
}

export default App;
