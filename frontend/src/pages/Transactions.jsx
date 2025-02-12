import { useState, useEffect } from "react";
import supabase from "../supabase-client"; // Import your Supabase client
import ExpenditureTable from "../components/transactions/ExpenditureTable";
import Header from "../components/Header";
import AddTransaction from "../components/transactions/AddTransaction";
import EditTransactionModal from "../components/transactions/EditTransactionModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);

    useEffect(() => {
        fetchTransactions();

        // Set up a real-time listener for changes in the transactions table
        const subscription = supabase
            .channel("transactions")
            .on("postgres_changes", { event: "*", schema: "public", table: "transactions" }, () => {
                fetchTransactions();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const fetchTransactions = async () => {
        const { data, error } = await supabase
            .from("transactions")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching transactions:", error);
        } else {
            setTransactions(data);
        }
    };

    const addTransaction = async (newTransaction) => {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) {
            toast.error("You must be logged in to add transactions!");
            return;
        }

        // Fetch the account balance before inserting transaction
        const { data: account, error: accountError } = await supabase
            .from("accounts")
            .select("id, balance")
            .eq("id", newTransaction.account_id)
            .single();

        if (accountError) {
            toast.error("Error fetching account data!");
            console.error("Account fetch error:", accountError);
            return;
        }

        let newBalance = account.balance;

        // Adjust balance based on transaction type
        if (newTransaction.type === "Expense") {
            newBalance -= newTransaction.amount;
        } else if (newTransaction.type === "Income") {
            newBalance += newTransaction.amount;
        }

        // Update the account balance in Supabase
        const { error: updateError } = await supabase
            .from("accounts")
            .update({ balance: newBalance })
            .eq("id", newTransaction.account_id);

        if (updateError) {
            toast.error("Failed to update account balance!");
            console.error("Balance update error:", updateError);
            return;
        }

        // Insert the transaction into Supabase
        const { data, error } = await supabase
            .from("transactions")
            .insert([{ ...newTransaction, user_id: userData.user.id }])
            .select();

        if (error) {
            toast.error("Error adding transaction!");
            console.error("Transaction insert error:", error);
        } else {
            setTransactions([data[0], ...transactions]);
            toast.success("Transaction added successfully!");
        }
    };

    const deleteTransaction = async (id) => {
        const { error } = await supabase.from("transactions").delete().eq("id", id);
        if (error) {
            toast.error("Error deleting transaction!");
        } else {
            setTransactions(transactions.filter((t) => t.id !== id));
            toast.success("Transaction deleted.");
        }
    };

    const updateTransaction = (updatedTransaction) => {
        setTransactions(
            transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
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
                    onEditTransaction={setEditingTransaction}
                />
            </main>
            {editingTransaction && (
                <EditTransactionModal
                    transaction={editingTransaction}
                    onClose={() => setEditingTransaction(null)}
                    onUpdate={updateTransaction}
                />
            )}
            <ToastContainer />
        </div>
    );
};

export default Transactions;
