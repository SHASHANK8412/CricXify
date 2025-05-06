import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsUpdates = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const options = {
        method: 'GET',
        url: 'https://cricket-live-line1.p.rapidapi.com/news',
        headers: {
          'x-rapidapi-key': 'a8884e0446msh7015860cef5f240p1dea39jsnb65a6d13972a',
          'x-rapidapi-host': 'cricket-live-line1.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setNews(response.data || []);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 429) {
          setError('Rate limit exceeded. Please wait and try again.');
        } else {
          setError('Failed to fetch news. Please try again later.');
        }
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">📢 Cricket News Updates</h2>

      {error && <p className="text-red-500">{error}</p>}
      {!error && news.length === 0 && <p>Loading news...</p>}

      <ul className="space-y-4">
        {news.map((item, index) => (
          <li key={index} className="border-b pb-2">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
            {item.source && (
              <p className="text-sm text-gray-500 mt-1">Source: {item.source}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsUpdates;
