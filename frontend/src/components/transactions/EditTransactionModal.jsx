import { useState, useEffect } from "react";
import supabase from "../../supabase-client";
import { toast } from "react-toastify";

const EditTransactionModal = ({ transaction, onClose, onUpdate }) => {
    const [amount, setAmount] = useState(transaction.amount);
    const [type, setType] = useState(transaction.type);
    const [categoryId, setCategoryId] = useState(transaction.category_id);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase.from("categories").select("id, name");
            if (error) {
                console.error("Error fetching categories:", error);
            } else {
                setCategories(data);
            }
        };
        fetchCategories();
    }, []);

    const handleUpdate = async () => {
        const { error } = await supabase
            .from("transactions")
            .update({ amount, type, category_id: categoryId })
            .eq("id", transaction.id);

        if (error) {
            toast.error("Error updating transaction!");
        } else {
            toast.success("Transaction updated!");
            onUpdate({ ...transaction, amount, type, category_id: categoryId });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold text-white mb-4">Edit Transaction</h2>
                <label className="block text-gray-300">Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    className="w-full p-2 rounded bg-gray-700 text-white mb-3"
                />

                <label className="block text-gray-300">Type:</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white mb-3"
                >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                    <option value="Transfer">Transfer</option>
                </select>

                <label className="block text-gray-300">Category:</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white mb-3"
                >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end mt-4">
                    <button className="bg-red-500 px-4 py-2 rounded text-white mr-2" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 px-4 py-2 rounded text-white" onClick={handleUpdate}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTransactionModal;
