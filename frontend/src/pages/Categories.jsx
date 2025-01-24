import { useState } from "react";
import Header from "../components/Header";
import CategoryItem from "../components/categories/CategoryItem.jsx";
import EditCategoryModal from "../components/categories/EditCategoryModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Gift, Wallet, DollarSign, Plus } from "lucide-react";

const Categories = () => {
  const [incomeCategories, setIncomeCategories] = useState([
    { icon: Gift, color: "#34D399", name: "Gifts" },
    { icon: Wallet, color: "#3B82F6", name: "Salary" },
    { icon: DollarSign, color: "#F59E0B", name: "Other Income" },
  ]);

  const [expenseCategories, setExpenseCategories] = useState([
    { icon: Wallet, color: "#EF4444", name: "Rent" },
    { icon: Gift, color: "#6B7280", name: "Entertainment" },
    { icon: DollarSign, color: "#10B981", name: "Utilities" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isIncome, setIsIncome] = useState(true);

  const handleEdit = (category, isIncomeCategory) => {
    setCurrentCategory(category);
    setIsIncome(isIncomeCategory);
    setIsModalOpen(true);
  };

  const handleDelete = (categoryName, isIncomeCategory) => {
    if (isIncomeCategory) {
      setIncomeCategories((prev) =>
        prev.filter((cat) => cat.name !== categoryName)
      );
      toast.success(`Income category "${categoryName}" deleted!`);
    } else {
      setExpenseCategories((prev) =>
        prev.filter((cat) => cat.name !== categoryName)
      );
      toast.success(`Expense category "${categoryName}" deleted!`);
    }
  };

  const handleSave = (newName) => {
    if (isIncome) {
      setIncomeCategories((prev) =>
        prev.map((cat) =>
          cat.name === currentCategory.name ? { ...cat, name: newName } : cat
        )
      );
    } else {
      setExpenseCategories((prev) =>
        prev.map((cat) =>
          cat.name === currentCategory.name ? { ...cat, name: newName } : cat
        )
      );
    }

    toast.success(`Category updated to "${newName}"`);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 flex flex-col space-y-6">
      <Header title="Categories" />

      {/* Income Categories Section */}
      <div className="px-6">
        <h1 className="text-xl font-semibold text-gray-100 mb-2">Income Categories</h1>
        <hr className="border-t border-gray-600 mb-6" />
        <div className="space-y-2">
          {incomeCategories.map((category, index) => (
            <CategoryItem
              key={index}
              icon={category.icon}
              color={category.color}
              name={category.name}
              onEdit={() => handleEdit(category, true)}
              onDelete={() => handleDelete(category.name, true)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() =>
              setIncomeCategories([
                ...incomeCategories,
                { icon: Gift, color: "#A78BFA", name: "New Income" },
              ])
            }
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Plus size={16} />
            Add Income Category
          </button>
        </div>
      </div>

      {/* Expense Categories Section */}
      <div className="px-6">
        <h1 className="text-xl font-semibold text-gray-100 mb-2">Expense Categories</h1>
        <hr className="border-t border-gray-600 mb-6" />
        <div className="space-y-2">
          {expenseCategories.map((category, index) => (
            <CategoryItem
              key={index}
              icon={category.icon}
              color={category.color}
              name={category.name}
              onEdit={() => handleEdit(category, false)}
              onDelete={() => handleDelete(category.name, false)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() =>
              setExpenseCategories([
                ...expenseCategories,
                { icon: Wallet, color: "#F87171", name: "New Expense" },
              ])
            }
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <Plus size={16} />
            Add Expense Category
          </button>
        </div>
      </div>

      <EditCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={currentCategory}
        onSave={handleSave}
      />

      <ToastContainer />
    </div>
  );
};

export default Categories;
