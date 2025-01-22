import { useState } from "react";
import ExpenditureTable from "../components/transactions/ExpenditureTable";
import Header from "../components/Header";
import AddTransaction from "../components/transactions/AddTransaction";
import { ToastContainer, toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toast notifications

const Transactions = () => {
    const [transactions, setTransactions] = useState([
        { id: 1, category: "Electronics", type: "Income", amount: 59.99 },
        { id: 2, category: "Home", type: "Expense", amount: 79.99 },
        { id: 3, category: "Savings", type: "Transfer", amount: 1000.0 },
    ]);

    // Add a new transaction
    const addTransaction = (newTransaction) => {
        setTransactions((prevTransactions) => [
            { ...newTransaction, id: Date.now() }, // Add a unique ID
            ...prevTransactions,
        ]);
        toast.success("Transaction added successfully!"); // Show success notification
    };

    // Delete a transaction by ID
    const deleteTransaction = (id) => {
        setTransactions((prevTransactions) =>
            prevTransactions.filter((transaction) => transaction.id !== id)
        );
        toast.error("Transaction deleted."); // Show error notification (or success if you prefer)
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Transactions" />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* Add Transaction Form */}
                <AddTransaction onAddTransaction={addTransaction} />
                <hr className="border-t border-gray-600 my-6" />

                {/* Expenditure Table */}
                <ExpenditureTable
                    transactions={transactions}
                    onDeleteTransaction={deleteTransaction}
                />
            </main>
            <ToastContainer /> {/* This renders the Toast notifications */}
        </div>
    );
};

export default Transactions;
