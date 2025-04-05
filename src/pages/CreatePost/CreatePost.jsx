import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import Select from "react-select";

const CreatePost = () => {
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageDelete = () => {
    setCoverImage(null);
  };

  const handlePublish = () => {
    if (title.trim() && value.trim()) {
      setIsPublished(true);
    } else {
      alert("Please enter a title and content before publishing.");
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["link", "image", "video", "code-block", "formula"],
        ["clean"],
      ],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "align",
    "script",
    "link",
    "image",
    "video",
    "code-block",
    "formula",
  ];

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "AI", label: "AI" },
    { value: "Machine Learning", label: "Machine Learning" },
  ];

  const handleChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  return (
    <div className="mt-10 p-6 max-w-7xl mx-auto border rounded-lg shadow-md bg-white">
      {isPublished ? (
        <div>
          {coverImage && (
            <img
              src={coverImage}
              alt="Cover"
              className="w-full max-w-lg h-auto md:h-64 object-cover rounded-md mx-auto"
            />
          )}
          <h1 className="text-2xl font-bold my-2">{title}</h1>
          <div className="text-gray-600 mb-4">
            Tags: {selectedTags.map((tag) => tag.label).join(", ")}
          </div>
          <div
            className="p-2 text-black"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      ) : (
        <div>
          {/* Image Upload Section */}
          <div className="mb-4 ">
            {coverImage ? (
              <>
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full max-w-lg h-auto md:h-64 object-fill rounded-md mx-auto"
                />
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  <label className="px-4 py-2 border border-gray-300 rounded-full cursor-pointer text-center">
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={handleImageDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-full"
                  >
                    Remove
                  </button>
                </div>
              </>
            ) : (
              <label className="px-4 py-2 border border-gray-300 rounded-full cursor-pointer">
                Add a cover image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Title Input */}
          <input
            type="text"
            placeholder="New post title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-bold border-b-2 outline-none py-2 mb-2"
          />

          {/* Tags Input */}
          <Select
            isMulti
            options={options}
            value={selectedTags}
            onChange={handleChange}
            placeholder="Add tags..."
            className="w-full text-sm text-gray-600 border-b outline-none py-4 mb-4"
          />

          {/* Text Editor */}
          <div className="border p-6 rounded-md">
            {isEditing ? (
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
                placeholder="Write your post content here..."
                className="text-black m-2 responsive-editor"
                style={{
                  backgroundColor: "#FFF",
                  color: "#000",
                  minHeight: "100px", // Minimum height for small screens
                  height: "auto", // Makes it flexible
                  maxHeight: "500px", // Prevents excessive height
                  overflow: "auto",
                }}
              />
            ) : (
              <div
                className="p-2 text-black"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            )}
          </div>

          {/* Buttons: Edit, Preview, Publish */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className={`px-3 py-1 border rounded-full ${
                  isEditing
                    ? "bg-[#A27B5C] text-white"
                    : "bg-white text-[#A27B5C] border-[#A27B5C]"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={`px-3 py-1 border rounded-full ${
                  !isEditing
                    ? "bg-[#A27B5C] text-white"
                    : "bg-white text-[#A27B5C] border-[#A27B5C]"
                }`}
              >
                Preview
              </button>
            </div>

            <button
              onClick={handlePublish}
              className="px-6 py-2 bg-[#A27B5C] text-white rounded-full border border-[#A27B5C] hover:cursor-pointer"
            >
              Publish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
