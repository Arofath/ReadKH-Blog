import React from "react";
import { NavLink } from "react-router";

import DOMPurify from "dompurify";


const ContentCardComponent = ({ thumbnail, title, content,id }) => {

  const datalist = [ 
    {
        profileimage: "https://capecoraltech.edu/wp-content/uploads/2016/01/tutor-8-3.jpg",
        name: "John Doe",
        date: "14 Jan 2025",
    },
    {
        profileimage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMYR0TAT4xCZgg-7cvDs2gH02sMGHAIbFDYQ&s",
        name: "Jane Smith",
        date: "12 Nov 2024",
    },
    {
        profileimage: "https://preview.redd.it/colorized-photo-of-19-year-old-delta-blues-musician-robert-v0-abpi1m140mma1.jpg?width=640&crop=smart&auto=webp&s=6cc2af177b4adf38df3974b263d383aeb00e7290",
        name: "Robert Johnson",
        date: "10 June 2025",
    },
    {
        profileimage: "https://www.emilydavismusic.com/images/emily_davis_music_living_in_the_past_tense.jpg",
        name: "Emily Davis",
        date: "01 July 2025",
    },
    {
        profileimage: "https://images.rivals.com/image/upload/f_auto,q_auto,t_large/bzd4dr1966m2f50b36vm",
        name: "Michael Wilson",
        date: "22 Fab 2025",
    },
    {
        profileimage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6es7_u3ETPtLpPHgN3c7RGgFI2bq4rcr4pg&s",
        name: "Sarah Brown",
        date: "21 Jan 2025",
    },
    {
        profileimage: "https://img.olympics.com/images/image/private/t_social_share_thumb/f_auto/v1694950107/primary/ass1qd5m3qe39sammqrz",
        name: "David Taylor",
        date: "22 June 2025",
    },
    {
        profileimage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwykXmHb6GiTQkKosL3u9VYoORjRwmeUyovA&s",
        name: "Jennifer Martinez",
        date: "19 June 2025",
    },
    {
        profileimage: "https://upload.wikimedia.org/wikipedia/commons/c/c0/ThomasAnderson%281819-1874%29.jpg",
        name: "Thomas Anderson",
        date: "14 June 2025",
    },
    {
        profileimage: "https://www.jlgroup.net/wp-content/uploads/2023/07/LISA-T.jpg",
        name: "Lisa Thomas",
        date: "10 Dec 2024",
    },
]

 // Generate a random author from the list
 const randomAuthor = datalist[Math.floor(Math.random() * datalist.length)];
// const profileItem = datalist.map((data, index) => {
//   return (
//       <div className="flex items-center space-x-3" key={index}>
//           <div className="h-10 w-10 rounded-full overflow-hidden">
//               <img
//                   src={data.profileimage}
//                   alt={data.name}
//                   className="h-full w-full object-cover"
//               />
//           </div>
//           <div>
//               <p className="font-medium text-gray-800">{data.name}</p>
//               <p className="text-sm text-gray-500">{data.date}</p>
//           </div>
//       </div>
//   )
// });



  return (
    <>
   
    <div className="w-full mx-auto my-8 hover:cursor-pointer">
      {" "}
      {/* Set to w-full for full-width */}
      <div className="flex flex-col">
        {/* Card content */}
        <div className="flex flex-row space-x-4 mb-4">
          {/* Left side - Image */}
          <NavLink
            to={`/blog/${id}`} > 
          <div className="w-96 h-64 flex-shrink-0">
            
            <img
              src={thumbnail}
              alt="Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          </NavLink>
          
          {/* Right side - Content */}
          <div className="flex-1 flex flex-col justify-between">
          <NavLink
            to={`/blog/${id}`} > 
            <div>
             {/* Random author info */}
              <div className="flex items-center mb-2 ">
                <img
                  src={randomAuthor.profileimage}
                  alt="Profile picture"
                  className="w-12 h-12 rounded-full mr-3 object-fit-cover"
                />
                <div>
                  <div className="font-medium text-gray-900">{randomAuthor.name}</div>
                  <div className="text-gray-500 text-sm">{randomAuthor.date}</div>
                </div>
              </div>

              {/* Article title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {title}
              </h2>

               {/* High claim description with line-clamp-3 */}
              <p
                className="text-gray-600 mb-4 line-clamp-4"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
              ></p>
            
            </div>
            </NavLink>

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

    
   
   </>
  );
};

export default ContentCardComponent;
