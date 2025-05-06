import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import News from '../components/News';
import Footer from '../components/Footer';
import { FaCalendarCheck, FaUserFriends, FaMapMarkerAlt, FaTrophy } from 'react-icons/fa';

const CricXifyHomepage = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ scale, opacity }}
          className="fixed inset-0 z-0"
        >
          <img
            src="/Stadium.jpg"
            alt="Stadium"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-[2px]" />
        </motion.div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 100 
            }}
            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white mb-8 drop-shadow-2xl text-center"
          >
            Welcome to CricXify
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-3xl text-gray-300 mb-12 drop-shadow-xl text-center max-w-3xl"
          >
            Your Ultimate Cricket Destination
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4"
          >
            {[
              { to: "/live-scores", icon: <FaTrophy />, text: "Live Scores", color: "purple" },
              { to: "/upcoming-series", icon: <FaCalendarCheck />, text: "Upcoming Series", color: "blue" },
              { to: "/teams", icon: <FaUserFriends />, text: "Teams", color: "green" },
              { to: "/venue", icon: <FaMapMarkerAlt />, text: "Venues", color: "red" }
            ].map((item, index) => (
              <motion.div
                key={item.to}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.to}
                  className={`group block bg-${item.color}-600/80 backdrop-blur-md hover:bg-${item.color}-700/90 text-white p-6 rounded-xl transition-all transform shadow-lg hover:shadow-${item.color}-500/30`}
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="text-4xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-lg font-medium group-hover:text-white/90">
                      {item.text}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <div className="text-white text-center">
              <div className="h-16 w-8 border-2 border-white/80 rounded-full mx-auto mb-2 backdrop-blur-sm relative overflow-hidden">
                <motion.div
                  className="h-3 w-3 bg-white rounded-full mx-auto"
                  animate={{
                    y: [2, 24, 2]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <span className="text-sm drop-shadow-lg font-light tracking-wider">
                Scroll for News
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Section with Scroll Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-12 relative z-10"
      >
        <News />
      </motion.div>

      {/* Footer with Animation */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <Footer />
      </motion.footer>
    </div>
  );
};

export default CricXifyHomepage;
