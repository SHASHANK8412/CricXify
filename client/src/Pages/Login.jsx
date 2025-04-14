import { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios"; // Import Axios for API calls
//import './Login.css';
//import './SocialIcons.css';

// API base URL - keep this consistent
const API_BASE_URL = "http://localhost:5174";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);

    try {
      console.log("Attempting login to:", `${API_BASE_URL}/api/login`);
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password,
        rememberMe,
      });

      setLoading(false);

      if (response.data.success) {
        alert("Login Successful! 🎉");
        localStorage.setItem("token", response.data.token); // Store JWT token

        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        } else {
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
        }
        // Redirect to homepage or dashboard
        window.location.href = "/";
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Login Error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Login failed: ${error.response.data.message || "Something went wrong"}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("Server not responding. Please try again later.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/facebook`;
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
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-4 border border-gray-300 rounded-lg mt-1 text-lg focus:outline-none focus:ring-4 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold">Password</label>
            <input
              type="password"
              className="w-full p-4 border border-gray-300 rounded-lg mt-1 text-lg focus:outline-none focus:ring-4 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              className="mr-2 w-5 h-5"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="text-gray-700 text-lg">Remember Me</label>
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
              "Login"
            )}
          </button>

          <p className="mt-5 text-center text-gray-600 text-lg">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-500 font-semibold hover:underline">
              Create an Account
            </Link>
            <br />
            <Link to="/forgot-password" className="text-indigo-500 font-semibold hover:underline">
              Forgot Password?
            </Link>
            <br />
            <Link to="/" className="text-indigo-500 font-semibold hover:underline">
              Return to Homepage
            </Link>
          </p>
        </form>

        <div className="flex justify-center gap-8 mt-6">
          <FaGoogle
            onClick={handleGoogleLogin}
            className="text-red-500 text-[40px] cursor-pointer hover:scale-125 transition-transform"
          />
          <FaFacebook
            onClick={handleFacebookLogin}
            className="text-blue-800 text-[40px] cursor-pointer hover:scale-125 transition-transform"
          />
          <FaTwitter className="text-blue-400 text-[40px] cursor-pointer hover:scale-125 transition-transform" />
          <FaInstagram className="text-pink-500 text-[40px] cursor-pointer hover:scale-125 transition-transform" />
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
