const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini API with environment variables
const apiKey = process.env.GEMINI_API_KEY;

// Validate API key before creating client
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY is not set in environment variables');
}

// Create Gemini client with proper error handling
let genAI;
try {
  genAI = new GoogleGenerativeAI(apiKey);
  console.log('✅ Gemini API client initialized successfully');
} catch (error) {
  console.error('❌ Error initializing Gemini API client:', error);
  genAI = null;
}

// Simple test endpoint to verify route is working
router.get('/gemini-test', (req, res) => {
  res.json({
    status: 'Gemini route working',
    apiKeyConfigured: !!apiKey,
    clientInitialized: !!genAI,
    timestamp: new Date().toISOString()
  });
});

// Main Gemini API endpoint
router.post('/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('🤖 Processing Gemini request with prompt:', prompt);

    // Check if API key is configured
    if (!apiKey) {
      return res.status(401).json({ 
        error: 'Gemini API key not configured',
        details: 'Please add GEMINI_API_KEY to your environment variables'
      });
    }

    // Check if client was initialized
    if (!genAI) {
      return res.status(500).json({
        error: 'Gemini client not initialized',
        details: 'The API client failed to initialize. Check server logs.'
      });
    }

    // Create a safer cricket-specific prompt
    const cricketPrompt = `As a cricket expert, please answer the following question about cricket: ${prompt}`;

    console.log('Creating model instance...');
    
    // Get the generative model with the correct model name (updated to match current API version)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro"  // Updated from "gemini-pro" to the latest model name
    });

    console.log('✅ Model instance created, generating content...');

    // Generate content with safety measures and timeout
    const generateWithTimeout = async () => {
      return new Promise(async (resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Request to Gemini API timed out after 15 seconds'));
        }, 15000);
        
        try {
          const result = await model.generateContent(cricketPrompt);
          clearTimeout(timeout);
          resolve(result);
        } catch (error) {
          clearTimeout(timeout);
          reject(error);
        }
      });
    };

    const result = await generateWithTimeout();
    const response = result.response;
    
    console.log('✅ Gemini response received successfully');
    res.json({ response: response.text() });
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    
    // More detailed error classification
    if (error.message?.includes('not found') || error.message?.includes('models/gemini-pro')) {
      console.error('Model not found error:', error.message);
      res.status(502).json({ 
        error: 'Model not available',
        details: 'The model "gemini-pro" is not found or not supported. Check if you are using the correct model name for the current API version.'
      });
    } else if (error.message?.includes('API key') || error.message?.includes('authentication')) {
      console.error('API Key issue:', error.message);
      res.status(401).json({ 
        error: 'Invalid API key',
        details: 'Your Gemini API key appears to be invalid or expired. Please check your API key.'
      });
    } else if (error.message?.includes('timeout')) {
      console.error('Timeout error:', error.message);
      res.status(504).json({
        error: 'Request timeout',
        details: 'The request to Gemini API timed out. Please try again later.'
      });
    } else if (error.message?.includes('network')) {
      console.error('Network error:', error.message);
      res.status(503).json({ 
        error: 'Network error',
        details: 'Could not connect to Gemini API. Please check your internet connection.'
      });
    } else if (error.message?.includes('content filtered')) {
      console.error('Content filtered:', error.message);
      res.status(406).json({
        error: 'Content filtered',
        details: 'Your query was flagged by Gemini\'s content filters. Please modify your question.'
      });
    } else {
      console.error('Unexpected error:', error.message);
      res.status(500).json({ 
        error: 'Failed to get response from Gemini API',
        details: error.message || 'Unknown error'
      });
    }
  }
});

module.exports = router;
