import Header from "../components/Header";
import CategoryItem from "../components/categories/CategoryItem.jsx";

import { Gift, Wallet, DollarSign } from "lucide-react";

const Categories = () => {
  const incomeCategories = [
    { icon: Gift, color: "#34D399", name: "Gifts" },
    { icon: Wallet, color: "#3B82F6", name: "Salary" },
    { icon: DollarSign, color: "#F59E0B", name: "Other Income" },
  ];

  const expenseCategories = [
    { icon: Wallet, color: "#EF4444", name: "Rent" },
    { icon: Gift, color: "#6B7280", name: "Entertainment" },
    { icon: DollarSign, color: "#10B981", name: "Utilities" },
  ];

  return (
    <div className="flex-1 overflow-auto relative z-10 flex flex-col space-y-6">
      <Header title="Categories" />

      {/* Income Categories Section */}
      <div className="px-6">
        <h1 className="text-xl font-semibold text-gray-100 mb-2">Income Categories</h1>
        <hr className="border-t border-gray-600 mb-6" />
        <div className="space-y-2"> {/* Adds spacing between items */}
          {incomeCategories.map((category, index) => (
            <CategoryItem
              key={index}
              icon={category.icon}
              color={category.color}
              name={category.name}
            />
          ))}
        </div>
      </div>

      {/* Expense Categories Section */}
      <div className="px-6">
        <h1 className="text-xl font-semibold text-gray-100 mb-2">Expense Categories</h1>
        <hr className="border-t border-gray-600 mb-6" />
        <div className="space-y-2"> {/* Adds spacing between items */}
          {expenseCategories.map((category, index) => (
            <CategoryItem
              key={index}
              icon={category.icon}
              color={category.color}
              name={category.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
