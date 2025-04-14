import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import LiveScores from './components/LiveScores.jsx';
import Navbar from './components/Navbar.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

const App = () => {
  return (
    <>
      <Navbar />
      {/* Main content area below the fixed Navbar */}
      <main className="pt-20 px-4 sm:px-6 md:px-10 lg:px-20">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/live-scores" element={<LiveScores />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </>
  );
};

export default App;
