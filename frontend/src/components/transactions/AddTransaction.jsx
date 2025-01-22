import { useState } from "react";

const AddTransaction = ({ onAddTransaction }) => {
    const incomeCategories = ["Gifts", "Salary", "Other Income"];
    const expenseCategories = ["Rent", "Entertainment", "Utilities"];

    const [formData, setFormData] = useState({
        category: "",
        type: "Income",
        amount: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Reset category when type changes
        if (name === "type") {
            setFormData({ ...formData, type: value, category: "" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form data
        if (!formData.category || !formData.amount || isNaN(formData.amount)) {
            alert("Please fill out all fields with valid data.");
            return;
        }

        // Call the parent's function
        onAddTransaction({
            category: formData.category,
            type: formData.type,
            amount: parseFloat(formData.amount),
        });

        // Clear the form
        setFormData({ category: "", type: "Income", amount: "" });
    };

    const renderCategoryField = () => {
        if (formData.type === "Income") {
            return (
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
                >
                    <option value="">Select a category</option>
                    {incomeCategories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            );
        } else if (formData.type === "Expense") {
            return (
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
                >
                    <option value="">Select a category</option>
                    {expenseCategories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            );
        }

        // Default input for other types
        return (
            <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-md"
            />
        );
    };

    return (
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
                {renderCategoryField()}
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
    );
};

export default AddTransaction;
