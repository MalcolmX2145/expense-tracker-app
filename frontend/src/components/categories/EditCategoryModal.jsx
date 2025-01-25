import { useState } from "react";
import {
  Gift,
  Wallet,
  DollarSign,
  Home,
  Coffee,
  ShoppingCart,
  Car,
  Book,
  Plane,
  Heart,
  Music,
  Tv,
  Smile,
  Briefcase,
  PieChart,
  ShoppingBag,
} from "lucide-react";

const EditCategoryModal = ({ isOpen, onClose, category, onSave }) => {
  const [newName, setNewName] = useState(category?.name || "");
  const [newIcon, setNewIcon] = useState(category?.icon || Gift);

  const icons = [
    Gift,
    Wallet,
    DollarSign,
    Home,
    Coffee,
    ShoppingCart,
    Car,
    Book,
    Plane,
    Heart,
    Music,
    Tv,
    Smile,
    Briefcase,
    PieChart,
    ShoppingBag,
  ];

  if (!isOpen) return null;

  const handleSave = () => {
    if (!newIcon) {
      console.error("Icon is undefined!");
      return;
    }
    onSave({ name: newName, icon: newIcon });
    onClose();
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold text-white mb-4">Edit Category</h2>

        {/* Category Name Input */}
        <label htmlFor="categoryName" className="block text-sm text-gray-400 mb-2">
          Category Name
        </label>
        <input
          id="categoryName"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded mb-4 focus:outline-none focus:ring focus:ring-indigo-500"
        />

        {/* Icon Selector */}
        <label htmlFor="iconSelector" className="block text-sm text-gray-400 mb-2">
          Select Icon
        </label>
        <div
          id="iconSelector"
          className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700 py-2 px-1 border border-gray-600 rounded mb-4"
        >
          {icons.map((Icon, index) => (
            <button
              key={index}
              onClick={() => setNewIcon(Icon)}
              className={`p-2 rounded-full border-2 ${
                newIcon === Icon ? "border-indigo-500" : "border-transparent"
              } hover:border-indigo-500`}
            >
              <Icon size={24} className="text-white" />
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
