import { Wallet, PiggyBank } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/Header";
import AccountStatCard from "../components/accounts/AccountStatCard";


const Accounts = () => {
  const accounts = [
    { name: "Mpesa", icon: Wallet, value: "Ksh. 12,345", color: "#90EE90" },
    { name: "NCBA Bank", icon: Wallet, value: "Ksh. 120,345", color: "#6366F1" },
    { name: "M-Shwari", icon: PiggyBank, value: "Ksh. 20,345", color: "#ADD8E6" }
  ];

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
            
            {accounts.map((account, index) => (
              <AccountStatCard 
                key={index}
                name={account.name} 
                icon={account.icon} 
                value={account.value} 
                color={account.color} 
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Accounts;
