import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Star, Globe, Crown, Bolt } from 'lucide-react';

const News = () => {
  const icons = [<Flame className="w-5 h-5" />, <Trophy className="w-5 h-5" />, <Star className="w-5 h-5" />, <Globe className="w-5 h-5" />, <Crown className="w-5 h-5" />, <Bolt className="w-5 h-5" />];

  const newsItems = [
    {
      title: "Mumbai extends winning streak to 6 matches in a row",
      description: "Mumbai continues their dominant performance in IPL 2025, winning 6 consecutive matches and strengthening their position at the top of the table."
    },
    {
      title: "Mumbai Indians top IPL 2025 table with perfect record",
      description: "Mumbai Indians have dominated the league stage with 10 wins from 10 matches, securing an early playoff berth."
    },
    {
      title: "14-year-old Vaibhav Suryavanshi scores blistering 101 off 36 balls",
      description: "The teenage prodigy smashed an incredible century in just 36 deliveries, setting new records and showcasing the future of cricket."
    },
    {
      title: "ICC reveals host cities for Champions Trophy 2026",
      description: "Pakistan announced as host with matches scheduled across Lahore, Karachi, and Islamabad from February 2026."
    },
    {
      title: "India completes historic test series win in Australia",
      description: "Team India secures a 3-1 series victory, their third consecutive test series win on Australian soil."
    },
    {
      title: "Jasprit Bumrah becomes World's No. 1 bowler across all formats",
      description: "The Indian pace sensation achieves a rare feat by topping ICC rankings in Tests, ODIs, and T20Is simultaneously."
    },
    {
      title: "England unveils revolutionary cricket format '30-30'",
      description: "ECB announces new 30-over format with innovative rules aimed at bridging the gap between T20 and ODI cricket."
    },
    {
      title: "IPL 2025 breaks all viewership records",
      description: "The tournament surpasses 500 million global viewers, becoming the most-watched cricket competition in history."
    },
    {
      title: "Shubman Gill named India's new T20I captain",
      description: "The 25-year-old takes over leadership after Rohit Sharma steps down from the shortest format."
    },
    {
      title: "Women's IPL 2025 prize money increased to match men's tournament",
      description: "BCCI announces equal prize money for WIPL, marking a watershed moment for gender equality in cricket."
    },
    {
      title: "Cricket to feature in 2028 Los Angeles Olympics",
      description: "IOC confirms T20 cricket will debut as an Olympic sport, with eight nations set to participate."
    },
    {
      title: "Jos Buttler breaks T20 batting record with 172* off 58 balls",
      description: "England captain smashes the highest individual score in T20 internationals against South Africa."
    },
    {
      title: "Cricket's first carbon-neutral stadium unveiled in New Zealand",
      description: "Wellington's new cricket stadium sets global benchmark for sustainable sports infrastructure."
    },
    {
      title: "Afghanistan qualifies for first-ever World Test Championship final",
      description: "Rashid Khan & Co. complete remarkable journey to secure spot in the WTC final against Australia."
    },
    {
      title: "MS Dhoni announces cricket academy franchise across five continents",
      description: "The legendary captain launches global cricket academies to nurture talent in traditional and emerging cricket nations."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.h2
        className="text-5xl font-black text-center mb-16 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-600 to-purple-800">
          🏏 Hot Cricket Buzz
        </span>
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 via-pink-600 to-purple-800"
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </motion.h2>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {newsItems.map((news, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 rounded-3xl blur-xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
            <div className="relative p-6 rounded-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-2 rounded-full bg-gradient-to-br from-orange-500 via-pink-600 to-purple-800 text-white"
                >
                  {icons[index % icons.length]}
                </motion.div>
                <h3 className="font-bold text-lg tracking-wide bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {news.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {news.description}
              </p>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-pink-600 to-purple-800 rounded-b-3xl"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default News;
