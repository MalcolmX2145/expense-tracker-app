import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const BudgetCard = ({ budgets, onDeleteBudget }) => {
  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {budgets.map((budget, index) => (
        <motion.div
          key={index}
          className="relative w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700"
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        >
          <div className="px-4 py-5 sm:p-6">
            <span className="flex items-center text-sm font-medium text-gray-400 mb-2">
              {budget.icon && <budget.icon size={20} className="mr-2" style={{ color: budget.color }} />}
              {budget.category}
            </span>
            <p className="text-sm text-gray-400">
              <span className="font-semibold">Limit:</span> Ksh. {budget.limit.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-semibold">Spent:</span> Ksh. {budget.spent.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-semibold">Remaining:</span> Ksh. {(budget.limit - budget.spent).toFixed(2)}
            </p>
          </div>
          <button
            className="absolute bottom-2 right-2 p-2 rounded-full hover:shadow-lg hover:shadow-gray~-500/50 transition-shadow text-red-400 hover:text-red-300"
            onClick={() => onDeleteBudget(index)}
          >
            <Trash2 size={18} />
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default BudgetCard;
