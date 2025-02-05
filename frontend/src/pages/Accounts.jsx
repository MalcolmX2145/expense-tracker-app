import { Wallet, PiggyBank, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Header from "../components/Header";
import AccountStatCard from "../components/accounts/AccountStatCard";
import EditAccountModal from "../components/accounts/EditAccountModal";

const Accounts = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Mpesa", icon: Wallet, value: "Ksh. 12,345", color: "#90EE90" },
    { id: 2, name: "NCBA Bank", icon: Wallet, value: "Ksh. 120,345", color: "#6366F1" },
    { id: 3, name: "M-Shwari", icon: PiggyBank, value: "Ksh. 20,345", color: "#ADD8E6" }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  const addAccount = () => {
    const newAccount = {
      id: accounts.length + 1,
      name: `New Account ${accounts.length + 1}`,
      icon: Wallet,
      value: "Ksh. 0",
      color: "#FFA500"
    };
    setAccounts([...accounts, newAccount]);
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const editAccount = (account) => {
    setCurrentAccount(account);
    setIsEditing(true);
  };

  const saveEditedAccount = (updatedAccount) => {
    setAccounts(accounts.map(acc => (acc.id === updatedAccount.id ? updatedAccount : acc)));
    setIsEditing(false);
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
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
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
