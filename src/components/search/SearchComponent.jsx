import React, { useState, useRef } from "react";

const SearchComponent = () => {
  const [inputText, setInputText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  const buttonRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (!isExpanded && e.target.value.length > 0) {
      setIsExpanded(true);
    }
  };

  const handlePost = () => {
    alert("Posted: " + inputText);
    setInputText("");
    setIsExpanded(false);
  };

  const handleInputFocus = () => {
    setIsExpanded(true);
  };

  const handleInputBlur = () => {
    // Only collapse if clicking outside the component and input is empty
    if (inputText.length === 0) {
      setIsExpanded(false);
    }
  };

  const handleButtonFocus = () => {
    setIsButtonFocused(true);
  };

  const handleButtonBlur = () => {
    setIsButtonFocused(false);
  };

  const handleButtonMouseDown = () => {
    if (inputText.length > 0) {
      // Visual feedback - simulate click/press
      if (buttonRef.current) {
        buttonRef.current.classList.add("transform", "scale-95");
        setTimeout(() => {
          if (buttonRef.current) {
            buttonRef.current.classList.remove("transform", "scale-95");
          }
        }, 150);
      }
    }
  };

  return (
    <div className="w-full mx-auto m-10">
      {" "}
      {/* Set to w-full for full-width */}
      <div
        className={`border rounded-lg ${
          isExpanded ? "border-blue-500 shadow-md" : "border-gray-300"
        } flex flex-col`}
      >
        {/* Top section with input */}
        <div className="p-2 flex items-start">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="What's on your mind?"
              className="w-full text-lg focus:outline-none"
              value={inputText}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
          <div className="ml-2">
            <div className="w-2 h-2 rounded-full bg-purple-700"></div>
          </div>
        </div>

        {/* Bottom section with character count and post button - only shown when expanded */}
        {isExpanded && (
          <div className="border-t border-gray-200 p-2 px-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {inputText.length >= 0 && (
                <>
                  Quickie Posts (beta) show up in the feed but not notifications
                  or your profile —{" "}
                  <span className="text-blue-500">Open Full Editor</span>
                </>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-3">{inputText.length}/256</span>
              <button
                ref={buttonRef}
                className={`rounded-lg px-6 py-2 font-medium text-white transition-all duration-150 ${
                  inputText.length > 0
                    ? isButtonFocused
                      ? "bg-[#a27b5c] ring-2 ring-blue-300"
                      : "bg-[#a27b5c] hover:bg-[#3f4e4f]"
                    : "bg-[#a27b5c] opacity-35 y-300 cursor-not-allowed"
                }`}
                onClick={handlePost}
                onFocus={handleButtonFocus}
                onBlur={handleButtonBlur}
                onMouseDown={handleButtonMouseDown}
                onTouchStart={handleButtonMouseDown}
                disabled={inputText.length === 0}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
