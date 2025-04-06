import { Button } from "flowbite-react";
import { Search, Menu, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
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

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [navigate]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full flex justify-center z-50 transition-colors duration-300 ${bgColor} shadow-sm`}
      >
        <nav className="w-full max-w-7xl flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 h-14 sm:h-16 md:h-18 lg:h-20">
          {/* Left Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Logo */}
            <div className="h-full flex items-center hover:cursor-pointer">
              <NavLink to="/">
                <img
                  src="../images/logo/logo.png"
                  alt="Logo"
                  className="h-8 sm:h-10 md:h-12 lg:h-14 object-contain"
                />
              </NavLink>
            </div>
            {/* Search Bar - Hidden on mobile */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search..."
                className="w-32 sm:w-40 md:w-64 lg:w-80 pl-8 sm:pl-10 pr-4 py-1 sm:py-2 text-sm border rounded-full border-[#B9B28A] focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4 md:space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 text-sm md:text-base"
                  : "text-gray-700 hover:text-[#A27B5C] text-sm md:text-base"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 text-sm md:text-base"
                  : "text-gray-700 hover:text-[#A27B5C] text-sm md:text-base"
              }
            >
              About Us
            </NavLink>

            <Button
              onClick={handleCreatePost}
              className="!bg-[#A27B5C] text-white rounded-full px-4 md:px-6 py-1 text-xs md:text-sm lg:text-base md:hover:cursor-pointer md:hover:!bg-[#3F4E4F]"
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

        {/* Mobile Menu - Full screen overlay */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="fixed inset-0 top-14 sm:top-16 bg-white z-40 flex flex-col"
          >
            {/* Search Bar - Mobile Only */}
            <div className="relative px-4 py-4 border-b border-gray-200">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-full border-[#B9B28A] focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>

            <div className="flex flex-col px-4 py-2 space-y-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 text-lg py-2"
                    : "text-gray-700 hover:text-[#A27B5C] text-lg py-2"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 text-lg py-2"
                    : "text-gray-700 hover:text-[#A27B5C] text-lg py-2"
                }
              >
                About Us
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 text-lg py-2"
                    : "text-gray-700 hover:text-[#A27B5C] text-lg py-2"
                }
              >
                Your Profile
              </NavLink>

              <button
                onClick={handleCreatePost}
                className="bg-[#A27B5C] text-white rounded-full px-6 py-2 text-base hover:bg-[#3F4E4F] w-full text-center mt-2"
              >
                Create Post
              </button>

              <div className="border-t border-gray-200 pt-2">
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-[#A27B5C] text-lg py-2 w-full text-left"
                >
                  Sign Out
                </button>
              </div>

              <div className="border-t border-gray-200 pt-2">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-gray-700 hover:text-[#A27B5C] text-lg py-2 w-full text-left"
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        )}
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
              className="mx-auto mb-4 h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain transition-transform duration-300"
            />
            <h3 className="mb-4 text-base sm:text-lg font-semibold text-gray-700">
              Are you sure you want to sign out?
            </h3>
            <div className="flex justify-center gap-2 sm:gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setShowSignOutModal(false);
                  confirmLogout();
                }}
                className="text-sm sm:text-base"
              >
                Yes, Sign Out
              </Button>
              <Button 
                color="gray" 
                onClick={() => setShowSignOutModal(false)}
                className="text-sm sm:text-base"
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}