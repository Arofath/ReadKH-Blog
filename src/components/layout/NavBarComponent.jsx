import { Button } from "flowbite-react";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";

export default function NavbarComponents() {
  const [bgColor, setBgColor] = useState("bg-white");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setBgColor("bg-[#ECECEE]");
      } else {
        setBgColor("bg-white");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { path: "/lifestyle", title: "Lifestyle" },
    { path: "/technology", title: "Technology" },
    { path: "/education", title: "Education" },
    { path: "/pop-culture", title: "Pop Culture" },
    { path: "/personal-finance", title: "Personal Finance & Budgeting" },
    { path: "/programming", title: "Programming Languages" },
    { path: "/cooking", title: "Cooking Skills & Techniques" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-center z-50 transition-colors duration-300 ${bgColor}`}
    >
      <nav className="w-full max-w-7xl flex items-center justify-between px-6 md:px-12 lg:px-16 h-16 md:h-20 lg:h-18">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="h-full flex items-center hover:cursor-pointer">
            <NavLink to="https://www.youtube.com/">
              <img
                src="src/img/logo.png"
                alt="Logo"
                className="h-30 object-contain"
              />
            </NavLink>
          </div>
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-32 sm:w-48 md:w-64 lg:w-80 pl-10 pr-4 py-2 border rounded-full border-[#B9B28A] focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Categories Dropdown */}
          <div className="relative group">
            <a
              href="#"
              className="text-gray-700 hover:text-[#A27B5C] text-sm md:text-base"
            >
              Categories
            </a>
            <div className="absolute left-0 mt-2 bg-white rounded-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-in-out delay-100">
              {categories.map((category, index) => (
                <NavLink
                  key={index}
                  to={category.path}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 text-yellow-400"
                      : "block px-4 py-2 text-gray-700 hover:text-[#A27B5C]"
                  }
                >
                  {category.title}
                </NavLink>
              ))}
            </div>
          </div>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400"
                : "text-gray-700 hover:text-[#A27B5C]"
            }
          >
            About Us
          </NavLink>

          <Button className="!bg-[#A27B5C] text-white rounded-full px-3 md:px-6 py-1 md:py-1 text-sm md:text-base md:hover:cursor-pointer md:hover:!bg-[#3F4E4F] border border-b border-[#EBE5C2]">
            Create Post
          </Button>

          {/* Profile Picture */}
          <img
            src="https://media.licdn.com/dms/image/D4D12AQENkvRx8RBR8w/article-cover_image-shrink_720_1280/0/1682548841817?e=2147483647&v=beta&t=gtKEFL5W6SJ0I2MD-RXKPCYXJKlDBFuxJqQJBCLNog4"
            alt="Profile"
            className="h-6 w-6 md:h-8 md:w-8 rounded-full border hover:cursor-pointer"
          />
        </div>
      </nav>
    </div>
  );
}
