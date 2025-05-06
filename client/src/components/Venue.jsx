import React, { useState, useEffect } from 'react';
import { MapPin, Landmark, Users, Compass, Ruler, Calendar, Search, ChevronDown, ChevronUp, Globe, BarChart3, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced venue data with more details and local image paths
const venueData = {
  "Wankhede Stadium, Mumbai": {
    name: "Wankhede Stadium",
    city: "Mumbai",
    country: "India",
    capacity: 33000,
    established: 1974,
    pitch: "Batting friendly, assists spinners later in the game",
    pavilionEnds: "Garware Pavilion End, Tata End",
    averageFirstInningsScore: 165,
    notableFact: "Hosted the 2011 ICC Cricket World Cup Final",
    image: "/Wankhede stadium.jpg",
    color: "bg-gradient-to-r from-orange-600 to-red-600",
    textColor: "text-orange-500"
  },
  "M. Chinnaswamy Stadium, Bangalore": {
    name: "M. Chinnaswamy Stadium",
    city: "Bangalore",
    country: "India",
    capacity: 40000,
    established: 1969,
    pitch: "High scoring ground with small boundaries",
    pavilionEnds: "BEML End, Cubbon Road End",
    averageFirstInningsScore: 175,
    notableFact: "First cricket stadium in the world to use solar panels for power",
    image: "/chinnaswamystadium.jpg",
    color: "bg-gradient-to-r from-red-600 to-red-800",
    textColor: "text-red-500"
  },
  "Eden Gardens, Kolkata": {
    name: "Eden Gardens",
    city: "Kolkata",
    country: "India",
    capacity: 68000,
    established: 1864,
    pitch: "Balanced for both batsmen and spinners, helps fast bowlers early on",
    pavilionEnds: "High Court End, Club House End",
    averageFirstInningsScore: 155,
    notableFact: "Second largest cricket stadium in the world",
    image: "/Eden gardens.jpg",
    color: "bg-gradient-to-r from-green-600 to-green-800",
    textColor: "text-green-500"
  },
  "Melbourne Cricket Ground, Melbourne": {
    name: "Melbourne Cricket Ground",
    city: "Melbourne",
    country: "Australia",
    capacity: 100024,
    established: 1853,
    pitch: "Varies, but can be good for batting with even bounce",
    pavilionEnds: "Members End, Great Southern Stand End",
    averageFirstInningsScore: 160,
    notableFact: "Largest cricket stadium in the world by capacity",
    image: "/MELBOURNE STADIUM.jpg",
    color: "bg-gradient-to-r from-blue-600 to-blue-800",
    textColor: "text-blue-500"
  },
  "Lords Cricket Ground, London": {
    name: "Lords Cricket Ground",
    city: "London",
    country: "England",
    capacity: 30000,
    established: 1814,
    pitch: "Favors seamers due to the famous slope across the ground",
    pavilionEnds: "Pavilion End, Nursery End",
    averageFirstInningsScore: 150,
    notableFact: "Known as the 'Home of Cricket'",
    image: "/Lord's_Pavilion.jpg",
    color: "bg-gradient-to-r from-indigo-600 to-indigo-800",
    textColor: "text-indigo-500"
  },
  "Adelaide Oval, Adelaide": {
    name: "Adelaide Oval",
    city: "Adelaide", 
    country: "Australia",
    capacity: 53583,
    established: 1871,
    pitch: "Traditionally batting friendly, helps spinners later",
    pavilionEnds: "River End, Cathedral End",
    averageFirstInningsScore: 165,
    notableFact: "First venue to host a day-night Test match with a pink ball",
    image: "/Adelaide Oval Gather Round.jpg",
    color: "bg-gradient-to-r from-purple-600 to-purple-800",
    textColor: "text-purple-500"
  },
  "Narendra Modi Stadium, Ahmedabad": {
    name: "Narendra Modi Stadium",
    city: "Ahmedabad",
    country: "India",
    capacity: 132000,
    established: 1982,
    pitch: "Good batting surface with even bounce",
    pavilionEnds: "Adani Pavilion End, Reliance End",
    averageFirstInningsScore: 170,
    notableFact: "Largest cricket stadium in the world after 2020 renovation",
    image: "/Narendra modi.jpg",
    color: "bg-gradient-to-r from-amber-600 to-amber-800",
    textColor: "text-amber-500"
  },
  "Sydney Cricket Ground, Sydney": {
    name: "Sydney Cricket Ground",
    city: "Sydney",
    country: "Australia",
    capacity: 48000,
    established: 1848,
    pitch: "Traditional cricketing wicket that favors spin bowling",
    pavilionEnds: "Randwick End, Paddington End",
    averageFirstInningsScore: 155,
    notableFact: "One of the most historic cricket grounds in the world",
    image: "/Sydney Stadium.jpg",
    color: "bg-gradient-to-r from-cyan-600 to-cyan-800",
    textColor: "text-cyan-500"
  },
  "Kensington Oval, Barbados": {
    name: "Kensington Oval",
    city: "Bridgetown",
    country: "Barbados",
    capacity: 28000,
    established: 1882,
    pitch: "Traditionally pace-friendly with good bounce",
    pavilionEnds: "Malcolm Marshall End, Joel Garner End",
    averageFirstInningsScore: 145,
    notableFact: "Hosted the final of the 2007 Cricket World Cup",
    image: "/Stadium.jpg", // Using generic stadium image
    color: "bg-gradient-to-r from-emerald-600 to-emerald-800",
    textColor: "text-emerald-500"
  },
  "Galle International Stadium, Galle": {
    name: "Galle International Stadium",
    city: "Galle",
    country: "Sri Lanka",
    capacity: 35000,
    established: 1876,
    pitch: "Assists spin bowlers, especially on days 4 and 5",
    pavilionEnds: "City End, Fort End",
    averageFirstInningsScore: 140,
    notableFact: "Backdrop of a 16th century Dutch fort",
    image: "/galle stadium.jpg",
    color: "bg-gradient-to-r from-yellow-600 to-yellow-800",
    textColor: "text-yellow-500"
  },
  "The Gabba, Brisbane": {
    name: "The Gabba",
    city: "Brisbane",
    country: "Australia",
    capacity: 42000,
    established: 1895,
    pitch: "Fast and bouncy, favors pace bowlers",
    pavilionEnds: "Stanley Street End, Vulture Street End",
    averageFirstInningsScore: 155,
    notableFact: "Australia has not lost a Test match here since 1988",
    image: "/Stadium.jpg", // Using generic stadium image
    color: "bg-gradient-to-r from-pink-600 to-pink-800",
    textColor: "text-pink-500"
  },
  "SuperSport Park, Centurion": {
    name: "SuperSport Park",
    city: "Centurion",
    country: "South Africa",
    capacity: 22000,
    established: 1986,
    pitch: "Bouncy pitch that assists pace bowlers",
    pavilionEnds: "Pavilion End, Hennops River End",
    averageFirstInningsScore: 150,
    notableFact: "Known for its fast-bowler friendly conditions",
    image: "/Centurion Stadium.jpg",
    color: "bg-gradient-to-r from-lime-600 to-lime-800",
    textColor: "text-lime-500"
  }
};

// Enhanced VenueCard component with expandable details
const VenueCard = ({ venue, data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Handle image loading error
  const handleImageError = (e) => {
    setImgError(true);
    e.target.src = "https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      {/* Stadium Image with Gradient Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imgError ? "https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" : data.image} 
          alt={data.name} 
          className="w-full h-full object-cover transform scale-105"
          onError={handleImageError}
          loading="lazy"
        />
        <div className={`absolute inset-0 ${data.color} opacity-50`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold">{data.name}</h3>
          <div className="flex items-center text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{data.city}, {data.country}</span>
          </div>
        </div>
      </div>
      
      {/* Basic Venue Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Landmark className={`w-5 h-5 mr-2 ${data.textColor}`} />
            <span className="text-sm font-medium text-gray-800">Established {data.established}</span>
          </div>
          <div className="flex items-center">
            <Users className={`w-5 h-5 mr-2 ${data.textColor}`} />
            <span className="text-sm font-medium text-gray-800">{data.capacity.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex justify-center items-center text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors border-b border-gray-200"
      >
        {isExpanded ? (
          <>
            <span>Show Less</span>
            <ChevronUp className="ml-2 w-4 h-4" />
          </>
        ) : (
          <>
            <span>View Details</span>
            <ChevronDown className="ml-2 w-4 h-4" />
          </>
        )}
      </button>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-3 text-sm">
              <div className="flex">
                <Compass className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Pavilion Ends</p>
                  <p className="text-gray-600">{data.pavilionEnds}</p>
                </div>
              </div>
              
              <div className="flex">
                <Ruler className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Pitch Characteristics</p>
                  <p className="text-gray-600">{data.pitch}</p>
                </div>
              </div>
              
              <div className="flex">
                <BarChart3 className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Average First Innings Score</p>
                  <p className="text-gray-600">{data.averageFirstInningsScore} runs (T20)</p>
                </div>
              </div>
              
              <div className="flex">
                <Globe className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Notable Fact</p>
                  <p className="text-gray-600">{data.notableFact}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Venue = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("All");

  // Get unique countries from venue data
  const countries = ["All", ...new Set(Object.values(venueData).map(venue => venue.country))];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter venues by search and country
  const filteredVenues = Object.entries(venueData).filter(([key, venue]) => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          venue.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === "All" || venue.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-3">
            Cricket Stadiums
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore the iconic cricket venues from around the world
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 backdrop-blur-md border border-blue-500/20 rounded-2xl p-4 text-center">
            <div className="text-blue-400 mb-1 flex justify-center">
              <Landmark className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-white">{Object.keys(venueData).length}</p>
            <p className="text-blue-100 text-sm">Total Venues</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 backdrop-blur-md border border-purple-500/20 rounded-2xl p-4 text-center">
            <div className="text-purple-400 mb-1 flex justify-center">
              <Globe className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-white">{countries.length - 1}</p> {/* -1 for "All" */}
            <p className="text-purple-100 text-sm">Countries</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/20 backdrop-blur-md border border-green-500/20 rounded-2xl p-4 text-center">
            <div className="text-green-400 mb-1 flex justify-center">
              <Users className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-white">
              {Object.values(venueData).reduce((acc, venue) => acc + venue.capacity, 0).toLocaleString()}
            </p>
            <p className="text-green-100 text-sm">Total Capacity</p>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search venues by name or city..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md"
              />
            </div>
            
            {/* Country Filter */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="md:w-48 px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md"
            >
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 relative">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 border-opacity-20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-300">Loading venues...</p>
          </div>
        ) : (
          <>
            {/* Venues Grid */}
            {filteredVenues.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredVenues.map(([key, venue]) => (
                  <VenueCard key={key} venue={key} data={venue} />
                ))}
              </motion.div>
            ) : (
              // No venues found state
              <motion.div 
                className="bg-gray-800 bg-opacity-50 rounded-xl p-10 text-center border border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4">🏟️</div>
                <h3 className="text-xl font-semibold text-white mb-2">No venues found</h3>
                <p className="text-gray-400">
                  {searchQuery ? `No venues matching "${searchQuery}"` : 
                   selectedCountry !== 'All' ? `No venues in ${selectedCountry}` : 
                   'No venues available'}
                </p>
                {(searchQuery || selectedCountry !== 'All') && (
                  <button 
                    onClick={() => {setSearchQuery(''); setSelectedCountry('All');}}
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
};

export default Venue;
