import { motion } from "framer-motion";
import { Ellipsis, Wallet, PiggyBank, DollarSign, Home, Briefcase, ShoppingBag, Edit, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const iconMap = { Wallet, PiggyBank, DollarSign, Home, Briefcase, ShoppingBag };

const AccountStatCard = ({ account, onEdit, onDelete }) => {
  if (!account || !account.name) return null;

  console.log("Rendering AccountStatCard:", account);

  const IconComponent = iconMap[account.icon] || Wallet; // Convert string to icon component
  const color = account.color || "#4CAF50"; // Default color if none exists

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    <motion.div className="relative flex items-center justify-between bg-gray-800 p-4 rounded-md shadow-md border border-gray-700">
      <div className="flex items-center">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full"
          style={{ backgroundColor: color }}
        >
          <IconComponent size={20} className="text-white" />
        </div>
        <div className="ml-4">
          <span className="text-gray-100 font-medium">{account.name}</span>
          <p className="text-xl font-semibold text-gray-100">Ksh. {account.balance}</p>
        </div>
      </div>

      {/* Dropdown Button */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <Ellipsis className="text-gray-400" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-gray-700 text-white rounded-md shadow-lg border border-gray-600 z-50">
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                onEdit(account);
              }}
              className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-600"
            >
              <Edit size={16} /> Edit
            </button>
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                onDelete(account.id);
              }}
              className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-400 hover:bg-gray-600"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AccountStatCard;
