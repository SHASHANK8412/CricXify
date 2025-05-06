const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get news from official sources like BBC and CNN
router.get('/official', async (req, res) => {
  try {
    // Using NewsAPI to fetch cricket news from BBC and CNN
    // You'll need to sign up for a free API key at https://newsapi.org/
    const API_KEY = process.env.NEWS_API_KEY || 'YOUR_NEWS_API_KEY';
    
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'cricket AND (match OR tournament OR IPL OR "World Cup" OR T20 OR "Test match")',
        sources: 'bbc-news,cnn,espn-cric-info',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
        apiKey: API_KEY
      }
    });

    // Format the news data
    const formattedNews = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      source: article.source.name
    }));

    // Additional filter to ensure only cricket-related news
    const cricketNews = formattedNews.filter(article => {
      const content = (article.title + ' ' + article.description).toLowerCase();
      return content.includes('cricket') || 
             content.includes('ipl') || 
             content.includes('t20') || 
             content.includes('test match') ||
             content.includes('odi');
    });

    res.json(cricketNews);
  } catch (error) {
    console.error('Error fetching official news:', error.message);
    res.status(500).json({ 
      message: 'Failed to fetch news from official sources',
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;