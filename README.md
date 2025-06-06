# Cricxify 🏏

## A Comprehensive Cricket Information and Analysis Platform

![Cricxify Banner](./client/public/Stadium.jpg)

## Overview

Cricxify is a feature-rich cricket information platform that provides real-time match updates, player statistics, venue information, and advanced cricket pitch analysis. The application combines cricket domain knowledge with modern web technologies to deliver an immersive experience for cricket enthusiasts.

## Features

### 🏆 Live Scores
- Real-time match updates
- Detailed scorecard with batting and bowling statistics
- Recent overs and match progression details

### 👤 Player Profiles
- Comprehensive player statistics
- Performance analytics
- Career highlights

### 📅 Upcoming Series
- Schedule for upcoming cricket tournaments and series
- Match details including venues and timings

### 🏟️ Venue Information
- Detailed information about cricket stadiums worldwide
- Historical match data at each venue
- Stadium images and specifications

### 📊 Pitch Analysis
- Advanced cricket pitch analytics
- Weather, grass coverage, and moisture level impact assessment
- Detailed batting and bowling strategies based on pitch conditions
- Expected first innings scores and pitch behavior predictions

### 🤖 Ask Gemini
- AI-powered cricket knowledge assistant
- Answers to cricket questions, trivia, and analysis
- Historical cricket data access

### 📰 News Updates
- Latest cricket news and highlights
- Player interviews and expert opinions

### 🔐 User Authentication
- Secure login and registration
- Password recovery system
- Remember me functionality

## Technology Stack

### Frontend
- React with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB for database
- JWT for authentication
- Google Gemini API integration

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB connection
- Google Gemini API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/Cricxify.git
cd Cricxify
```

2. Install server dependencies
```bash
cd Server
npm install
```

3. Set up environment variables
   - Create a `.env` file in the Server directory based on `.env.example`
   - Add your MongoDB connection string, JWT secret, and Gemini API key

4. Install client dependencies
```bash
cd ../client
npm install
```

5. Start the server
```bash
cd ../Server
npm start
```

6. Start the client
```bash
cd ../client
npm run dev
```

7. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   └── src/                # React source files
│       ├── components/     # Reusable UI components
│       ├── Pages/          # Page components
│       ├── Styles/         # CSS styles
│       └── lib/            # Utility functions
└── Server/                 # Backend Node.js application
    ├── Config/             # Server configuration
    ├── middleware/         # Express middleware
    ├── models/             # Mongoose models
    └── routes/             # API routes
```

## Screenshots

![Live Scores](https://placeholder-image-url.com/livescores.jpg)
![Pitch Analysis](https://placeholder-image-url.com/pitch-analysis.jpg)
![Player Stats](https://placeholder-image-url.com/player-stats.jpg)

## Future Enhancements

- Mobile application with React Native
- Advanced player comparison tool
- Fantasy cricket integration
- Live match commentary
- Enhanced statistical visualizations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Cricket data providers
- Google Gemini API for AI capabilities
- Open-source libraries and frameworks used in this project
