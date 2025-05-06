import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Send subscription request to the backend
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }
      
      // Success message
      setSubscriptionStatus('Thank you for subscribing! 🎉');
      setEmail('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubscriptionStatus(''), 3000);
    } catch (err) {
      console.error('Subscription error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      
      // Clear error message after 3 seconds
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-purple-900 text-white pt-12 pb-6 w-full relative overflow-hidden">
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: "radial-gradient(circle at 15px 15px, rgba(255,255,255,0.2) 2px, transparent 0)",
            backgroundSize: "30px 30px"
          }}
        />
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-purple-600/80 backdrop-blur-sm text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 z-50 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-6 h-6 transform transition-transform group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4"
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <motion.div variants={itemVariants} className="transform transition-transform duration-300 hover:translate-y-[-5px]">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              <span className="after:content-[''] after:block after:w-full after:h-1 after:bg-gradient-to-r after:from-purple-400 after:to-pink-400 after:mt-1">
                About CricXify
              </span>
            </h3>
            <p className="text-gray-300 mb-4">
              Your ultimate destination for cricket updates, live scores, news, and comprehensive coverage of all cricket formats worldwide.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram', 'youtube'].map((platform) => (
                <motion.a
                  key={platform}
                  href={`https://${platform}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <i className={`fab fa-${platform} text-xl`} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="transform transition-transform duration-300 hover:translate-y-[-5px]">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              <span className="after:content-[''] after:block after:w-full after:h-1 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400 after:mt-1">
                Quick Links
              </span>
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/live-scores', text: 'Live Scores' },
                { to: '/schedule', text: 'Match Schedule' },
                { to: '/teams', text: 'Teams' },
                { to: '/venues', text: 'Venues' },
                { to: '/news', text: 'News' }
              ].map((link) => (
                <motion.li key={link.to} whileHover={{ x: 5 }}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-purple-400 transition-all duration-300 flex items-center group"
                  >
                    <motion.i 
                      className="fas fa-chevron-right mr-2 opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                    />
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="transform transition-transform duration-300 hover:translate-y-[-5px]">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              <span className="after:content-[''] after:block after:w-full after:h-1 after:bg-gradient-to-r after:from-pink-400 after:to-red-400 after:mt-1">
                Contact Us
              </span>
            </h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} className="flex items-center space-x-2">
                <i className="fas fa-envelope text-purple-400" />
                <a href="mailto:contact@cricxify.com" className="text-gray-300 hover:text-purple-400 transition-colors">
                  contact@cricxify.com
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-center space-x-2">
                <i className="fas fa-phone text-purple-400" />
                <span className="text-gray-300">+91 8919323414</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-center space-x-2">
                <i className="fas fa-map-marker-alt text-purple-400" />
                <span className="text-gray-300">123 Cricket Street, Sports Valley, SV 12345</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="transform transition-transform duration-300 hover:translate-y-[-5px]">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              <span className="after:content-[''] after:block after:w-full after:h-1 after:bg-gradient-to-r after:from-orange-400 after:to-yellow-400 after:mt-1">
                Newsletter
              </span>
            </h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest cricket updates and news.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                  required
                />
                <i className="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
              </div>
              <motion.button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <motion.div
                      className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                    Processing...
                  </span>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <motion.i
                      className="fas fa-paper-plane"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  </>
                )}
              </motion.button>
              {subscriptionStatus && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-green-400 text-sm mt-2"
                >
                  {subscriptionStatus}
                </motion.p>
              )}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-red-400 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-700/50 backdrop-blur-sm pt-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-center md:text-left">
              © {new Date().getFullYear()} CricXify | Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block text-red-500"
              >
                ❤️
              </motion.span>{' '}
              for Cricket Fans
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-300 hover:text-purple-400 transition-all duration-300 relative group"
                    >
                      {item}
                      <span className="absolute left-0 bottom-[-2px] w-0 h-[1px] bg-purple-400 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;