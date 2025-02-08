import { useEffect, useState } from "react";
import { Wallet, PiggyBank, PlusCircle, DollarSign, Home, Briefcase, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import AccountStatCard from "../components/accounts/AccountStatCard";
import EditAccountModal from "../components/accounts/EditAccountModal";
import supabase from "../supabase-client";

// Mapping of icon names to actual components
const iconMap = { Wallet, PiggyBank, DollarSign, Home, Briefcase, ShoppingBag };

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) fetchAccounts(user.id);
    };
    fetchUser();
  }, []);

  // Fetch accounts for the logged-in user
  const fetchAccounts = async (userId) => {
    const { data, error } = await supabase.from("accounts").select("*").eq("user_id", userId);

    if (error) {
      console.error("Error fetching accounts:", error);
    } else {
      console.log("Fetched accounts from Supabase:", data);
      setAccounts(
        data.map((acc) => ({
          ...acc,
          icon: iconMap[acc.icon] || Wallet, // Convert stored icon name to component
        }))
      );
    }
  };

  // Add a new account
  const addAccount = async () => {
    if (!user) return;

    const newAccount = {
      user_id: user.id,
      name: `New Account ${accounts.length + 1}`,
      icon: "Wallet", // Save icon as a string
      balance: 0,
    };

    const { data, error } = await supabase.from("accounts").insert([newAccount]).select().single();

    if (error) {
      console.error("Error adding account:", error);
    } else {
      setAccounts([...accounts, { ...data, icon: Wallet }]); // Convert to component
    }
  };

  // Delete an account
  const deleteAccount = async (id) => {
    const { error } = await supabase.from("accounts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting account:", error);
    } else {
      setAccounts(accounts.filter((account) => account.id !== id));
    }
  };

  // Edit an account
  const editAccount = (account) => {
    console.log("Editing account:", account);
    setCurrentAccount(account);
    setIsEditing(true);
  };

  // Save updated account details
  const saveEditedAccount = async (updatedAccount) => {
    console.log("Updating account in Supabase:", updatedAccount);
  
    const { data, error } = await supabase
      .from("accounts")
      .update({
        name: updatedAccount.name,
        balance: updatedAccount.balance,
        icon: updatedAccount.icon, // Save as string (e.g., "PiggyBank")
      })
      .eq("id", updatedAccount.id)
      .select()
      .single();
  
    if (error) {
      console.error("Error updating account:", error);
    } else {
      console.log("Account successfully updated in Supabase:", data);
  
      setAccounts((prevAccounts) =>
        prevAccounts.map((acc) =>
          acc.id === data.id ? { ...data } : acc
        )
      );
  
      setIsEditing(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 flex flex-col">
      <Header title="Accounts" />

      <motion.div
        className="flex w-full mt-12 justify-center items-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full flex flex-col items-center">
          <div className="grid grid-cols-1 gap-5 w-full max-w-4xl">
            {accounts.map((account) => (
              <AccountStatCard
                key={account.id}
                account={account}
                onEdit={() => editAccount(account)}
                onDelete={() => deleteAccount(account.id)}
              />
            ))}
          </div>
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition w-1/2 mx-auto"
            onClick={addAccount}
          >
            <PlusCircle size={20} /> Add Account
          </button>
        </div>
      </motion.div>

      {isEditing && (
        <EditAccountModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          account={currentAccount}
          onSave={saveEditedAccount}
        />
      )}
    </div>
  );
};

export default Accounts;
