import { useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import {
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaTelegram,
} from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { NavLink } from "react-router";

export default function FooterComponents() {
  const [open, setOpen] = useState(null);

  const toggle = (section) => {
    setOpen(open === section ? null : section);
  };

  return (
    <footer className="bg-white dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-end md:flex-row md:justify-end">
          <>
            {/* Light mode logo */}
            <img
              src="/images/logo/footer.png"
              alt="Logo"
              className="block dark:hidden h-auto w-auto max-w-xs md:max-w-sm lg:max-w-md transition-transform duration-300 hover:-translate-y-2"
            />

            {/* Dark mode logo */}
            <img
              src="/images/logo/ReadKh-darkmode.1.png"
              alt="Logo Dark"
              className="hidden dark:block h-auto w-auto max-w-xs md:max-w-sm lg:max-w-md transition-transform duration-300 hover:-translate-y-2"
            />
          </>
        </div>

        {/* Quick Links */}
        <div className="w-full lg:py-20">
          <div className="flex justify-between space-x-10 max-md:hidden">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  <NavLink to="/" className="hover:text-[#A27B5C]">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className="hover:text-[#A27B5C]">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="hover:text-[#A27B5C]">
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/create-post" className="hover:text-[#A27B5C]">
                    Create Post
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Collapsibles */}
          <div className="md:hidden">
            {/* Quick Links Toggle */}
            <div
              onClick={() => toggle("quick")}
              className="cursor-pointer flex justify-between items-center py-2 border-b dark:border-gray-700"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Quick Links
              </h3>
              <FaChevronDown
                className={`transition-transform ${
                  open === "quick" ? "rotate-180" : ""
                }`}
              />
            </div>
            {open === "quick" && (
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 mt-2 pl-2">
                <li>
                  <NavLink to="/" className="hover:text-[#A27B5C]">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className="hover:text-[#A27B5C]">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="hover:text-[#A27B5C]">
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/create-post" className="hover:text-[#A27B5C]">
                    Create Post
                  </NavLink>
                </li>
              </ul>
            )}

            {/* Categories Toggle */}
            <div
              onClick={() => toggle("categories")}
              className="cursor-pointer flex justify-between items-center py-2 mt-4 border-b dark:border-gray-700"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Categories
              </h3>
              <FaChevronDown
                className={`transition-transform ${
                  open === "categories" ? "rotate-180" : ""
                }`}
              />
            </div>
            {open === "categories" && (
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 mt-2 pl-2">
                {[
                  "Lifestyle",
                  "Technology",
                  "Education",
                  "Pop Culture",
                  "Personal Finance & Budgeting",
                  "Programming Languages",
                  "Cooking Skills & Techniques",
                ].map((category, idx) => (
                  <li key={idx}>
                    <a href="#" className="hover:text-[#A27B5C]">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Categories (Desktop) */}
        <div className="lg:my-20 max-md:hidden">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Categories
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-4">
            {[
              "Lifestyle",
              "Technology",
              "Education",
              "Pop Culture",
              "Personal Finance & Budgeting",
              "Programming Languages",
              "Cooking Skills & Techniques",
            ].map((category, idx) => (
              <li key={idx}>
                <a href="#" className="hover:text-[#A27B5C]">
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="w-full lg:py-20 lg:flex lg:items-end lg:flex-col">
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Contact Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              <a
                href="mailto:ReadKh@gmail.com"
                className="hover:text-[#A27B5C]"
              >
                ReadKh@gmail.com
              </a>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <a href="tel:+855974716039" className="hover:text-[#A27B5C]">
                +855 974 716 039
              </a>
            </p>
            <p className="text-gray-600 dark:text-gray-300">ReadKh.com</p>
            <div className="flex justify-start space-x-4 mt-4 mb-4">
              {[
                FaFacebookSquare,
                FaInstagram,
                FaLinkedin,
                FaXTwitter,
                FaTelegram,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-5">
        © {new Date().getFullYear()} ReadKh. All Rights Reserved.
      </div>
    </footer>
  );
}
