import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SearchIcon, FilterIcon } from "lucide-react";

// Team colors mapping
const teamColors = {
  "RCB": { primary: "from-red-600", secondary: "to-black", text: "text-red-600", accent: "border-red-600" },
  "CSK": { primary: "from-yellow-500", secondary: "to-yellow-600", text: "text-yellow-500", accent: "border-yellow-500" },
  "MI": { primary: "from-blue-600", secondary: "to-blue-700", text: "text-blue-600", accent: "border-blue-600" },
  "KKR": { primary: "from-purple-600", secondary: "to-purple-800", text: "text-purple-600", accent: "border-purple-600" },
  "DC": { primary: "from-blue-500", secondary: "to-red-500", text: "text-blue-500", accent: "border-blue-500" },
  "GT": { primary: "from-blue-400", secondary: "to-blue-600", text: "text-blue-400", accent: "border-blue-400" },
  "LSG": { primary: "from-teal-500", secondary: "to-blue-500", text: "text-teal-500", accent: "border-teal-500" },
  "RR": { primary: "from-pink-500", secondary: "to-pink-600", text: "text-pink-500", accent: "border-pink-500" },
  "SRH": { primary: "from-orange-500", secondary: "to-red-500", text: "text-orange-500", accent: "border-orange-500" }
};

// Star Rating Component
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-400"}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Player Profile Component
function PlayerProfile({ player }) {
  const [imageError, setImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Get team colors, default to gradient if team not found
  const teamColor = teamColors[player.team] || { 
    primary: "from-gray-600", 
    secondary: "to-gray-800", 
    text: "text-white", 
    accent: "border-gray-400" 
  };

  // Calculate player rating based on stats
  const calculateRating = () => {
    // Simple algorithm - can be refined based on role
    const baseScore = (player.average / 20) + (player.matches / 100);
    return Math.min(Math.round(baseScore), 5);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { 
      y: -10, 
      transition: { 
        duration: 0.2,
        type: "spring",
        stiffness: 300 
      } 
    }
  };
  
  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="overflow-hidden rounded-2xl shadow-xl relative group"
    >
      {/* Gradient overlay based on team colors */}
      <div className={`absolute inset-0 bg-gradient-to-br ${teamColor.primary} ${teamColor.secondary} opacity-20`}></div>

      {/* Card content */}
      <div className="relative bg-white dark:bg-gray-800 p-6">
        {/* Player image */}
        <div className="flex justify-center mb-4">
          <div className={`relative w-28 h-28 rounded-full overflow-hidden ${teamColor.accent} border-4 shadow-lg`}>
            <img
              src={imageError ? "/placeholder-player.png" : player.image}
              alt={player.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Player name */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-1">{player.name}</h2>
        
        {/* Role and team with badge */}
        <div className="flex flex-col items-center gap-2 mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">{player.role}</p>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${teamColor.primary} ${teamColor.secondary} text-white`}>
            {player.team}
          </span>
        </div>

        {/* Star rating */}
        <div className="flex justify-center mb-4">
          <StarRating rating={calculateRating()} />
        </div>

        {/* Key stats preview */}
        <div className="grid grid-cols-2 gap-2 text-center text-sm mb-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <span className="block text-xs text-gray-500 dark:text-gray-400">Matches</span>
            <span className="font-bold text-gray-800 dark:text-white">{player.matches}</span>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <span className="block text-xs text-gray-500 dark:text-gray-400">Average</span>
            <span className="font-bold text-gray-800 dark:text-white">{player.average}</span>
          </div>
        </div>

        {/* Toggle button */}
        <div className="text-center">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className={`text-xs font-medium ${teamColor.text} hover:underline focus:outline-none`}
          >
            {showDetails ? "Hide details" : "Show details"}
          </button>
        </div>

        {/* Expandable details */}
        <motion.div
          initial="hidden"
          animate={showDetails ? "visible" : "hidden"}
          variants={detailsVariants}
          className="overflow-hidden"
        >
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Runs</p>
                <p className="font-semibold text-gray-800 dark:text-white">{player.runs}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Wickets</p>
                <p className="font-semibold text-gray-800 dark:text-white">{player.wickets}</p>
              </div>
              
              {/* Additional stats could be added here */}
              <div className="col-span-2 mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Career Highlights</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {player.name === "Virat Kohli" ? "Fastest to reach 10,000 ODI runs" : 
                   player.name === "MS Dhoni" ? "Captain of 2011 World Cup winning team" :
                   "Outstanding cricket career"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Players() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const players = [
    {
      name: "Virat Kohli",
      role: "Batsman",
      team: "RCB",
      matches: 250,
      runs: 12000,
      wickets: 4,
      average: 58.2,
      image: "/Virat Kohli.webp"
    },
    {
      name: "MS Dhoni",
      role: "Wicketkeeper Batsman",
      team: "CSK",
      matches: 300,
      runs: 11000,
      wickets: 0,
      average: 45.0,
      image: "/MS DHONI.avif"
    },
    {
      name: "Rohit Sharma",
      role: "Batsman",
      team: "MI",
      matches: 280,
      runs: 9500,
      wickets: 2,
      average: 48.5,
      image: "/Rohit sharma.jpeg"
    },
    {
      name: "Jasprit Bumrah",
      role: "Bowler",
      team: "MI",
      matches: 180,
      runs: 300,
      wickets: 250,
      average: 22.3,
      image: "/Jasprit Bumrah.avif"
    },
    {
      name: "Hardik Pandya",
      role: "All-rounder",
      team: "MI",
      matches: 200,
      runs: 3500,
      wickets: 120,
      average: 35.6,
      image: "/Hardik Pandya.webp"
    },
    {
      name: "KL Rahul",
      role: "Batsman",
      team: "LSG",
      matches: 170,
      runs: 7000,
      wickets: 1,
      average: 49.1,
      image: "/KL Rahul.avif"
    },
    {
      name: "Shubman Gill",
      role: "Batsman",
      team: "GT",
      matches: 100,
      runs: 4000,
      wickets: 0,
      average: 50.2,
      image: "/Shubman gill.avif"
    },
    {
      name: "Ravindra Jadeja",
      role: "All-rounder",
      team: "CSK",
      matches: 260,
      runs: 4500,
      wickets: 180,
      average: 32.4,
      image: "/Ravindra Jadeja.avif"
    },
    {
      name: "Rishabh Pant",
      role: "Wicketkeeper Batsman",
      team: "DC",
      matches: 150,
      runs: 5000,
      wickets: 0,
      average: 42.5,
      image: "/Rishabh Pant.avif"
    },
    {
      name: "Yuzvendra Chahal",
      role: "Bowler",
      team: "RR",
      matches: 190,
      runs: 250,
      wickets: 230,
      average: 23.8,
      image: "/yuzi chahal.jpeg"
    },
    {
      name: "Mohammed Shami",
      role: "Bowler",
      team: "GT",
      matches: 170,
      runs: 150,
      wickets: 210,
      average: 24.9,
      image: "/Mohammad Shami.avif"
    },
    {
      name: "Sanju Samson",
      role: "Wicketkeeper Batsman",
      team: "RR",
      matches: 160,
      runs: 4800,
      wickets: 0,
      average: 40.3,
      image: "/Sanju-Samson.jpeg"
    },
    {
      name: "David Warner",
      role: "Batsman",
      team: "DC",
      matches: 290,
      runs: 11500,
      wickets: 1,
      average: 46.2,
      image: "/David Warner.jpg"
    },
    {
      name: "Andre Russell",
      role: "All-rounder",
      team: "KKR",
      matches: 180,
      runs: 4200,
      wickets: 160,
      average: 30.8,
      image: "/Andre Russell.webp"
    },
    {
      name: "Kane Williamson",
      role: "Batsman",
      team: "SRH",
      matches: 140,
      runs: 5500,
      wickets: 2,
      average: 47.5,
      image: "/Kane Willamson.avif"
    },
  ];

  // Get unique teams for filters
  const teams = ["All", ...new Set(players.map(player => player.team))];

  // Filter players by search term and team
  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = activeFilter === "All" || player.team === activeFilter;
    return matchesSearch && matchesTeam;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            Player Profiles
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore detailed profiles of top cricket players from around the world
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search player by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm shadow-lg"
              />
            </div>
            
            {/* Filter Button */}
            <div className="md:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="w-full md:w-auto px-5 py-3 flex items-center justify-center gap-2 bg-gray-800 bg-opacity-50 backdrop-blur-sm hover:bg-gray-700 text-white rounded-lg transition-all duration-200 border border-gray-700"
              >
                <FilterIcon className="h-5 w-5" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Filter Options */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: showFilters ? "auto" : 0,
              opacity: showFilters ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-white text-sm font-medium mb-3">Filter by Team</h3>
              <div className="flex flex-wrap gap-2">
                {teams.map(team => (
                  <button
                    key={team}
                    onClick={() => setActiveFilter(team)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                      activeFilter === team 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {team}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          className="mb-10 bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-700 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-400">{players.length}</p>
              <p className="text-gray-300 text-sm">Players</p>
            </div>
            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-purple-400">{teams.length - 1}</p>
              <p className="text-gray-300 text-sm">Teams</p>
            </div>
            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-green-400">
                {players.reduce((max, player) => Math.max(max, player.average), 0).toFixed(1)}
              </p>
              <p className="text-gray-300 text-sm">Best Average</p>
            </div>
            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-red-400">
                {players.reduce((max, player) => Math.max(max, player.wickets), 0)}
              </p>
              <p className="text-gray-300 text-sm">Top Wickets</p>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-blue-200 border-opacity-20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          /* Player Cards Grid */
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player, index) => (
                <PlayerProfile key={index} player={player} />
              ))
            ) : (
              <motion.div 
                className="text-center col-span-full bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-lg p-10 border border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4">🏏</div>
                <h3 className="text-xl font-bold text-white mb-2">No players found</h3>
                <p className="text-gray-300">
                  No players matching "{searchTerm}"{activeFilter !== "All" ? ` in team ${activeFilter}` : ''}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Players;
