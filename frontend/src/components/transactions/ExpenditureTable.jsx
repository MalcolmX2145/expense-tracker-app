import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import supabase from "../../supabase-client"; // Import Supabase client

const ExpenditureTable = ({ onDeleteTransaction, onEditTransaction }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [categories, setCategories] = useState({});
    const [user, setUser] = useState(null);

    // Fetch user on mount
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                fetchTransactions(user.id);
                fetchCategories();
            }
        };
        fetchUser();
    }, []);

    // Fetch transactions for the logged-in user
    const fetchTransactions = async (userId) => {
        const { data, error } = await supabase
            .from("transactions")
            .select("*")
            .eq("user_id", userId);

        if (error) {
            console.error("Error fetching transactions:", error);
        } else {
            setTransactions(data);
            setFilteredTransactions(data);
        }
    };

    // Fetch categories and map them by ID
    const fetchCategories = async () => {
        const { data, error } = await supabase.from("categories").select("id, name");
        if (error) {
            console.error("Error fetching categories:", error);
            return;
        }
        const categoryMap = {};
        data.forEach((category) => {
            categoryMap[category.id] = category.name;
        });
        setCategories(categoryMap);
    };

    // Handle search input
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = transactions.filter(
            (transaction) =>
                (categories[transaction.category_id]?.toLowerCase() || "").includes(term) ||
                transaction.type.toLowerCase().includes(term)
        );
        setFilteredTransactions(filtered);
    };

    // Get color for transaction type
    const getTypeColor = (type) => {
        switch (type) {
            case "Income":
                return "text-green-400";
            case "Expense":
                return "text-red-400";
            case "Transfer":
                return "text-blue-400";
            default:
                return "text-gray-300";
        }
    };

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">Transaction List</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {filteredTransactions.map((transaction) => (
                            <motion.tr
                                key={transaction.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {categories[transaction.category_id] || "Unknown"}
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getTypeColor(transaction.type)}`}>
                                    {transaction.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    Ksh. {transaction.amount.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <button
                                        className="text-indigo-400 hover:text-indigo-300 mr-2"
                                        onClick={() => onEditTransaction(transaction)}
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        className="text-red-400 hover:text-red-300"
                                        onClick={() => onDeleteTransaction(transaction.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default ExpenditureTable;
