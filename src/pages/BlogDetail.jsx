import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BASE_URL } from "../services/api"; 
import DOMPurify from "dompurify";

function BlogDetail() {

  const navigate = useNavigate(); // ✅ Hook for navigation
  const { id } = useParams(); // ✅ Get the ID from URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blogs/${id}`); // ✅ Fetch by ID
        if (!response.ok) throw new Error("Failed to fetch blog details");
        const result = await response.json();
        setBlog(result);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [id]); // ✅ Re-fetch when ID changes

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#FDFCF7] min-h-screen px-5 flex justify-center">
      <div className="mx-auto text-black mt-4 max-w-3xl">
       
        <img
          className="w-full rounded-md"
          src={blog.thumbnail || "/images/default.jpg"}
          alt="Blog Header"
        />
        <h1 className="text-2xl font-bold mt-4 ">{blog.title}</h1>
        <p className="text-gray-700 text-xl mt-4 text-justify"  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}>
       
          {/* {blog.content} */}
          </p>
           {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // ✅ Go back to previous page
          className="bg-[#a27b5c] text-white px-4 py-2 rounded-md hover:bg-[#3f4e4f] transition mb-6 mt-15"
        >
           Back to blogs
        </button>
      </div>
      
    </div>
  );
}

export default BlogDetail;
