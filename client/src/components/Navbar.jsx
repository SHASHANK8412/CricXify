import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTrophy, FaChartBar, FaCalendarAlt, FaNewspaper,
  FaMapMarkerAlt, FaUsers, FaSignInAlt, FaUserPlus,
  FaBaseballBall, FaBars, FaTimes, FaRobot, FaChartArea,
  FaUser, FaSignOutAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const navLinks = [
    { to: "/live-scores", icon: <FaTrophy />, text: "Live Scores" },
    { to: "/player-stats", icon: <FaChartBar />, text: "Players" },
    { to: "/upcoming-series", icon: <FaNewspaper />, text: "Upcoming Series" },
    { to: "/venue", icon: <FaMapMarkerAlt />, text: "Venue" },
    { to: "/teams", icon: <FaUsers />, text: "Teams" },
    { to: "/pitch-analysis", icon: <FaChartArea />, text: "Pitch Analysis" },
    { to: "/ask-gemini", icon: <FaRobot />, text: "Ask Gemini" },
  ];

  const navVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const menuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-purple-700/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      {/* User email display at the very top */}
      {user && (
        <div className="w-full bg-indigo-800/90 py-1 px-4 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex justify-end items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 text-yellow-200 text-sm font-medium"
            >
              <FaUser className="text-yellow-300" />
              <span>Welcome, {user.email}</span>
            </motion.div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaBaseballBall className="text-2xl text-white group-hover:text-yellow-300 transition-colors" />
            </motion.div>
            <span className="text-white font-bold text-xl group-hover:text-yellow-300 transition-colors">CricXify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-1 text-white relative group transition-colors duration-300 ${
                  location.pathname === link.to ? 'text-yellow-300' : 'hover:text-yellow-200'
                }`}
              >
                <motion.span 
                  className="text-lg"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {link.icon}
                </motion.span>
                <span className="font-medium">{link.text}</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300"
                  initial={false}
                  animate={location.pathname === link.to ? { width: "100%" } : { width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-4 py-2 text-white hover:text-yellow-300 transition-colors"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <span className="flex items-center space-x-1 px-4 py-2 text-white">
                    <FaUser />
                    <span>{user.name}</span>
                  </span>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/login"
                    className="flex items-center space-x-1 px-4 py-2 text-white hover:text-yellow-300 transition-colors"
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/register"
                    className="flex items-center space-x-1 px-4 py-2 bg-yellow-400 text-purple-900 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-yellow-400/50"
                  >
                    <FaUserPlus />
                    <span>Sign Up</span>
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-4 pb-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.to}
                      className={`flex items-center space-x-2 text-white p-2 rounded-lg ${
                        location.pathname === link.to 
                          ? 'bg-purple-600/50 backdrop-blur-sm' 
                          : 'hover:bg-purple-600/30'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{link.icon}</span>
                      <span>{link.text}</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="pt-4 border-t border-purple-600/30 flex flex-col space-y-2"
                >
                  {user ? (
                    <>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 text-white p-2 hover:bg-purple-600/30 rounded-lg"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                      <span className="flex items-center space-x-2 text-white p-2">
                        <FaUser />
                        <span>{user.name}</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center space-x-2 text-white p-2 hover:bg-purple-600/30 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaSignInAlt />
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center space-x-2 bg-yellow-400 text-purple-900 p-2 rounded-lg hover:bg-yellow-300 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaUserPlus />
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

