import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../../supabase-client"; // Ensure this path is correct

// Create the AuthContext
export const AuthContext = createContext(null);

// AuthProvider component that wraps your application and provides the context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Fetch user from Supabase when app loads
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    // Listen for authentication state changes (login, logout, etc.)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null); // Set the user if session exists, otherwise set to null
      }
    );

    return () => {
      // Cleanup listener on component unmount
      authListener.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
