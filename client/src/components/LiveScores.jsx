import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { 
  Trophy, CircleDot, Flag, Clock, ArrowRightCircle,
  Search, Filter, TrendingUp, CheckCircle
} from 'lucide-react';

// Team logos mapping - for team visual identification
const teamLogos = {
  "CSK": "/team-logos/csk.png",
  "SRH": "/team-logos/srh.png",
  "RR": "/team-logos/rr.png",
  "RCB": "/team-logos/rcb.png",
  "MI": "/team-logos/mi.png",
  "DC": "/team-logos/dc.png",
  "PBKS": "/team-logos/pbks.png",
  "KKR": "/team-logos/kkr.png",
  "GT": "/team-logos/gt.png",
  "LSG": "/team-logos/lsg.png",
};

// Function to extract team code from full team name
const getTeamCode = (teamName) => {
  if (!teamName) return "";
  const match = teamName.match(/\[([^\]]+)\]/);
  return match ? match[1] : "";
};

// Calculate match time status
const getMatchTimeStatus = (date, time, status) => {
  if (status.toLowerCase() === 'live') return { type: 'live', text: 'LIVE NOW' };
  if (status.toLowerCase() === 'finished') return { type: 'completed', text: 'COMPLETED' };

  // Handle upcoming matches
  try {
    const matchDate = new Date(`${date}T${time.split(' ')[0]}`);
    const now = new Date();
    const diffTime = matchDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return { type: 'today', text: 'TODAY' };
    if (diffDays === 1) return { type: 'tomorrow', text: 'TOMORROW' };
    if (diffDays <= 7) return { type: 'thisWeek', text: `IN ${diffDays} DAYS` };
    return { type: 'upcoming', text: formatDate(date) };
  } catch (e) {
    return { type: 'upcoming', text: 'UPCOMING' };
  }
};

// Format date to a more readable format
const formatDate = (dateString) => {
  if (!dateString) return "TBD";
  try {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  } catch (e) {
    return dateString;
  }
};

// Enhanced MatchCard Component
function MatchCard({ match }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const team1Code = getTeamCode(match.team1);
  const team2Code = getTeamCode(match.team2);
  const timeStatus = getMatchTimeStatus(match.date, match.time, match.status);

  // Get status color and styling
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'match not started':
        return 'text-gray-600 bg-gray-100 border-gray-300';
      case 'live':
        return 'text-white bg-red-500 border-red-600 animate-pulse';
      case 'finished':
        return 'text-white bg-blue-600 border-blue-700';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  // Get league badge styling
  const getLeagueBadgeStyle = (league) => {
    switch (league) {
      case 'Indian Premier League 2025':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'County Championship Division One 2025':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'County Championship Division Two 2025':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Pakistan Super League 2025':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'The North American T20 Cup 2025':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'The Ashes 2025':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Asia Cup 2025':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get match background style
  const getCardStyle = (league) => {
    switch (league) {
      case 'Indian Premier League 2025':
        return 'from-blue-50 to-indigo-100 border-indigo-200';
      case 'County Championship Division One 2025':
        return 'from-green-50 to-emerald-100 border-emerald-200';
      case 'County Championship Division Two 2025':
        return 'from-teal-50 to-cyan-100 border-teal-200';
      case 'Pakistan Super League 2025':
        return 'from-yellow-50 to-amber-100 border-amber-200';
      case 'The North American T20 Cup 2025':
        return 'from-red-50 to-rose-100 border-rose-200';
      case 'The Ashes 2025':
        return 'from-purple-50 to-fuchsia-100 border-purple-200';
      case 'Asia Cup 2025':
        return 'from-orange-50 to-amber-100 border-orange-200';
      default:
        return 'from-white to-gray-100 border-gray-200';
    }
  };

  // Get league abbreviation
  const getLeagueSymbol = (league) => {
    switch (league) {
      case 'Indian Premier League 2025':
        return 'IPL';
      case 'County Championship Division One 2025':
        return 'CC D1';
      case 'County Championship Division Two 2025':
        return 'CC D2';
      case 'Pakistan Super League 2025':
        return 'PSL';
      case 'The North American T20 Cup 2025':
        return 'NAT20';
      case 'The Ashes 2025':
        return 'ASHES';
      case 'Asia Cup 2025':
        return 'ASIA';
      default:
        return '🏏';
    }
  };

  return (
    <motion.div 
      className={`bg-gradient-to-br ${getCardStyle(match.league)} rounded-2xl shadow-lg overflow-hidden
                border transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
      layoutId={`match-${match.id}`}
    >
      {/* League Badge */}
      <div className="relative">
        <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold ${getLeagueBadgeStyle(match.league)} border`}>
          {getLeagueSymbol(match.league)}
        </div>

        {/* Match Status */}
        <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(match.status)} border`}>
          {timeStatus.text}
        </div>
      </div>

      {/* Teams Section */}
      <div className="pt-16 pb-6 px-5 flex items-center justify-center space-x-4">
        {/* Team 1 */}
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden border-2 border-gray-200">
            <img 
              src={teamLogos[team1Code] || `https://ui-avatars.com/api/?name=${team1Code}&background=random`} 
              alt={team1Code}
              className="w-full h-full object-contain"
              onError={(e) => {e.target.src = `https://ui-avatars.com/api/?name=${team1Code}&background=random`}}
            />
          </div>
          <p className="mt-2 font-semibold text-center text-gray-800">{team1Code}</p>
        </div>
        
        {/* VS */}
        <div className="text-gray-400 font-bold text-lg">VS</div>
        
        {/* Team 2 */}
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden border-2 border-gray-200">
            <img 
              src={teamLogos[team2Code] || `https://ui-avatars.com/api/?name=${team2Code}&background=random`} 
              alt={team2Code}
              className="w-full h-full object-contain"
              onError={(e) => {e.target.src = `https://ui-avatars.com/api/?name=${team2Code}&background=random`}}
            />
          </div>
          <p className="mt-2 font-semibold text-center text-gray-800">{team2Code}</p>
        </div>
      </div>

      {/* Match Info Section */}
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm p-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" />
          <span>{match.date || 'TBD'}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <ClockIcon className="w-4 h-4 mr-2 text-green-500" />
          <span>{match.time || 'TBD'}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <MapPinIcon className="w-4 h-4 mr-2 text-red-500" />
          <span className="truncate">{match.venue || 'TBD'}</span>
        </div>

        {/* Expand/Collapse Button */}
        <div className="pt-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex justify-center items-center py-1 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            {isExpanded ? 'Show Less' : 'Match Details'}
            <ArrowRightCircle className={`ml-1 h-3 w-3 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-gray-200 space-y-3 text-sm text-gray-700">
                <div>
                  <span className="font-medium">Full Teams:</span>
                  <p>{match.team1} vs {match.team2}</p>
                </div>
                <div>
                  <span className="font-medium">Tournament:</span>
                  <p>{match.league}</p>
                </div>
                
                {/* Fictional Pitch and Weather Info */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs font-medium text-gray-500">PITCH</p>
                    <p className="text-sm">Batting friendly</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-xs font-medium text-gray-500">WEATHER</p>
                    <p className="text-sm">Clear, 24°C</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function LiveScores() {
  const [matches, setMatches] = useState([
    {
      id: 1,
      team1: "Chennai Super Kings [CSK]",
      team2: "Sunrisers Hyderabad [SRH]",
      league: "Indian Premier League 2025",
      status: "Match not started",
      date: "2025-03-22",
      time: "19:30 IST",
      venue: "MA Chidambaram Stadium, Chennai",
    },
    {
      id: 2,
      team1: "Nottinghamshire [NOT]",
      team2: "Sussex [SUSS]",
      league: "County Championship Division One 2025",
      status: "Match not started",
      date: "2025-04-10",
      time: "11:00 BST",
      venue: "Trent Bridge, Nottingham",
    },
    {
      id: 3,
      team1: "Somerset [SOM]",
      team2: "Surrey [SUR]",
      league: "County Championship Division One 2025",
      status: "Match not started",
      date: "2025-04-10",
      time: "11:00 BST",
      venue: "The Cooper Associates County Ground, Taunton",
    },
    {
      id: 4,
      team1: "Durham [DURH]",
      team2: "Worcestershire [WRCS]",
      league: "County Championship Division One 2025",
      status: "Match not started",
      date: "2025-04-10",
      time: "11:00 BST",
      venue: "Emirates Riverside, Chester-le-Street",
    },
    {
      id: 5,
      team1: "Gloucestershire [GLOU]",
      team2: "Leicestershire [LECS]",
      league: "County Championship Division Two 2025",
      status: "Match not started",
      date: "2025-04-10",
      time: "11:00 BST",
      venue: "Seat Unique Stadium, Bristol",
    },
    {
      id: 6,
      team1: "Derbyshire [DERB]",
      team2: "Middlesex [MDX]",
      league: "County Championship Division Two 2025",
      status: "Match not started",
      date: "2025-04-10",
      time: "11:00 BST",
      venue: "The Incora County Ground, Derby",
    },
    {
      id: 7,
      team1: "Lahore Qalandars [LHQ]",
      team2: "Peshawar Zalmi [PSZ]",
      league: "Pakistan Super League 2025",
      status: "Match not started",
      date: "2025-02-20",
      time: "19:00 PKT",
      venue: "Gaddafi Stadium, Lahore",
    },
    {
      id: 8,
      team1: "Rajasthan Royals [RR]",
      team2: "Royal Challengers Bengaluru [RCB]",
      league: "Indian Premier League 2025",
      status: "Match not started",
      date: "2025-03-25",
      time: "19:30 IST",
      venue: "Sawai Mansingh Stadium, Jaipur",
    },
    {
      id: 9,
      team1: "Canada [CAN]",
      team2: "Cayman Islands [CAYM]",
      league: "The North American T20 Cup 2025",
      status: "Match not started",
      date: "2025-06-15",
      time: "17:00 EDT",
      venue: "Central Broward Park, Lauderhill",
    },
    {
      id: 10,
      team1: "Australia [AUS]",
      team2: "England [ENG]",
      league: "The Ashes 2025",
      status: "Live",
      date: "2025-07-09",
      time: "10:30 AEST",
      venue: "The Gabba, Brisbane"
    },
    {
      id: 11,
      team1: "India [IND]",
      team2: "Pakistan [PAK]",
      league: "Asia Cup 2025",
      status: "Finished",
      date: "2025-09-05",
      time: "14:00 IST",
      venue: "R. Premadasa Stadium, Colombo"
    },
    // Adding a few additional matches with different statuses for better UI testing
    {
      id: 12,
      team1: "Mumbai Indians [MI]",
      team2: "Kolkata Knight Riders [KKR]",
      league: "Indian Premier League 2025",
      status: "Live",
      date: "2025-04-29", // Today's date
      time: "19:30 IST",
      venue: "Wankhede Stadium, Mumbai",
    },
    {
      id: 13,
      team1: "Delhi Capitals [DC]",
      team2: "Gujarat Titans [GT]",
      league: "Indian Premier League 2025",
      status: "Match not started",
      date: "2025-04-30", // Tomorrow
      time: "19:30 IST",
      venue: "Arun Jaitley Stadium, Delhi",
    }
  ]);
  
  const [filteredMatches, setFilteredMatches] = useState(matches);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Statistics calculation
  const liveCount = matches.filter(match => match.status.toLowerCase() === 'live').length;
  const upcomingCount = matches.filter(match => match.status.toLowerCase() === 'match not started').length;
  const completedCount = matches.filter(match => match.status.toLowerCase() === 'finished').length;
  
  // Unique tournaments in the data
  const tournaments = [...new Set(matches.map(match => match.league))];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter matches
  useEffect(() => {
    let result = [...matches];
    
    // Apply status filter
    if (activeFilter !== 'all') {
      result = result.filter(match => {
        if (activeFilter === 'live') return match.status.toLowerCase() === 'live';
        if (activeFilter === 'upcoming') return match.status.toLowerCase() === 'match not started';
        if (activeFilter === 'completed') return match.status.toLowerCase() === 'finished';
        return match.league.toLowerCase().includes(activeFilter.toLowerCase());
      });
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(match => 
        match.team1.toLowerCase().includes(query) || 
        match.team2.toLowerCase().includes(query) ||
        match.venue.toLowerCase().includes(query)
      );
    }
    
    setFilteredMatches(result);
  }, [activeFilter, searchQuery, matches]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-3">
            Live Cricket Scores
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Stay updated with real-time cricket scores from around the world
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-4 text-center">
            <div className="text-blue-400 mb-1 flex justify-center">
              <Trophy className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-white">{matches.length}</p>
            <p className="text-blue-100 text-sm">Total Matches</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/20 backdrop-blur-md border border-red-500/20 rounded-2xl p-4 text-center">
            <div className="text-red-400 mb-1 flex justify-center">
              <CircleDot className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-white">{liveCount}</p>
            <p className="text-red-100 text-sm">Live Now</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/20 backdrop-blur-md border border-green-500/20 rounded-2xl p-4 text-center">
            <div className="text-green-400 mb-1 flex justify-center">
              <Clock className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-white">{upcomingCount}</p>
            <p className="text-green-100 text-sm">Upcoming</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/20 backdrop-blur-md border border-yellow-500/20 rounded-2xl p-4 text-center">
            <div className="text-yellow-400 mb-1 flex justify-center">
              <Flag className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-white">{tournaments.length}</p>
            <p className="text-yellow-100 text-sm">Tournaments</p>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teams or venues..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md"
              />
            </div>
            
            {/* Filter Buttons - Small Screen */}
            <div className="md:hidden flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 text-sm rounded-lg ${
                  activeFilter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('live')}
                className={`px-4 py-2 text-sm rounded-lg ${
                  activeFilter === 'live' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700'
                }`}
              >
                Live
              </button>
              <button
                onClick={() => setActiveFilter('upcoming')}
                className={`px-4 py-2 text-sm rounded-lg ${
                  activeFilter === 'upcoming' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700'
                }`}
              >
                Upcoming
              </button>
            </div>
          </div>

          {/* Filter Pills - Large Screen */}
          <div className="hidden md:flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700 hover:bg-gray-700'
              }`}
            >
              All Matches
            </button>
            <button
              onClick={() => setActiveFilter('live')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center ${
                activeFilter === 'live' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700 hover:bg-gray-700'
              }`}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${activeFilter === 'live' ? 'bg-white' : 'bg-red-500 animate-pulse'}`}></span>
              Live Now
            </button>
            <button
              onClick={() => setActiveFilter('upcoming')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeFilter === 'upcoming' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700 hover:bg-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeFilter === 'completed' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700 hover:bg-gray-700'
              }`}
            >
              Completed
            </button>
            
            {/* Tournament filters */}
            {tournaments.slice(0, 3).map(tournament => (
              <button
                key={tournament}
                onClick={() => setActiveFilter(tournament)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  activeFilter === tournament
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-800 bg-opacity-50 text-gray-300 border border-gray-700 hover:bg-gray-700'
                }`}
              >
                {tournament.includes("Indian Premier League") ? "IPL" : 
                 tournament.includes("County Championship") ? "County" :
                 tournament.includes("Pakistan Super") ? "PSL" :
                 tournament.includes("North American") ? "NAT20" :
                 tournament.includes("Ashes") ? "Ashes" :
                 tournament.includes("Asia Cup") ? "Asia Cup" :
                 tournament.substring(0, 15) + "..."}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 relative">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 border-opacity-20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-300">Loading matches...</p>
          </div>
        ) : (
          <>
            {/* Match Cards Grid */}
            {filteredMatches.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </motion.div>
            ) : (
              // No matches found state
              <motion.div 
                className="bg-gray-800 bg-opacity-50 rounded-xl p-10 text-center border border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4">🏏</div>
                <h3 className="text-xl font-semibold text-white mb-2">No matches found</h3>
                <p className="text-gray-400">
                  {searchQuery ? `No matches matching "${searchQuery}"` : 
                   activeFilter !== 'all' ? `No ${activeFilter} matches available` : 
                   'No matches available at the moment'}
                </p>
                {(searchQuery || activeFilter !== 'all') && (
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveFilter('all');}}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </motion.div>
            )}
            
            {/* Footer */}
            <motion.footer 
              className="mt-16 text-center text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p>
                Made with ❤️ by Shashank | Powered by CricXify ⚡
              </p>
            </motion.footer>
          </>
        )}
      </div>
    </div>
  );
}

export default LiveScores;
