export default function Mentors({ profile, name, role, position }) {
  return (
    <>
        {/* Mentor Card 1 */}
        <div className="w-full max-w-sm bg-white border border-[#AAAAAA] rounded-2xl px-15 py-10 flex flex-col items-center">
          <div className="w-35 h-35 rounded-full overflow-hidden flex justify-center items-center">
            <img
              className="w-full h-full object-cover rounded-full border-4 border-[#A27B5C]"
              src={profile || "/images/placeholder/placeholder.webp"}
              alt="mentor"
            />
          </div>
          <h5 className="mt-3 text-xl font-semibold text-[#A27B5C]">{name}</h5>
          <small className="text-sm text-gray-500 mt-2">{role}</small>
          <p className="text-sm uppercase text-white font-medium mt-2 bg-[#A27B5C] w-50 py-3 rounded-3xl">
            {position}
          </p>

          {/* Social Icons */}
          <div className="flex space-x-5 mt-4 text-gray-700">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-github"></i>
          </div>
        </div>
    </>
  );
}

// {/* <div className="grid grid-cols-1 px-10">
//   {/* Mentor Card */}
//   <div className="w-full max-w-sm bg-white py-10 flex flex-col items-center">
//     <div className="w-40 h-40 rounded-full overflow-hidden flex justify-center items-center">
//       <img className="w-full h-full object-cover" src={profile} alt="mentor" />
//     </div>
//     <h5 className="mt-3 text-xl font-semibold text-gray-900">{name}</h5>
//     <small className="text-sm text-gray-500 mt-2">{role}</small>
//     <p className="text-sm uppercase text-[#A27B5C] font-medium mt-2">
//       {position}
//     </p>

//     {/* Social Icons */}
//     <div className="flex space-x-6 mt-4 text-gray-700">
//       <i className="fa-brands fa-facebook-f"></i>
//       <i className="fa-brands fa-instagram"></i>
//       <i className="fa-brands fa-pinterest-p"></i>
//       <i className="fa-brands fa-x-twitter"></i>
//     </div>
//   </div>
// </div>; */}
