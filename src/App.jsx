import ScrollableCategories from "./components/Categories/CategoriesComponent";
import SearchComponent from "./components/search/SearchComponent";
import ContentCardComponent from "./components/card/ContentCardComponent";
import ReadKHBanner from "./components/banner/ReadKhBanner";
import BlogCardGrid from "./components/card/BlogCardGrid";

function App() {
  return (
    <>
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
