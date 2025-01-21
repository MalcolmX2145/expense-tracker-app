import { motion } from "framer-motion";
import { Ellipsis } from "lucide-react";

const CategoryItem = ({ icon: Icon, color, name }) => {
  return (
    <motion.div
      className="flex items-center justify-between bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-md shadow-md border border-gray-700"
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
      <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
        <Ellipsis className="text-gray-400" />
      </button>
    </motion.div>
  );
};

export default CategoryItem;
