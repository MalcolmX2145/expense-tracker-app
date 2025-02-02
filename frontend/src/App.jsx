import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar.jsx";

// Pages
import Dashboard from "./pages/Dashboard.jsx";
import Accounts from "./pages/Accounts.jsx";
import Transactions from "./pages/Transactions.jsx";
import Budgets from "./pages/Budgets.jsx";
import Categories from "./pages/Categories.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={`flex h-screen ${isAuthPage ? "bg-gray-100" : "bg-gray-900 text-gray-100 overflow-hidden"}`}>
      {!isAuthPage && (
        <>
          {/* Background (Removed for Login & Register Pages) */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          </div>

          <Navbar />
        </>
      )}

      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
