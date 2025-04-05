import { Button } from "flowbite-react";
import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import PopUpModalComponent from "../pop-up-modal/PopUpModal";
import Login from "../../pages/AuthPage/Login";

export default function NavbarComponents({ setSelectedCategory }) {
  const [bgColor, setBgColor] = useState("bg-white");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  // const categories = [
  //   { path: "/lifestyle", title: "Lifestyle" },
  //   { path: "/technology", title: "Technology" },
  //   { path: "/education", title: "Education" },
  //   { path: "/pop-culture", title: "Pop Culture" },
  //   { path: "/personal-finance", title: "Personal Finance & Budgeting" },
  //   { path: "/programming", title: "Programming Languages" },
  //   { path: "/cooking", title: "Cooking Skills & Techniques" },
  // ];

  // For Login Form

  const handleCreatePost = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setShowLoginModal(true);
    } else {
      navigate("/create-post");
    }
  };

  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };


  const handleLogout = () => {
    setShowSignOutModal(true); // Just show modal
  };


  // For Drop Down Profile
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/categories`
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full flex justify-center z-50 transition-colors duration-300 ${bgColor}`}
      >
        <nav className="w-full max-w-7xl flex items-center justify-between px-6 md:px-12 lg:px-16 h-16 md:h-20 lg:h-18">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <div className="h-full flex items-center hover:cursor-pointer">
              <NavLink to="/">
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
            {/* <div className="relative group">
              <a
                href="#"
                className="text-gray-700 hover:text-[#A27B5C] text-sm md:text-base"
              >
                Categories
              </a>
              <div className="absolute left-0 mt-2 bg-white rounded-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-in-out delay-100">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:text-[#A27B5C]"
                  >
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </button>
                ))}
              </div>
            </div> */}
            <div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400"
                    : "text-gray-700 hover:text-[#A27B5C]"
                }
              >
                Home
              </NavLink>
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

            <Button
              onClick={handleCreatePost}
              className="!bg-[#A27B5C] text-white rounded-full px-3 md:px-6 py-1 md:py-1 text-sm md:text-base md:hover:cursor-pointer md:hover:!bg-[#3F4E4F]  "
            >
              Create Post
            </Button>

            {/* Profile Picture */}
            <div className="relative" ref={dropdownRef}>
              {/* Profile Image */}
              <img
                src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg"
                alt="Profile"
                className="h-8 w-8 rounded-full hover:cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <div className="p-2 border-b border-gray-200">
                    <NavLink
                      to="/profile"
                      className="block text-blue-600 font-medium"
                    >
                      Your Profile
                    </NavLink>
                    
                    {/* <span className="text-gray-500 text-sm">Your Profile</span> */}
                  </div>

                  <nav className="py-1">
                    <a
                      onClick={handleCreatePost}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Create Post
                    </a>
                    <div className="border-t border-gray-200 mt-1"></div>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </a>
                    <div className="border-t border-gray-200 mt-1"></div>
                    <a
                      onClick={() => setShowLoginModal(true)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Log in
                    </a>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
      {/* Alert Component */}
      <PopUpModalComponent
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => {
          setShowLoginModal(false);
          navigate("/login");
        }}
        onRegister={() => {
          setShowLoginModal(false);
          navigate("/register");
        }}
      />
      <Modal
        show={showSignOutModal}
        size="md"
        onClose={() => setShowSignOutModal(false)}
        popup
      >
        <ModalHeader className="bg-white" />
        <ModalBody className="bg-white">
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
              alt="Logout"
              className="mx-auto mb-4 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 object-contain transition-transform duration-300"
            />
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              Are you sure you want to sign out?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setShowSignOutModal(false);
                  confirmLogout();
                }}
              >
                Yes, Sign Out
              </Button>
              <Button color="gray" onClick={() => setShowSignOutModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
