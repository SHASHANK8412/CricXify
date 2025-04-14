// src/components/LiveScores.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const LiveScores = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveScores = async () => {
      try {
        const response = await axios.get(
          "https://api.cricapi.com/v1/cricScore?apikey=2bb2745d-491d-4306-a67b-4f442aafba67"
        );
        setMatches(response.data.data || []);
        console.log("API Response:", response.data);
      } catch (err) {
        console.error("Error fetching live scores:", err);
        setError("Error fetching live scores");
        setMatches([]); // Initialize to empty array in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchLiveScores();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading live scores...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!matches || matches.length === 0) return <p className="text-center text-gray-600">No live matches available at the moment.</p>;

  return (
    <section id="live-scores" className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-purple-700 mb-8 text-center">Live Cricket Scores</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        {matches.map((match, index) => (
          <div key={index} className="bg-white border-l-4 border-purple-600 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold text-purple-800">
              🏏 {match.t1 || 'Team 1'} vs {match.t2 || 'Team 2'}
            </h3>
            <p className="text-sm text-gray-600 mb-1">{match.series || match.matchType || 'Match Info Unavailable'}</p>
            <span className="inline-block px-3 py-1 mt-2 bg-purple-100 text-purple-800 text-sm rounded-full">
              {match.status || 'Status Unavailable'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveScores;
