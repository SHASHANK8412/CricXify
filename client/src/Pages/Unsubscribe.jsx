import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Unsubscribe = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Extract email from URL query params if present
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');
    setStatus('');

    try {
      // Updated to use the Vite proxy instead of direct API_BASE_URL
      const response = await fetch('/api/subscribe/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to unsubscribe');
      }

      setStatus('You have been successfully unsubscribed from our newsletter.');
      setEmail('');
    } catch (err) {
      console.error('Unsubscribe error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-purple-900 min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/70 backdrop-blur-lg p-8 rounded-xl shadow-2xl max-w-md w-full border border-gray-700/50"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white text-center mb-2">Unsubscribe</h1>
          <p className="text-gray-300 text-center mb-6">
            We're sorry to see you go. Please confirm your email address to unsubscribe from our newsletter.
          </p>

          {status ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-500/20 border border-green-500/30 text-green-400 p-4 rounded-lg mb-6 text-center"
            >
              <i className="fas fa-check-circle mr-2"></i>
              {status}
            </motion.div>
          ) : (
            <form onSubmit={handleUnsubscribe} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                    required
                  />
                  <i className="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-lg"
                >
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
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
                    <span>Unsubscribe</span>
                    <i className="fas fa-paper-plane"></i>
                  </>
                )}
              </motion.button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Changed your mind?{' '}
              <a href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                Return to Homepage
              </a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Unsubscribe;