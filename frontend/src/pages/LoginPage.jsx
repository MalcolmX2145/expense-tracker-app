import { useState } from "react";
import supabase from "../supabase-client";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Reset any previous error/success messages

    // Attempt to log in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message); // Show error message if login fails
      return;
    }

    if (data) {
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to the dashboard after login
      }, 1500); // Allow time for the success message to be seen
    }

    // Clear input fields after the login attempt
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Log in
          </button>
        </form>
        {message && <p className="mt-2 text-sm text-center text-green-600">{message}</p>}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don&apos;t have an account?
          <Link to="/register" className="text-blue-600 hover:underline"> Register.</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
