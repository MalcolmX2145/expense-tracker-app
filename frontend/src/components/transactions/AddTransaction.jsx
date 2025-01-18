import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTransaction = ({ onAddTransaction }) => {
    const [category, setCategory] = useState("");
    const [type, setType] = useState("Income");
    const [price, setPrice] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!category || !price || isNaN(price)) {
            toast.error("Please provide valid category and price!");
            return;
        }

        const newTransaction = {
            id: Date.now(),
            category,
            type,
            price: parseFloat(price),
        };

        onAddTransaction(newTransaction);
        toast.success("Transaction added successfully!");

        setCategory("");
        setType("Income");
        setPrice("");
    };

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
                Add New Transaction
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-400 mb-1">Category</label>
                    <input
                        type="text"
                        placeholder="Category (e.g., Electronics)"
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-1">Type</label>
                    <select
                        className="bg-gray-700 text-white rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                        <option value="Transfer">Transfer</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-400 mb-1">Amount</label>
                    <input
                        type="number"
                        placeholder="Amount (e.g., 59.99)"
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <PlusCircle size={18} className="mr-2" />
                    Add Transaction
                </button>
            </form>
        </motion.div>
    );
};

export default AddTransaction;
