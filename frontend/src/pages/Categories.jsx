import { useEffect, useState } from "react";
import Header from "../components/Header";
import CategoryItem from "../components/categories/CategoryItem.jsx";
import EditCategoryModal from "../components/categories/EditCategoryModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../supabase-client.js";
import { Plus } from "lucide-react";

const Categories = () => {
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isIncome, setIsIncome] = useState(true);

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories.");
        return;
      }

      console.log("Fetched Categories from Supabase:", data);

      // Categorize data into income and expense categories
      const income = data.filter((cat) => cat.type === "income");
      const expense = data.filter((cat) => cat.type === "expense");

      setIncomeCategories(income);
      setExpenseCategories(expense);
    };

    fetchCategories();
  }, []);

  // Open edit modal
  const handleEdit = (category, isIncomeCategory) => {
    setCurrentCategory(category);
    setIsIncome(isIncomeCategory);
    setIsModalOpen(true);
  };

  // Delete category
  const handleDelete = async (id, isIncomeCategory) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete category");
      return;
    }

    if (isIncomeCategory) {
      setIncomeCategories((prev) => prev.filter((cat) => cat.id !== id));
    } else {
      setExpenseCategories((prev) => prev.filter((cat) => cat.id !== id));
    }

    toast.success("Category deleted successfully!");
  };

  // Save category (create/update)
  const handleSave = async (updatedCategory) => {
    const updatedData = {
      name: updatedCategory.name.trim(),
      icon: updatedCategory.icon || "Gift", // Store icon as string
      color: updatedCategory.color || "#FFFFFF",
      type: isIncome ? "income" : "expense",
    };

    if (!updatedData.name) {
      toast.error("Category name cannot be empty!");
      return;
    }

    if (currentCategory) {
      // Update existing category
      const { data, error } = await supabase
        .from("categories")
        .update(updatedData)
        .eq("id", currentCategory.id)
        .select()
        .single();

      if (error) {
        console.error("Supabase Update Error:", error);
        toast.error("Failed to update category");
        return;
      }

      // Update state
      if (isIncome) {
        setIncomeCategories((prev) =>
          prev.map((cat) => (cat.id === data.id ? data : cat))
        );
      } else {
        setExpenseCategories((prev) =>
          prev.map((cat) => (cat.id === data.id ? data : cat))
        );
      }

      toast.success(`Category updated to "${updatedCategory.name}"`);
    } else {
      // Insert new category
      const { data, error } = await supabase
        .from("categories")
        .insert([updatedData])
        .select()
        .single();

      if (error) {
        console.error("Supabase Insert Error:", error);
        toast.error("Failed to add category");
        return;
      }

      // Add new category
      if (isIncome) {
        setIncomeCategories((prev) => [...prev, data]);
      } else {
        setExpenseCategories((prev) => [...prev, data]);
      }

      toast.success(`Category "${updatedCategory.name}" added!`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 flex flex-col space-y-6">
      <Header title="Categories" />

      {/* Income Categories Section */}
      <div className="px-6">
        <h1 className="text-xl font-semibold text-gray-100 mb-2">Income Categories</h1>
        <hr className="border-t border-gray-600 mb-6" />
        <div className="space-y-2">
          {incomeCategories.map((category) => (
            <CategoryItem
              key={category.id}
              icon={category.icon} // Pass icon name as string
              color={category.color}
              name={category.name}
              onEdit={() => handleEdit(category, true)}
              onDelete={() => handleDelete(category.id, true)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => {
              setCurrentCategory(null);
              setIsIncome(true);
              setIsModalOpen(true);
            }}
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
          {expenseCategories.map((category) => (
            <CategoryItem
              key={category.id}
              icon={category.icon} // Pass icon name as string
              color={category.color}
              name={category.name}
              onEdit={() => handleEdit(category, false)}
              onDelete={() => handleDelete(category.id, false)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => {
              setCurrentCategory(null);
              setIsIncome(false);
              setIsModalOpen(true);
            }}
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
