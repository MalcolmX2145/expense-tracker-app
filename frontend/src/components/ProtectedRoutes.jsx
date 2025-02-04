import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Import the custom hook for AuthContext

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get the user from context

  // If the user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the child components
  return children;
};

export default ProtectedRoute;
