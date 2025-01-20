import { useState } from "react";
import ExpenditureTable from "../components/transactions/ExpenditureTable";
import Header from "../components/Header";
import AddTransaction from "../components/transactions/AddTransaction";
import { ToastContainer } from "react-toastify";

const Transactions = () => {
    const [transactions, setTransactions] = useState([
        { id: 1, category: "Electronics", type: "Income", price: 59.99 },
        { id: 2, category: "Home", type: "Expense", price: 79.99 },
        { id: 3, category: "Savings", type: "Transfer", price: 1000.0 },
    ]);

    const addTransaction = (newTransaction) => {
        setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
    };

    const deleteTransaction = (id) => {
        setTransactions((prevTransactions) =>
            prevTransactions.filter((transaction) => transaction.id !== id)
        );
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Transactions" />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <AddTransaction onAddTransaction={addTransaction} />
                <hr className="border-t border-gray-600 my-6" />
                <ExpenditureTable
                    transactions={transactions}
                    onDeleteTransaction={deleteTransaction}
                />
            </main>
            <ToastContainer />
        </div>
    );
};

export default Transactions;
