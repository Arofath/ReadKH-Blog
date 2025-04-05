export default function Mentors({ profile, name, role, position, facebook, github }) {
  return (
    <>
        {/* Mentor Card 1 */}
        <div className="w-full max-w-sm bg-white border border-[#AAAAAA] rounded-4xl px-15 py-10 flex flex-col items-center">
          <div className="w-35 h-35 rounded-full overflow-hidden flex justify-center items-center">
            <img
              className="w-full h-full object-cover rounded-full border-4 border-[#A27B5C]"
              src={profile || "/images/placeholder/placeholder.webp"}
              alt="mentor"
            />
          </div>
          <h5 className="mt-3 text-xl font-bold text-[#A27B5C] uppercase">{name}</h5>
          <small className="text-sm text-gray-500 mt-2 uppercase ">{role}</small>
          <p className="text-sm uppercase text-white font-medium mt-2 bg-[#A27B5C] w-50 py-3 rounded-3xl">
            {position}
          </p>

          {/* Social Icons */}
          <div className="flex space-x-5 mt-4 text-gray-700">
            <a href={facebook} target="_blank"><i className="fa-brands fa-facebook-f"></i></a>
            <a href={github} target="_blank"><i className="fa-brands fa-github"></i></a>
          </div>
        </div>
    </>
  );
}