import { useState } from "react";
import { Bookmark } from "lucide-react";
import RandomBlog from "../card/RandomBlog";

export default function ButtonSave() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
      <button 
        className="flex items-center justify-between w-full max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl border-gray-300 hover:border-[#A27B5C] transition-colors"
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="currentColor" />
          <span className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800">
            Save
          </span>
        </div>

        {/* Empty space to maintain layout */}
        <div className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className={`w-6xl mx-auto my-4 transition-all duration-300 ${
        isOpen ? 'max-h-[3000px] opacity-100 mt-4' : 'max-h-0 opacity-0'
      }`}>
        {isOpen && <RandomBlog />}
      </div>
    </div>
  );
}
