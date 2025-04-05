import { FaFacebookSquare } from "react-icons/fa";
import {
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaTelegram,
} from "react-icons/fa6";

export default function FooterComponents() {
  return (
    <footer className="bg-white mt-5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo Section */}
        <div className="flex flex-col items-start md:items-end">
          <img
            src="src/img/footer.png"
            alt="Logo"
            className="h-auto w-auto max-w-xs md:max-w-sm lg:max-w-md transition-transform duration-300 hover:-translate-y-2"
          />
        </div>

        {/* Quick Links & Categories - Two Column Layout */}
        <div className="py-20">
          <div className="flex justify-between space-x-10">
            {/* First Column - Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-[#A27B5C]">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#A27B5C]">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#A27B5C]">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/create-post" className="hover:text-[#A27B5C]">
                    Create Post
                  </a>
                </li>
              </ul>
            </div>

            {/* Second Column - Categories */}
            <div className="mr-4">
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-[#A27B5C]">
                    Lifestyle
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#A27B5C]">
                    Technology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#A27B5C]">
                    Education
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#A27B5C]">
                    Pop Culture
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#A27B5C]">
                    Personal Finance & Budgeting
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#A27B5C]">
                    Programming Languages
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#A27B5C]">
                    Cooking Skills & Techniques
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Us */}
        <div className="my-20 ml-20">
          <h3 className="font-semibold text-gray-900 mb-3">Contact Us</h3>
          <p className="text-gray-600">ReadKh@gmail.com</p>
          <p className="text-gray-600">0 123 456 789</p>
          <p className="text-gray-600">ReadKh.com</p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
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
                className="text-gray-600 hover:text-gray-900"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
