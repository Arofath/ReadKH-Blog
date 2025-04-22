import { Button } from "flowbite-react";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import PopUpModalComponent from "../pop-up-modal/PopUpModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function NavbarComponents({
  onSearchSubmit,
  setSelectedCategory,
}) {
  const [bgColor, setBgColor] = useState("bg-white");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authorId, setAuthorId] = useState("");
  const [token, setToken] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleHomeClick = () => {
    setSelectedCategory("all");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        //setBgColor("bg-[#ECECEE]");
      } else {
        setBgColor("bg-white");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  // Check authToken for navigation
  const handleProfileNavigation = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  const handleCreatePost = () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setShowLoginModal(true);
    } else {
      navigate("/create-post");
    }
  };

  const isLoggingOutRef = useRef(false);

  const confirmLogout = () => {
    if (isLoggingOutRef.current) return;
    isLoggingOutRef.current = true;

    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");

    setToken(null);
    setAuthor(null);
    setAuthorId(null);

    navigate("/");
    setShowSignOutModal(false);

    toast.success("Successfully signed out!", {
      position: "top-center",
      autoClose: 3000,
    });

    setTimeout(() => {
      isLoggingOutRef.current = false;
      setShowSignOutModal(false);
    }, 1000);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("authToken");
      if (!storedToken) {
        // No token? Just skip the fetch and clear profile-related state
        setAuthor(null);
        setAuthorId(null);
        return;
      }

      setToken(storedToken);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Profile fetch error:", errorText);
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      const profile = data.profile || {};

      setAuthor(profile);
      const profileId = profile?.id;

      if (profileId) {
        localStorage.setItem("userId", profileId);
        setAuthorId(profileId);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(null); // prevent "please log in" message in UI
    } finally {
      setLoading(false);
    }
  };

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
    fetchProfile();
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [navigate]);

  if (loading)
    return (
      <p className="text-center text-gray-600 text-lg">Loading blogs...</p>
    );
  if (error)
    return <p className="text-center text-gray-500 text-lg">Error: {error}</p>;

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full flex justify-center z-50 transition-colors duration-300 ${bgColor} shadow-sm`}
      >
        <nav className="w-full max-w-7xl flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 h-14 sm:h-16 md:h-18 lg:h-20">
          {/* Left Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="h-full flex items-center hover:cursor-pointer">
              <NavLink to="/">
                <img
                  src="../images/logo/logo.png"
                  alt="Logo"
                  className=" h-27 object-contain"
                  onClick={handleHomeClick}
                />
              </NavLink>
            </div>
            {/* Search */}
            <div className="relative hidden sm:block">
              <form
                onSubmit={handleSearchSubmit}
                className="relative hidden sm:block"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-32 sm:w-40 md:w-64 lg:w-80 pl-8 sm:pl-10 pr-4 py-1 sm:py-2 text-sm border rounded-full border-[#B9B28A] focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              </form>
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
              onClick={handleHomeClick}
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

            <div className="relative hover:cursor-pointer" ref={dropdownRef}>
              {/* Profile */}
              <div>
                {author ? (
                  <img
                    src={
                      author.profileUrl ||
                      "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                    }
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                ) : (
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                    alt="Default Profile"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                )}
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 ">
                  <div className="p-2 border-b border-gray-200">
                    <button
                      onClick={handleProfileNavigation}
                      className="block text-[#A27B5C] font-medium w-full text-left hover:cursor-pointer"
                    >
                      Your Profile
                    </button>
                  </div>

                  <nav className="py-1">
                    <a
                      onClick={handleCreatePost}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Create Post
                    </a>

                    {/* Conditionally render Sign Out or Log in based on authToken */}
                    {localStorage.getItem("authToken") ? (
                      <>
                        <div className="border-t border-gray-200 mt-1"></div>
                        <a
                          onClick={confirmLogout}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Sign Out
                        </a>
                      </>
                    ) : (
                      <>
                        <div className="border-t border-gray-200 mt-1"></div>
                        <a
                          onClick={() => setShowLoginModal(true)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Log in
                        </a>
                      </>
                    )}
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
                onClick={handleHomeClick}
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

              <button
                onClick={handleProfileNavigation}
                className="text-gray-700 hover:text-[#A27B5C] text-lg py-2 text-left"
              >
                Your Profile
              </button>

              <button
                onClick={handleCreatePost}
                className="bg-[#A27B5C] text-white rounded-full px-6 py-2 text-base hover:bg-[#3F4E4F] w-full text-center mt-2"
              >
                Create Post
              </button>

              <div className="border-t border-gray-200 pt-2">
                <button
                  onClick={confirmLogout}
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
                  confirmLogout();
                }}
                className="text-sm sm:text-base hover:cursor-pointer"
              >
                Yes, Sign Out
              </Button>
              <Button
                color="gray"
                onClick={() => setShowSignOutModal(false)}
                className="text-sm sm:text-base hover:cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <ToastContainer />
    </>
  );
}
