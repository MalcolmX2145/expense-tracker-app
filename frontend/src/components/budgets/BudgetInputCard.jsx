// BudgetInputCard.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import supabase from "../../supabase-client";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BudgetInputCard = ({ onSave, categories = [], existingBudgets = [] }) => {
  const { user } = useAuth();
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  const handleSave = async () => {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    if (existingBudgets.some((budget) => budget.category_id === category)) {
      toast.warning("A budget for this category already exists.");
      return;
    }

    const newBudget = {
      category_id: category,
      limit_value: parseFloat(limit),
      user_id: user.id,
    };

    onSave(newBudget);
    setCategory("");
    setLimit("");
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-semibold text-gray-100 mb-4">Add Budget</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-700 text-gray-100 placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Limit
          </label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="Enter limit"
            className="w-full bg-gray-700 text-gray-100 placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
        >
          Save
        </button>
      </div>
    </motion.div>
  );
};

export default BudgetInputCard;