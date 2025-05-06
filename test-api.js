const axios = require('axios');

async function testApi() {
  const API_BASE_URL = "http://localhost:5174";
  
  try {
    console.log('Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('Health status:', healthResponse.data);
    
    // Try to register a user
    console.log('\nTesting registration...');
    try {
      const registerResponse = await axios.post(`${API_BASE_URL}/api/register`, {
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });
      console.log('Registration successful:', registerResponse.data);
    } catch (error) {
      console.log('Registration error (might be because user already exists):', error.response?.data || error.message);
    }
    
    // Try to login
    console.log('\nTesting login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/api/login`, {
      email: "test@example.com",
      password: "password123"
    });
    console.log('Login successful:', loginResponse.data);
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testApi(); 