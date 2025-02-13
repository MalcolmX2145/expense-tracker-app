// BudgetCard.jsx
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "../../supabase-client";
import { toast } from "react-toastify";

/**
 * BudgetCard Component
 * Displays a list of budget cards with spending progress and delete functionality
 * @param {Object[]} budgets - Array of budget objects from the database
 * @param {Function} onDeleteBudget - Callback function to handle budget deletion
 */
const BudgetCard = ({ budgets, onDeleteBudget }) => {
  // State to store budgets with their spent amounts
  const [budgetsWithSpent, setBudgetsWithSpent] = useState([]);

  // Fetch spent amounts whenever budgets change
  useEffect(() => {
    if (budgets.length > 0) {
      fetchSpentAmounts();
    }
  }, [budgets]);

  /**
   * Fetches and calculates spent amounts for each budget category
   * Combines transaction data with budget limits
   */
  const fetchSpentAmounts = async () => {
    try {
      // Get current user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        console.error("User not authenticated");
        return;
      }

      const userId = userData.user.id;

      // Fetch all transactions for the user
      const { data: transactions, error } = await supabase
        .from("transactions")
        .select("category_id, amount")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to fetch spending data.");
        return;
      }

      // Calculate total spent amount per category
      const spentByCategory = transactions.reduce((acc, transaction) => {
        acc[transaction.category_id] = (acc[transaction.category_id] || 0) + transaction.amount;
        return acc;
      }, {});

      // Combine budget data with spent amounts
      const updatedBudgets = budgets.map((budget) => ({
        ...budget,
        spent: spentByCategory[budget.category_id] || 0,
      }));

      setBudgetsWithSpent(updatedBudgets);
    } catch (error) {
      console.error("Error fetching spent amounts:", error.message);
      toast.error("Failed to load spent data.");
    }
  };

  /**
   * Determines progress bar color based on spending percentage
   * @param {number} spent - Amount spent
   * @param {number} limit - Budget limit
   * @returns {string} Tailwind CSS class for background color
   */
  const getProgressColor = (spent, limit) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return "bg-red-500";    // Critical (90%+)
    if (percentage >= 75) return "bg-yellow-500"; // Warning (75-90%)
    return "bg-green-500";                        // Good (< 75%)
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {budgetsWithSpent.length > 0 ? (
        budgetsWithSpent.map((budget) => (
          <motion.div
            key={budget.id}
            className="relative w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="px-4 py-5 sm:p-6">
              {/* Category Name */}
              <span className="flex items-center text-sm font-medium text-gray-400 mb-2">
                {budget.categories?.name || "Unknown Category"}
              </span>

              {/* Budget Information */}
              <p className="text-sm text-gray-400">
                <span className="font-semibold">Limit:</span> Ksh. {budget.limit_value.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-semibold">Spent:</span> Ksh. {budget.spent.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-semibold">Remaining:</span> Ksh. {(budget.limit_value - budget.spent).toFixed(2)}
              </p>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(budget.spent, budget.limit_value)} transition-all duration-300`}
                    style={{
                      width: `${Math.min((budget.spent / budget.limit_value) * 100, 100)}%`
                    }}
                  />
                </div>
                {/* Percentage Display */}
                <p className="text-xs text-gray-400 mt-1">
                  {((budget.spent / budget.limit_value) * 100).toFixed(1)}% used
                </p>
              </div>
            </div>

            {/* Delete Button */}
            <button
              className="absolute bottom-2 right-2 p-2 rounded-full hover:shadow-lg hover:shadow-gray-500/50 transition-shadow text-red-400 hover:text-red-300"
              onClick={() => onDeleteBudget(budget.id)}
            >
              <Trash2 size={18} />
            </button>
          </motion.div>
        ))
      ) : (
        <p className="text-gray-400">No budgets added yet.</p>
      )}
    </div>
  );
};

export default BudgetCard;