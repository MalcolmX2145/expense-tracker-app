import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import supabase from "../supabase-client";
import BudgetCard from "../components/budgets/BudgetCard";
import BudgetInputCard from "../components/budgets/BudgetInputCard";
import Header from "../components/Header";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
    
      if (userError || !userData?.user) {
        console.error("Error fetching user:", userError);
        toast.error("Failed to retrieve user data.");
        return;
      }
    
      const userId = userData.user.id;
    
      const { data, error } = await supabase
        .from("budgets")
        .select("id, category_id, limit_value, categories(name)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
    
      if (error) {
        console.error("Error fetching budgets:", error);
        toast.error("Failed to fetch budgets.");
        return;
      }
    
      setBudgets(data);
    };

    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("id, name");

      if (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories.");
        return;
      }

      setCategories(data);
    };

    fetchBudgets();
    fetchCategories();
  }, []);

  const checkExistingBudget = async (categoryId) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      console.error("Error fetching user:", userError);
      toast.error("Failed to retrieve user data.");
      return false;
    }

    const userId = userData.user.id;

    const { data, error } = await supabase
      .from("budgets")
      .select("id")
      .eq("user_id", userId)
      .eq("category_id", categoryId);

    if (error) {
      console.error("Error checking existing budget:", error);
      toast.error("Failed to check existing budget.");
      return false;
    }

    return data.length > 0;
  };

  const handleAddBudget = async (newBudget) => {
    const exists = await checkExistingBudget(newBudget.category_id);

    if (exists) {
      toast.warning("Budget for this category already exists.");
      return;
    }

    const { data, error } = await supabase
      .from("budgets")
      .insert([{ ...newBudget }])
      .select("*, categories(name)")
      .single();

    if (error) {
      console.error("Error adding budget:", error);
      toast.error("Failed to add budget.");
      return;
    }

    setBudgets((prev) => [...prev, data]);
    toast.success("Budget added successfully!");
  };

  const handleDeleteBudget = async (id) => {
    const { error } = await supabase.from("budgets").delete().eq("id", id);

    if (error) {
      console.error("Error deleting budget:", error);
      toast.error("Failed to delete budget.");
      return;
    }

    setBudgets((prev) => prev.filter((budget) => budget.id !== id));
    toast.success("Budget deleted successfully!");
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 flex flex-col">
      <Header title="Budgets" />
      <div className="flex flex-col space-y-6 p-6">
        <BudgetCard budgets={budgets} onDeleteBudget={handleDeleteBudget} />
        <hr className="border-t border-gray-600 my-6" />
        <BudgetInputCard 
          onSave={handleAddBudget} 
          categories={categories} 
          existingBudgets={budgets}
        />
      </div>
    </div>
  );
};

export default Budgets;