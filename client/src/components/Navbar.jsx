import React from "react";
import { Link } from "react-router-dom";
import {
  FaTrophy,
  FaChartBar,
  FaCalendarAlt,
  FaNewspaper,
  FaTable,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-purple-700 py-3 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-5 text-white font-medium text-sm md:text-base mb-2 md:mb-0">
          <Link to="/live-scores" className="flex items-center gap-1 hover:text-yellow-300 transition">
            <FaTrophy /> Live Scores
          </Link>
          <Link to="/player-stats" className="flex items-center gap-1 hover:text-yellow-300 transition">
            <FaChartBar /> Player Stats
          </Link>
          <Link to="/match-schedule" className="flex items-center gap-1 hover:text-yellow-300 transition">
            <FaCalendarAlt /> Match Schedule
          </Link>
          <Link to="/news" className="flex items-center gap-1 hover:text-yellow-300 transition">
            <FaNewspaper /> News Updates
          </Link>
          <Link to="/rankings" className="flex items-center gap-1 hover:text-yellow-300 transition">
            <FaTable /> Rankings
          </Link>
        </div>

        {/* Logo */}
        <div className="text-3xl font-extrabold text-white mb-2 md:mb-0 md:mx-10 tracking-wide drop-shadow-md">
          CricXify
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4 text-white text-sm md:text-base">
          <Link to="/login" className="flex items-center gap-1 hover:text-yellow-300 transition">
            <FaSignInAlt /> Login
          </Link>
          <Link to="/register" className="flex items-center gap-1 hover:text-yellow-300 transition">
            <FaUserPlus /> Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
