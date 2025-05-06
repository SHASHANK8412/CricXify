import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const GeminiChat = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const textareaRef = useRef(null);
  const MAX_RETRIES = 3;
  const API_URL = 'http://localhost:5176/api/gemini';

  // Auto-resize textarea as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  // Check if server is up on component mount and test Gemini API
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        await axios.get('http://localhost:5176/health');
        console.log('✅ Server connection successful');
        
        // Also check Gemini API test endpoint
        try {
          const testResponse = await axios.get('http://localhost:5176/api/gemini-test');
          console.log('✅ Gemini route test successful:', testResponse.data);
          
          if (!testResponse.data.apiKeyConfigured) {
            setError('Warning: Gemini API key not configured on the server.');
          }
        } catch (testErr) {
          console.warn('⚠️ Gemini test route check failed:', testErr.message);
        }
      } catch (err) {
        console.warn('⚠️ Server connection check failed:', err.message);
        setError('Cannot connect to the server. Please make sure the backend server is running.');
      }
    };
    
    checkServerConnection();
  }, []);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    const currentQuery = query;
    
    try {
      console.log('🚀 Sending request to Gemini API...');
      
      // Make API request with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout
      
      const result = await axios.post(API_URL, {
        prompt: currentQuery
      }, { 
        signal: controller.signal,
        timeout: 30000 // Also set axios timeout
      });
      
      clearTimeout(timeoutId);
      
      if (result?.data?.response) {
        console.log('✅ Gemini response received successfully');
        setResponse(result.data.response);
        setRetryCount(0); // Reset retry count on success
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error('❌ Gemini API Error:', err);
      
      let errorMessage;
      
      // Specific handling for 502 Bad Gateway errors
      if (err.response?.status === 502) {
        errorMessage = 'The Gemini AI service is currently unavailable. This might be due to:';
        errorMessage += '\n• Invalid API key';
        errorMessage += '\n• Google Gemini service disruption';
        errorMessage += '\n• Server configuration issues';
        
        if (err.response?.data?.details) {
          errorMessage += `\n\nDetails: ${err.response.data.details}`;
        }
      } else if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        errorMessage = 'Cannot connect to server. Please make sure the server is running.';
      } else if (err.name === 'AbortError' || err.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Server might be overloaded or Gemini API is slow to respond.';
      } else if (err.response?.status === 401) {
        errorMessage = 'API key configuration issue. Please check server configuration.';
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
        if (err.response.data.details) {
          errorMessage += `: ${err.response.data.details}`;
        }
      } else {
        errorMessage = 'Failed to get response from Gemini. Please try again.';
      }
      
      setError(errorMessage);
      setRetryCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (retryCount < MAX_RETRIES) {
      handleSubmit();
    }
  };

  // Try to provide a friendlier cricket-related suggestion
  const getSampleQuestion = () => {
    const questions = [
      "Who is the highest run-scorer in international cricket?",
      "Explain the Duckworth-Lewis method in cricket.",
      "Who are the top 3 bowlers in Test cricket right now?",
      "What's the difference between Test, ODI, and T20 cricket formats?",
      "Which team has won the most Cricket World Cups?"
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  };

  const handleSampleQuestion = () => {
    setQuery(getSampleQuestion());
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-6"
        >
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            🤖 Ask Gemini About Cricket
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                ref={textareaRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything about cricket stats, players, matches, rules, or history..."
                className="w-full min-h-32 p-4 text-gray-900 bg-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                required
              />
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={handleSampleQuestion}
                  className="text-xs text-purple-300 hover:text-purple-100"
                >
                  Try a sample question
                </button>
              </div>
            </div>
            
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading || !query.trim()}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                    <span>Thinking...</span>
                  </div>
                ) : (
                  'Ask Gemini'
                )}
              </motion.button>
            </div>
          </form>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
              >
                <div className="flex flex-col">
                  <span className="whitespace-pre-wrap">{error}</span>
                  <div className="flex justify-between items-center mt-3">
                    {error.includes('API key') && (
                      <span className="text-xs opacity-80">
                        The server needs a valid Google Gemini API key to work.
                      </span>
                    )}
                    {retryCount < MAX_RETRIES && (
                      <button 
                        onClick={handleRetry}
                        className="ml-auto text-sm text-white bg-red-500/40 hover:bg-red-500/60 px-3 py-1 rounded-md transition-colors"
                      >
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {response && !error && (
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-6 bg-white/5 rounded-lg"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Response:</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{response}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-8 text-center text-xs text-gray-400">
            Powered by Google Gemini AI • Cricket data may not include most recent matches
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GeminiChat;
