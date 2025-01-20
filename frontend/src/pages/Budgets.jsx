import BudgetInputCard from "../components/budgets/BugdetInputCard.jsx";
import BudgetCard from "../components/budgets/BudgetCard.jsx";
import Header from "../components/Header.jsx";

import { useState } from "react";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);

  const handleAddBudget = (newBudget) => {
    setBudgets([...budgets, newBudget]);
  };

  const handleDeleteBudget = (index) => {
    const updatedBudgets = budgets.filter((_, i) => i !== index);
    setBudgets(updatedBudgets);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 flex flex-col">
      {/* No margin or spacing for the Header */}
      <Header title="Budgets" />
      <div className="flex flex-col space-y-6 p-6">
        <BudgetCard budgets={budgets} onDeleteBudget={handleDeleteBudget} />
        {/* Visible horizontal rule */}
        <hr className="border-t border-gray-600 my-6" />
        <BudgetInputCard onSave={handleAddBudget} />
      </div>
    </div>
  );
};

export default Budgets;
