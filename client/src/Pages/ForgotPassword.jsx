import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateInput = () => {
    if (!email) {
      setMessage("Please enter your email address.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInput()) {
      return;
    }
    
    setLoading(true);
    setMessage("");
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:5174/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSuccess(true);
        setMessage("Password reset instructions have been sent to your email address.");
      } else {
        setIsSuccess(false);
        setMessage(data.message || "Failed to process your request. Please try again.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setIsSuccess(false);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <h2 className="text-6xl font-extrabold text-white mt-8 drop-shadow-lg">CricXify</h2>
      
      <motion.div
        className="bg-white p-12 rounded-3xl shadow-2xl w-[500px] mt-12 border-4 border-indigo-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-center mb-6 text-indigo-700">Forgot Your Password?</h3>
        <p className="text-gray-600 mb-6 text-center">
          Enter your email address below and we'll send you instructions to reset your password.
        </p>
        
        {message && (
          <div className={`p-4 mb-6 rounded-lg ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold">Email Address</label>
            <input
              type="email"
              className="w-full p-4 border border-gray-300 rounded-lg mt-1 text-lg focus:outline-none focus:ring-4 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-4 rounded-lg text-xl font-semibold mt-4 hover:bg-indigo-600 transition-transform hover:scale-105"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            ) : (
              "Send Reset Instructions"
            )}
          </button>
          
          <p className="mt-6 text-center text-gray-600 text-lg">
            <Link to="/login" className="text-indigo-500 font-semibold hover:underline">
              Back to Login
            </Link>
            <br />
            <Link to="/" className="text-indigo-500 font-semibold hover:underline">
              Return to Homepage
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
} 