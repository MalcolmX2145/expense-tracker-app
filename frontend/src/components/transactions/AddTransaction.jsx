import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../supabase-client";

const AddTransaction = ({ onAddTransaction }) => {
    const [categories, setCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [formData, setFormData] = useState({
        category: "",
        account: "",
        type: "Income",
        amount: "",
    });

    // Fetch categories and accounts from Supabase
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: categoriesData, error: categoriesError } = await supabase
                    .from("categories")
                    .select("id, name, type");

                if (categoriesError) throw categoriesError;
                setCategories(categoriesData || []);

                const { data: accountsData, error: accountsError } = await supabase
                    .from("accounts")
                    .select("id, name");

                if (accountsError) throw accountsError;
                setAccounts(accountsData || []);
            } catch (error) {
                toast.error("Error fetching data: " + error.message);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
            ...(name === "type" ? { category: "" } : {}), // Reset category when type changes
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.category || !formData.amount || isNaN(formData.amount) || !formData.account) {
            toast.error("Please fill out all fields with valid data.");
            return;
        }
    
        try {
            const { data, error } = await supabase
                .from("transactions")
                .insert([
                    {
                        category_id: formData.category, // Ensure sending UUID
                        account_id: formData.account,  // Ensure sending UUID
                        type: formData.type,
                        amount: parseFloat(formData.amount),
                    },
                ]);
    
            if (error) {
                throw error; // If there's an error, it will go to the catch block
            }
    
            toast.success("Transaction added successfully!");
            setFormData({ category: "", account: "", type: "Income", amount: "" });
    
            // Refresh transactions list
            if (onAddTransaction) {
                onAddTransaction();
            }
        } catch (error) {
            toast.error(`Error adding transaction: ${error.message}`);
            console.error("Supabase Error:", error);
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-300">
                        Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
                    >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                        <option value="Transfer">Transfer</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
                    >
                        <option value="">Select a category</option>
                        {categories
                            .filter(cat => cat.type.toLowerCase() === formData.type.toLowerCase())
                            .map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="account" className="block text-sm font-medium text-gray-300">
                        Account
                    </label>
                    <select
                        id="account"
                        name="account"
                        value={formData.account}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
                    >
                        <option value="">Select an account</option>
                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Add Transaction
                </button>
            </form>

            {/* Toast container for notifications */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AddTransaction;
