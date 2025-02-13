import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import supabase from "../../supabase-client"; // Adjust the import path as needed

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const ExpenditureChart = () => {
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: transactions, error } = await supabase
                .from("transactions")
                .select("category_id, amount, type")
                .eq("user_id", user.id)
                .eq("type", "Expense");

            if (error) {
                console.error("Error fetching transactions:", error);
                return;
            }

            const { data: categories, error: categoryError } = await supabase
                .from("categories")
                .select("id, name")
                .eq("user_id", user.id);

            if (categoryError) {
                console.error("Error fetching categories:", categoryError);
                return;
            }

            const categoryMap = {};
            categories.forEach(({ id, name }) => {
                categoryMap[id] = name;
            });

            const groupedExpenses = {};
            transactions.forEach(({ category_id, amount }) => {
                const categoryName = categoryMap[category_id] || "Unknown";
                groupedExpenses[categoryName] = (groupedExpenses[categoryName] || 0) + amount;
            });

            const formattedData = Object.entries(groupedExpenses).map(([name, value]) => ({ name, value }));
            setCategoryData(formattedData);
        };

        fetchExpenses();
    }, []);

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h2 className='text-lg font-medium mb-4 text-gray-100'>Expenditure Distribution</h2>
            <div className='h-64'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <hr className='my-4 border-2 border-gray-400' />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default ExpenditureChart;
