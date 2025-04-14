import React, { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          "https://api.cricapi.com/v1/cricScore?apikey=2bb2745d-491d-4306-a67b-4f442aafba67"
        );
        setMatches(response.data.data || []);
      } catch (err) {
        console.error("Error fetching match data:", err);
        setError("Failed to fetch match data.");
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 font-sans">
      {/* Heading */}
      <header className="py-6 text-center bg-white shadow-md">
        <h1 className="text-5xl font-extrabold text-purple-700">CricXify</h1>
      </header>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-purple-700 mb-8 text-center animate-fade-in-up">
          Latest Cricket News & Articles
        </h2>
        {loading ? (
          <p className="text-center text-gray-700 text-lg">Loading news...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : matches && matches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {matches.map((match, index) => (
              <div
                key={index}
                className="bg-white border-l-4 border-purple-600 p-5 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-purple-800 flex items-center mb-2">
                  🏏 {match.t1} vs {match.t2}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {match.series || match.matchType}
                </p>
                <span className="inline-block px-3 py-1 mt-2 bg-purple-100 text-purple-800 text-sm rounded-full">
                  {match.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 text-lg">
            No matches available at the moment.
          </p>
        )}
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white pt-10 pb-5 mt-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          {/* CricXify Logo */}
          <div>
            <h2 className="text-xl font-bold mb-4">CricXify</h2>
            <p className="text-gray-400">
              &copy; 2025 CricXify Inc. All rights reserved.
            </p>
          </div>

          {/* Mobile & Apps */}
          <div>
            <h3 className="text-white font-semibold mb-2">MOBILE SITE & APPS</h3>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#">m.cricxify.com</a></li>
              <li><a href="#">Android</a></li>
              <li><a href="#">iOS</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-2">FOLLOW US ON</h3>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-white font-semibold mb-2">COMPANY</h3>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#">Careers</a></li>
              <li><a href="#">Advertise</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
          This site is best viewed in modern browsers. Content may be subject to copyright.
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
