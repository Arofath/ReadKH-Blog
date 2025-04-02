import React from "react";

const ContentCardComponent = ({ imgContent }) => {
  return (
    <div className="w-full mx-auto my-8 hover:cursor-pointer">
      {" "}
      {/* Set to w-full for full-width */}
      <div className="flex flex-col">
        {/* Card content */}
        <div className="flex flex-row space-x-4 mb-4">
          {/* Left side - Image */}
          <div className="w-96 h-64 flex-shrink-0">
            <img
              src={imgContent}
              alt="Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Right side - Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Author info */}
              <div className="flex items-center mb-2">
                <img
                  src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"
                  alt="Profile picture"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <div className="font-medium text-gray-900">Olivia Rhye</div>
                  <div className="text-gray-500 text-sm">26 Jan 2025</div>
                </div>
              </div>

              {/* Article title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                The Impact of Technology on the Workplace: How
              </h2>

              {/* High claim description with line-clamp-3 */}
              <p className="text-gray-600 mb-4 line-clamp-2">
                Groundbreaking innovations are revolutionizing work dynamics.
                Experience unparalleled productivity and a transformative future
                that redefines every industry standard.
              </p>
            </div>

            {/* Bookmark icon aligned to the end */}
            <div className="flex justify-start">
              <button className="text-gray-400 hover:text-[#3f4e4f] hover:cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="border-b border-gray-200"></div>
      </div>
    </div>
  );
};

export default ContentCardComponent;
