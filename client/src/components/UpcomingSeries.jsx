// src/components/UpcomingSeries.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Trophy, Flag, Info, Loader, AlertCircle } from "lucide-react";

// Series types with their respective colors and icons
const seriesTypes = {
  "Test": { color: "bg-red-600", icon: <Trophy className="w-5 h-5" /> },
  "ODI": { color: "bg-blue-600", icon: <Trophy className="w-5 h-5" /> },
  "T20": { color: "bg-green-600", icon: <Trophy className="w-5 h-5" /> },
  "IPL": { color: "bg-indigo-600", icon: <Trophy className="w-5 h-5" /> },
  "World Cup": { color: "bg-yellow-600", icon: <Trophy className="w-5 h-5 text-yellow-300" /> },
  "International": { color: "bg-purple-600", icon: <Flag className="w-5 h-5" /> },
  "Domestic": { color: "bg-teal-600", icon: <Flag className="w-5 h-5" /> },
  "League": { color: "bg-pink-600", icon: <Trophy className="w-5 h-5" /> },
  "default": { color: "bg-gray-600", icon: <Trophy className="w-5 h-5" /> }
};

// Get series category based on name
const getSeriesCategory = (name) => {
  if (!name) return "default";
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes("test") || lowerName.includes("championship")) return "Test";
  if (lowerName.includes("odi") || lowerName.includes("one day")) return "ODI";
  if (lowerName.includes("t20") || lowerName.includes("twenty20")) return "T20"; 
  if (lowerName.includes("ipl") || lowerName.includes("premier league")) return "IPL";
  if (lowerName.includes("world cup") || lowerName.includes("trophy")) return "World Cup";
  if (lowerName.includes("international")) return "International";
  if (lowerName.includes("domestic") || lowerName.includes("cup")) return "Domestic";
  if (lowerName.includes("league") || lowerName.includes("bbl") || lowerName.includes("psl")) return "League";
  
  return "default";
};

// Format date string to a more readable format
const formatDate = (dateString) => {
  if (!dateString) return "TBD";
  try {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  } catch (e) {
    return dateString;
  }
};

// Calculate days remaining
const getDaysRemaining = (startDate) => {
  if (!startDate) return null;
  try {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = start - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (e) {
    return null;
  }
};

// Series Card Component
const SeriesCard = ({ series }) => {
  const category = getSeriesCategory(series.name);
  const { color, icon } = seriesTypes[category];
  const daysRemaining = getDaysRemaining(series.startDate);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
    >
      {/* Card Header */}
      <div className={`${color} px-4 py-3 flex justify-between items-center`}>
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-white font-semibold">
            {category}
          </span>
        </div>
        {daysRemaining !== null && daysRemaining > 0 && (
          <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded-full font-bold">
            {daysRemaining} days
          </span>
        )}
        {daysRemaining !== null && daysRemaining <= 0 && (
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold">
            In Progress
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 line-clamp-2 h-14">
          {series.name}
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Calendar className="w-4 h-4 mr-2" />
            <div>
              <span className="font-medium">Start: </span>
              <span>{formatDate(series.startDate)}</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Clock className="w-4 h-4 mr-2" />
            <div>
              <span className="font-medium">End: </span>
              <span>{formatDate(series.endDate)}</span>
            </div>
          </div>
          
          {series.matches && (
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Info className="w-4 h-4 mr-2" />
              <span><span className="font-medium">{series.matches}</span> matches</span>
            </div>
          )}
        </div>
        
        {/* View Details Button */}
        <div className="mt-5">
          <button 
            className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 rounded-lg transition-all duration-200 font-medium text-sm flex justify-center items-center"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Filter Component
const SeriesFilter = ({ activeFilter, onFilterChange }) => {
  const filters = ["All", "Test", "ODI", "T20", "World Cup", "League"];
  
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeFilter === filter 
              ? 'bg-purple-600 text-white shadow-md' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

const UpcomingSeries = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        // First try to fetch from the API
        try {
          const response = await axios.get(
            "https://api.cricapi.com/v1/series?apikey=2bb2745d-491d-4306-a67b-4f442aafba67&offset=0"
          );
          if (response.data && response.data.data && response.data.data.length > 0) {
            setSeries(response.data.data);
            setLoading(false);
            return;
          }
        } catch (apiError) {
          console.log("API fetch failed, using mock data instead");
        }
        
        // If API fails or returns no data, use mock data
        setSeries(mockSeriesData);
      } catch (err) {
        console.error("Error fetching match schedule:", err);
        setError("Failed to load match schedule.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  // Mock series data with realistic upcoming cricket series
  const mockSeriesData = [
    {
      id: "ipl2025",
      name: "Indian Premier League 2025",
      startDate: "2025-03-23",
      endDate: "2025-05-28",
      odi: 0,
      t20: 76,
      test: 0,
      squads: 10,
      matches: 76,
      description: "The 18th season of the Indian Premier League, featuring 10 teams in a T20 format."
    },
    {
      id: "wc2025",
      name: "ICC Cricket World Cup 2025",
      startDate: "2025-10-05",
      endDate: "2025-11-15",
      odi: 48,
      t20: 0,
      test: 0,
      squads: 14,
      matches: 48,
      description: "The 14th edition of the Cricket World Cup, an international ODI tournament."
    },
    {
      id: "bgt2025",
      name: "Border-Gavaskar Trophy 2025-26",
      startDate: "2025-11-27",
      endDate: "2026-01-07",
      odi: 0,
      t20: 0,
      test: 5,
      squads: 2,
      matches: 5,
      description: "Test series between India and Australia played for the Border-Gavaskar Trophy."
    },
    {
      id: "indveng2025",
      name: "India vs England ODI Series 2025",
      startDate: "2025-06-15",
      endDate: "2025-06-28",
      odi: 5,
      t20: 0,
      test: 0,
      squads: 2,
      matches: 5,
      description: "5-match ODI series between India and England."
    },
    {
      id: "pslt20",
      name: "Pakistan Super League 2025",
      startDate: "2025-02-15",
      endDate: "2025-03-17",
      odi: 0,
      t20: 34,
      test: 0,
      squads: 6,
      matches: 34,
      description: "Pakistan's premier T20 cricket league featuring 6 teams."
    },
    {
      id: "indvsnz2025",
      name: "India vs New Zealand Test Series 2025",
      startDate: "2025-09-10",
      endDate: "2025-10-01",
      odi: 0,
      t20: 0,
      test: 3,
      squads: 2,
      matches: 3,
      description: "3-match Test series between India and New Zealand."
    },
    {
      id: "ausvseng2025",
      name: "Australia vs England T20I Series 2025",
      startDate: "2025-05-05",
      endDate: "2025-05-14",
      odi: 0,
      t20: 5,
      test: 0,
      squads: 2,
      matches: 5,
      description: "5-match T20I series between Australia and England."
    },
    {
      id: "sacup2025",
      name: "Asia Cup 2025",
      startDate: "2025-08-10",
      endDate: "2025-08-30",
      odi: 13,
      t20: 0,
      test: 0,
      squads: 6,
      matches: 13,
      description: "ODI tournament featuring teams from Asia."
    },
    {
      id: "indvsaus2025",
      name: "India vs Australia ODI Series 2025",
      startDate: "2025-07-05",
      endDate: "2025-07-18",
      odi: 3,
      t20: 3,
      test: 0,
      squads: 2,
      matches: 6,
      description: "Bilateral series featuring 3 ODIs and 3 T20Is between India and Australia."
    },
    {
      id: "bbl2025",
      name: "Big Bash League 2025-26",
      startDate: "2025-12-10",
      endDate: "2026-01-28",
      odi: 0,
      t20: 61,
      test: 0,
      squads: 8,
      matches: 61,
      description: "Australian domestic T20 cricket league."
    },
    {
      id: "cpl2025",
      name: "Caribbean Premier League 2025",
      startDate: "2025-08-25",
      endDate: "2025-10-02",
      odi: 0,
      t20: 34,
      test: 0,
      squads: 6,
      matches: 34,
      description: "T20 league in the Caribbean."
    },
    {
      id: "wict202025",
      name: "ICC Women's T20 World Cup 2025",
      startDate: "2025-09-15",
      endDate: "2025-10-05",
      odi: 0,
      t20: 23,
      test: 0,
      squads: 10,
      matches: 23,
      description: "The 9th edition of the Women's T20 World Cup."
    },
    {
      id: "pakvsban",
      name: "Pakistan vs Bangladesh Test Series 2025",
      startDate: "2025-05-15",
      endDate: "2025-05-31",
      odi: 0,
      t20: 0,
      test: 2,
      squads: 2,
      matches: 2,
      description: "2-match Test series between Pakistan and Bangladesh."
    },
    {
      id: "slt20",
      name: "Sri Lanka T20 League 2025",
      startDate: "2025-07-01",
      endDate: "2025-07-25",
      odi: 0,
      t20: 31,
      test: 0,
      squads: 6,
      matches: 31,
      description: "T20 league in Sri Lanka."
    },
    {
      id: "safvsindt20",
      name: "South Africa vs India T20I Series 2025",
      startDate: "2025-06-01",
      endDate: "2025-06-10",
      odi: 0,
      t20: 4,
      test: 0,
      squads: 2,
      matches: 4,
      description: "4-match T20I series between South Africa and India."
    },
    {
      id: "santextalent",
      name: "SA New Talent Series 2025",
      startDate: "2025-05-25",
      endDate: "2025-06-15",
      odi: 5,
      t20: 0,
      test: 0,
      squads: 4,
      matches: 6,
      description: "Multilateral ODI series hosted in South Africa with emerging teams."
    },
    {
      id: "trinationscup",
      name: "Tri-Nations Cup 2025",
      startDate: "2025-07-28",
      endDate: "2025-08-09",
      odi: 7,
      t20: 0,
      test: 0,
      squads: 3,
      matches: 7,
      description: "ODI tournament featuring England, West Indies, and Ireland."
    },
    {
      id: "engvswindt20",
      name: "England vs West Indies T20I Series 2025",
      startDate: "2025-05-07",
      endDate: "2025-05-14",
      odi: 0,
      t20: 5,
      test: 0,
      squads: 2,
      matches: 5,
      description: "5-match T20I series between England and West Indies."
    }
  ];

  // Sort series by start date (nearest first)
  const sortedSeries = [...(series || [])].sort((a, b) => {
    if (!a.startDate) return 1;
    if (!b.startDate) return -1;
    return new Date(a.startDate) - new Date(b.startDate);
  });

  // Apply filters
  const filteredSeries = activeFilter === "All" 
    ? sortedSeries 
    : sortedSeries.filter(item => getSeriesCategory(item.name) === activeFilter);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut" 
      } 
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-3">
            Upcoming Cricket Series
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Stay updated with all the upcoming cricket actions from around the world
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 relative">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 border-opacity-20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-300">Loading upcoming series...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-6 mx-auto max-w-xl">
            <div className="flex items-center text-red-300 mb-3">
              <AlertCircle className="w-6 h-6 mr-2" />
              <span className="font-semibold">Error</span>
            </div>
            <p className="text-white">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors rounded-md text-white text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && (!series || series.length === 0) && (
          <div className="text-center py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block p-6 bg-gray-800 bg-opacity-50 rounded-full mb-4">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Upcoming Series</h3>
              <p className="text-gray-400">
                There are no upcoming cricket series available at the moment.
              </p>
            </motion.div>
          </div>
        )}

        {/* Series Listings */}
        {!loading && !error && series && series.length > 0 && (
          <>
            {/* Filter Options */}
            <SeriesFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            
            {/* Stats Summary */}
            <motion.div 
              className="mb-10 bg-gray-800 bg-opacity-40 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-400">{series.length}</p>
                  <p className="text-gray-300 text-sm">Total Series</p>
                </div>
                <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-purple-400">
                    {series.filter(s => getSeriesCategory(s.name) === "World Cup").length}
                  </p>
                  <p className="text-gray-300 text-sm">World Cups</p>
                </div>
                <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-400">
                    {series.filter(s => getSeriesCategory(s.name) === "T20").length}
                  </p>
                  <p className="text-gray-300 text-sm">T20 Series</p>
                </div>
                <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-red-400">
                    {series.filter(s => getSeriesCategory(s.name) === "ODI").length || 
                     series.filter(s => (s.odi && s.odi > 0)).length}
                  </p>
                  <p className="text-gray-300 text-sm">ODI Series</p>
                </div>
              </div>
            </motion.div>

            {/* Series Cards Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredSeries.map((item, index) => (
                <SeriesCard key={index} series={item} />
              ))}
            </motion.div>
            
            {/* No matches in filter result */}
            {filteredSeries.length === 0 && (
              <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 text-center my-12">
                <div className="text-5xl mb-4">🏏</div>
                <h3 className="text-xl font-semibold text-white mb-2">No {activeFilter} series found</h3>
                <p className="text-gray-400">Try selecting a different filter</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UpcomingSeries;
