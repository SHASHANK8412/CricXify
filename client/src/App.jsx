import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './Pages/Homepage.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import Unsubscribe from './Pages/Unsubscribe.jsx';

import LiveScores from './components/Livescores.jsx'; // Fixed casing to match actual filename
import UpcomingSeries from './components/UpcomingSeries.jsx';
import Teams from './components/Teams.jsx';
import Players from './components/Players.jsx';
import Venue from './components/Venue.jsx';
import GeminiChat from './components/GeminiChat.jsx';
import PitchAnalysis from './components/PitchAnalysis.jsx'; // Added PitchAnalysis import
import Navbar from './components/Navbar.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full pt-16"> {/* Added pt-16 for navbar spacing */}
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/live-scores" element={<LiveScores />} />
            <Route path="/upcoming-series" element={<UpcomingSeries />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/player-stats" element={<Players />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/pitch-analysis" element={<PitchAnalysis />} />
            <Route path="/ask-gemini" element={<GeminiChat />} />
            <Route path="*" element={<h1 className="text-center text-red-500 text-2xl">404 - Page Not Found</h1>} />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default App;
