import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Ellipsis } from "lucide-react";

const CategoryItem = ({ icon: Icon, color, name, onEdit, onDelete }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      className="relative flex items-center justify-between bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-md shadow-md border border-gray-700"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full"
          style={{ backgroundColor: color }}
        >
          <Icon size={20} className="text-white" />
        </div>
        <span className="ml-4 text-gray-100 font-medium">{name}</span>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          onClick={toggleDropdown}
        >
          <Ellipsis className="text-gray-400" />
        </button>
        {isDropdownOpen && (
          <div
            className="absolute right-0 bottom-full mb-2 bg-gray-700 text-white rounded-md shadow-lg w-40"
          >
            <button
              onClick={onEdit}
              className="block w-full px-4 py-2 text-left hover:bg-gray-600"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="block w-full px-4 py-2 text-left hover:bg-gray-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CategoryItem;
