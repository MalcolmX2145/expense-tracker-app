import { BarChart2, CreditCard, FileText, List, Menu, PieChart, Settings, LogOut } from "lucide-react"; // Import LogOut icon
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext"; // Import useAuth
import supabase from "../supabase-client";

const NAVBAR_ITEMS = [
  { name: "Dashboard", icon: BarChart2, color: "#6366f1", href: "/dashboard" },
  { name: "Accounts", icon: CreditCard, color: "#8B5CF6", href: "/accounts" },
  { name: "Transactions", icon: List, color: "#EC4899", href: "/transactions" },
  { name: "Budgets", icon: PieChart, color: "#10B981", href: "/budgets" },
  { name: "Categories", icon: FileText, color: "#F59E0B", href: "/categories" },
  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation(); // Get the current location
  const { setUser } = useAuth(); // Use the setUser function to logout

  const handleLogout = async () => {
    // Call the Supabase logout function
    await supabase.auth.signOut();
    setUser(null); // Clear the user from context
  };

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-56" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 180 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        {/* Sidebar content */}
        <nav className="mt-8 flex-grow">
          {NAVBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div
                className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 ${
                  location.pathname === item.href ? "bg-gray-700" : ""
                }`}
              >
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Logout button */}
        <motion.div
          className="mt-4 p-4 flex items-center cursor-pointer rounded-lg transition-colors hover:bg-gray-700"
          whileHover={{ scale: 1.05 }}
          onClick={handleLogout} // Trigger logout on click
        >
          <LogOut size={20} className="text-gray-400 hover:text-red-600" />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span
                className="ml-4 whitespace-nowrap text-gray-400 group-hover:text-white"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Navbar;
