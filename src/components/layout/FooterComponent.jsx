import { Facebook, Linkedin, Instagram, X, Send } from "lucide-react";

export default function FooterComponents() {
  return (
    <footer className="bg-white mt-5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo Section - Centered Image */}
        <div className="flex flex-col items-start md:items-end">
          <img
            src="src/img/footer.png"
            alt="Logo"
            className="h-auto w-auto max-w-xs md:max-w-sm lg:max-w-md transition-transform duration-300 hover:-translate-y-2"
          />
        </div>

        {/* Quick Links */}
        <div className="py-20">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Link</h3>
          <ul className="space-y-2 text-gray-600 ">
            {[
              "Home",
              "About Us",
              "Lifestyle",
              "Technology",
              "Education",
              "Pop Culture",
              "Personal Finance & Budgeting",
              "Programming Languages",
              "Cooking Skills & Techniques",
            ].map((link, index) => (
              <li key={index}>
                <a href="#" className="hover:text-[#A27B5C]">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="my-20">
          <h3 className="font-semibold text-gray-900 mb-3">Contact Us</h3>
          <p className="text-gray-600">ReadKh@gmail.com</p>
          <p className="text-gray-600">0 123 456 789</p>
          <p className="text-gray-600">ReadKh.com</p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            {[Facebook, Linkedin, Instagram, X, Send].map((Icon, index) => (
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
