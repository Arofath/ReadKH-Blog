export default function Members({
  profile,
  name,
  team,
  role,
  facebook,
  github,
}) {
  return (
    <>
      <div className="w-full max-w-sm bg-white dark:bg-gray-950 border border-gray-400 dark:border-gray-500 rounded-4xl p-8 flex flex-col items-center">
        <div className="w-35 h-35 rounded-full overflow-hidden flex justify-center items-center">
          <img
            className="w-full h-full object-cover rounded-full border-4 border-[#A27B5C] dark:border-yellow-400"
            src={profile || "/images/placeholder/placeholder.webp"}
            alt="mentor"
          />
        </div>
        <h5 className="mt-3 text-lg font-bold text-[#A27B5C] dark:text-yellow-400 uppercase">
          {name}
        </h5>
        <small className="text-sm text-gray-500 dark:text-gray-400 mt-2 uppercase">
          {team}
        </small>
        <p className="text-sm uppercase text-white dark:text-gray-950 mt-2 bg-[#A27B5C] dark:bg-yellow-400 w-45 py-2.5 rounded-3xl font-medium">
          {role}
        </p>

        {/* Social Icons */}
        <div className="flex space-x-5 mt-4 text-gray-700 dark:text-gray-200">
          <a href={facebook} target="_blank">
            <i className="fa-brands fa-facebook-f "></i>
          </a>
          <a href={github} target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </>
  );
}
