import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimationControls } from 'framer-motion';
import { FaSun, FaCloud, FaCloudRain, FaLeaf, FaTint, FaRulerCombined, FaMapMarkedAlt, FaHistory } from 'react-icons/fa';

// New component for visualizing pitch metrics
const PitchVisualization = ({ value, color }) => {
  return (
    <div className="h-3 bg-gray-200 rounded-full mb-1 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value * 10}%` }}
        transition={{ duration: 1 }}
        className={`h-3 ${color} rounded-full`} 
      ></motion.div>
    </div>
  );
};

const PitchAnalysis = () => {
  const [pitchParams, setPitchParams] = useState({
    weather: 'sunny', // sunny, cloudy, rainy
    grassCoverage: 50, // percentage
    moisture: 'medium', // low, medium, high
    cracking: 'minimal', // minimal, moderate, extensive
    venue: 'Default Venue', // Added default value to ensure it's not empty
    recentMatches: 2, // number of recent matches played on this pitch
  });

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPitchParams({
      ...pitchParams,
      [name]: value,
    });
  };

  const analyzePitch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Generate analysis based on actual input parameters instead of using fixed mock data
      const analysisResult = generatePitchAnalysis(pitchParams);
      setAnalysis(analysisResult);
      
      // The actual API call is still commented out for now
      /*
      const response = await axios.post('/api/pitch-analysis', pitchParams);
      
      // Format the response data to match what our UI expects
      const formattedAnalysis = {
        pitchType: getPitchType(response.data.analysis),
        favorsBatsmen: Math.round(response.data.analysis.batsmen / 10),
        favorsBowlers: Math.round(response.data.analysis.bowlers / 10),
        spinFriendliness: Math.round(response.data.analysis.spin / 10),
        paceFriendliness: Math.round(response.data.analysis.pace / 10),
        expectedFirstInningsScore: getExpectedScore(response.data.analysis),
        battingStrategy: response.data.analysis.battingStrategy,
        bowlingStrategy: response.data.analysis.bowlingStrategy
      };
      
      setAnalysis(formattedAnalysis);
      */
    } catch (err) {
      console.error('Error analyzing pitch:', err);
      setError('Failed to analyze pitch. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Generate pitch analysis based on the input parameters with cricket-specific knowledge
  const generatePitchAnalysis = (params) => {
    const { weather, grassCoverage, moisture, cracking, recentMatches, venue } = params;
    
    // Starting values (neutral pitch)
    let batsmenScore = 50;
    let bowlersScore = 50;
    let spinScore = 50;
    let paceScore = 50;
    
    // Weather effects - cricket-specific
    if (weather === 'sunny') {
      // Sunny conditions typically make batting easier, cracks develop, aiding spin
      batsmenScore += 15;
      spinScore += 8;
      paceScore -= 5;
    } else if (weather === 'cloudy') {
      // Cloudy conditions help swing bowling, more challenging for batting
      bowlersScore += 12;
      paceScore += 15;
      batsmenScore -= 10;
    } else if (weather === 'rainy') {
      // Wet conditions make the ball skid, unpredictable bounce
      bowlersScore += 20;
      paceScore += 18;
      batsmenScore -= 15;
      spinScore -= 12; // Wet ball is harder to grip for spinners
    }
    
    // Grass coverage effects - cricket-specific pitch preparation
    if (grassCoverage > 75) {
      // Very grassy pitch (like in New Zealand or England)
      bowlersScore += 20;
      paceScore += 25;
      batsmenScore -= 20;
      spinScore -= 15;
    } else if (grassCoverage > 50) {
      // Moderately grassy pitch (typical Australian or South African pitch)
      bowlersScore += 12;
      paceScore += 15;
      batsmenScore -= 10;
      spinScore -= 8;
    } else if (grassCoverage > 25) {
      // Light grass (balanced pitch, typical in many venues)
      bowlersScore += 5;
      paceScore += 5;
      spinScore -= 3;
    } else {
      // Bare pitch (typical subcontinent pitches)
      batsmenScore += 15;
      spinScore += 18;
      paceScore -= 12;
    }
    
    // Moisture effects - cricket-specific
    if (moisture === 'high') {
      // Very moist pitch (e.g., after rain or morning of day 1)
      bowlersScore += 18;
      paceScore += 20;
      batsmenScore -= 18;
      spinScore -= 10; // Hard to grip for spinners
    } else if (moisture === 'medium') {
      // Some moisture (typical morning session)
      bowlersScore += 8;
      paceScore += 10;
      batsmenScore -= 5;
    } else if (moisture === 'low') {
      // Dry pitch (afternoon or subcontinent)
      batsmenScore += 12;
      spinScore += 15;
      paceScore -= 10;
    }
    
    // Cracking effects - cricket-specific pitch degradation
    if (cracking === 'extensive') {
      // Day 4-5 Test match pitch or poorly prepared surface
      spinScore += 25;
      bowlersScore += 15;
      batsmenScore -= 20;
      // Extreme cracks cause unpredictable bounce, tough for batsmen
    } else if (cracking === 'moderate') {
      // Day 3 Test match pitch
      spinScore += 15;
      bowlersScore += 8;
      batsmenScore -= 8;
    } else {
      // Fresh pitch or well-maintained
      // No additional effects
    }
    
    // Recent matches effect - cricket-specific pitch wear
    // More matches = more footmarks, rough patches and worn surface
    const matchImpact = Math.min(recentMatches, 10);
    spinScore += matchImpact * 2.5;
    paceScore -= matchImpact * 1.5;
    batsmenScore -= matchImpact * 1.5;
    
    // Venue-specific adjustments
    // Adding logic for well-known venues in cricket
    if (venue) {
      const venueLower = venue.toLowerCase();
      
      // Subcontinent venues
      if (venueLower.includes('wankhede') || venueLower.includes('mumbai')) {
        // Wankhede Stadium - Good bounce, becomes spin-friendly later
        paceScore += 5;
        spinScore += 5;
      } else if (venueLower.includes('eden') || venueLower.includes('kolkata')) {
        // Eden Gardens - Traditionally helps spinners
        spinScore += 8;
        paceScore -= 3;
      } else if (venueLower.includes('chepauk') || venueLower.includes('chennai')) {
        // Chepauk - Spin heaven
        spinScore += 15;
        paceScore -= 8;
      } else if (venueLower.includes('chinnaswamy') || venueLower.includes('bangalore')) {
        // Chinnaswamy - Batting paradise
        batsmenScore += 10;
      } else if (venueLower.includes('dharamsala')) {
        // Dharamsala - Assists pace due to altitude
        paceScore += 12;
      } else if (venueLower.includes('feroz shah') || venueLower.includes('kotla') || venueLower.includes('delhi')) {
        // Feroz Shah Kotla - Low and slow
        spinScore += 10;
        paceScore -= 8;
      }
      
      // Australian venues
      else if (venueLower.includes('gabba') || venueLower.includes('brisbane')) {
        // Gabba - Pace and bounce
        paceScore += 15;
        spinScore -= 10;
      } else if (venueLower.includes('adelaide')) {
        // Adelaide - Good batting pitch, helps spin later
        batsmenScore += 5;
        spinScore += 5;
      } else if (venueLower.includes('mcg') || venueLower.includes('melbourne')) {
        // MCG - Varies but good for pace
        paceScore += 8;
      } else if (venueLower.includes('scg') || venueLower.includes('sydney')) {
        // SCG - Traditionally spin-friendly
        spinScore += 10;
      } else if (venueLower.includes('waca') || venueLower.includes('perth')) {
        // WACA/Perth Stadium - Fast and bouncy
        paceScore += 20;
        spinScore -= 15;
      }
      
      // English venues
      else if (venueLower.includes('lord') || venueLower.includes('lords')) {
        // Lord's - Helps swing bowling
        paceScore += 12;
      } else if (venueLower.includes('oval')) {
        // The Oval - Tends to be good for batting, then spin
        batsmenScore += 8;
        spinScore += 5;
      } else if (venueLower.includes('trent bridge') || venueLower.includes('nottingham')) {
        // Trent Bridge - Swing paradise
        paceScore += 15;
        batsmenScore -= 10;
      } else if (venueLower.includes('old trafford') || venueLower.includes('manchester')) {
        // Old Trafford - Bounce and spin
        paceScore += 8;
        spinScore += 8;
      }
      
      // Other notable venues
      else if (venueLower.includes('wanderers') || venueLower.includes('johannesburg')) {
        // Wanderers - Pace and bounce
        paceScore += 15;
        spinScore -= 10;
      } else if (venueLower.includes('newlands') || venueLower.includes('cape town')) {
        // Newlands - Good for pace, especially with cloud cover
        paceScore += 10;
      } else if (venueLower.includes('kensington') || venueLower.includes('barbados')) {
        // Kensington Oval - Traditionally quick
        paceScore += 12;
      } else if (venueLower.includes('galle')) {
        // Galle - Extreme spin
        spinScore += 20;
        paceScore -= 15;
      }
    }
    
    // Ensure scores are within 0-100 range
    batsmenScore = Math.min(100, Math.max(0, batsmenScore));
    bowlersScore = Math.min(100, Math.max(0, bowlersScore));
    spinScore = Math.min(100, Math.max(0, spinScore));
    paceScore = Math.min(100, Math.max(0, paceScore));
    
    // Determine overall pitch character
    let pitchType = determinePitchType(batsmenScore, bowlersScore, spinScore, paceScore, grassCoverage, moisture, cracking);
    
    // Calculate expected first innings score based on pitch conditions
    let expectedScore = calculateExpectedScore(batsmenScore, bowlersScore, spinScore, paceScore, venue);
    
    // Determine specific batting strategy based on pitch analysis
    let battingStrategy = determineBattingStrategy(batsmenScore, bowlersScore, spinScore, paceScore, pitchType);
    
    // Determine specific bowling strategy based on pitch analysis
    let bowlingStrategy = determineBowlingStrategy(spinScore, paceScore, pitchType);
    
    // Format the analysis results for the UI
    return {
      pitchType,
      favorsBatsmen: Math.round(batsmenScore / 10),
      favorsBowlers: Math.round(bowlersScore / 10),
      spinFriendliness: Math.round(spinScore / 10),
      paceFriendliness: Math.round(paceScore / 10),
      expectedFirstInningsScore: expectedScore,
      battingStrategy,
      bowlingStrategy
    };
  };
  
  // Determine pitch type using cricket-specific knowledge
  const determinePitchType = (batsmenScore, bowlersScore, spinScore, paceScore, grassCoverage, moisture, cracking) => {
    // Green seamer - high grass, moisture, helps pace
    if (grassCoverage > 70 && paceScore > 65 && batsmenScore < 40) {
      return "Green Seamer";
    }
    
    // Rank turner - lots of cracks, helps spin significantly
    if (cracking === 'extensive' && spinScore > 70 && batsmenScore < 45) {
      return "Rank Turner";
    }
    
    // Dustbowl - very dry, cracked pitch common in subcontinent
    if (moisture === 'low' && cracking !== 'minimal' && spinScore > 75) {
      return "Dustbowl";
    }
    
    // Flat road - batting paradise
    if (batsmenScore > 70 && bowlersScore < 40) {
      return "Flat Road (Batting Paradise)";
    }
    
    // Balanced pitch with some assistance to pace
    if (paceScore > spinScore && paceScore > 60 && paceScore < 75) {
      return "Pace-friendly Balanced Pitch";
    }
    
    // Balanced pitch with some assistance to spin
    if (spinScore > paceScore && spinScore > 60 && spinScore < 75) {
      return "Spin-friendly Balanced Pitch";
    }
    
    // Balanced with slight advantage to bowlers
    if (bowlersScore > batsmenScore && bowlersScore < 65) {
      return "Slightly Bowler-friendly Pitch";
    }
    
    // Balanced with slight advantage to batsmen
    if (batsmenScore > bowlersScore && batsmenScore < 65) {
      return "Slightly Batting-friendly Pitch";
    }
    
    // Minefield - very difficult for batting
    if (bowlersScore > 75 && batsmenScore < 30) {
      return "Minefield (Very Difficult for Batting)";
    }
    
    // True pitch - evenly balanced for all
    if (Math.abs(batsmenScore - bowlersScore) < 10 && Math.abs(spinScore - paceScore) < 10) {
      return "True Pitch (Perfectly Balanced)";
    }
    
    // Default balanced pitch
    return "Standard Balanced Pitch";
  };
  
  // Calculate expected first innings score using cricket-specific knowledge
  const calculateExpectedScore = (batsmenScore, bowlersScore, spinScore, paceScore, venue) => {
    // Base score calibration
    // 250-300 is considered an average score in most conditions
    let baseScore = 275;
    
    // Adjust based on batsmen vs bowlers advantage
    // Each 10 points difference = approximately 25 runs
    const bowlingImpact = (bowlersScore - 50) * 2.5;
    const battingImpact = (batsmenScore - 50) * 2.5;
    let adjustedScore = baseScore + battingImpact - bowlingImpact;
    
    // Venue-specific adjustments
    if (venue) {
      const venueLower = venue.toLowerCase();
      
      // High-scoring venues
      if (
        venueLower.includes('chinnaswamy') || 
        venueLower.includes('bangalore') ||
        venueLower.includes('wankhede') ||
        venueLower.includes('mumbai') ||
        venueLower.includes('bellerive') ||
        venueLower.includes('hobart') ||
        venueLower.includes('adelaide')
      ) {
        adjustedScore += 20;
      }
      
      // Low-scoring venues
      else if (
        venueLower.includes('eden park') ||
        venueLower.includes('auckland') ||
        venueLower.includes('dharamsala') ||
        venueLower.includes('southampton') ||
        venueLower.includes('hamilton')
      ) {
        adjustedScore -= 20;
      }
    }
    
    // Ensure the score is reasonable (150-450 range for most conditions)
    adjustedScore = Math.max(150, Math.min(450, adjustedScore));
    
    // Format as a range with ~30-40 run spread to reflect uncertainty
    const variance = 20;
    const lowerBound = Math.round(adjustedScore - variance);
    const upperBound = Math.round(adjustedScore + variance);
    
    return `${lowerBound}-${upperBound}`;
  };
  
  // Determine batting strategy based on pitch conditions
  const determineBattingStrategy = (batsmenScore, bowlersScore, spinScore, paceScore, pitchType) => {
    // Batting paradise
    if (batsmenScore > 70) {
      return "Play positively from the start. Look to dominate the bowling and set up a big total. Good pitch to play your shots freely.";
    }
    
    // Extreme spin conditions
    if (spinScore > 75 && spinScore > paceScore + 20) {
      return "Use your feet to get to the pitch of the ball. Sweep shots are crucial. Avoid playing with hard hands. Look to build partnerships and rotate strike.";
    }
    
    // Extreme pace conditions
    if (paceScore > 75 && paceScore > spinScore + 20) {
      return "Watch the ball carefully and play late. Avoid driving on the up early in your innings. Be prepared for short-pitched bowling and variable bounce.";
    }
    
    // Very challenging pitch
    if (bowlersScore > 70) {
      return "Survival mode is key. Grit and determination required. Focus on batting time rather than scoring rate. Every run is valuable.";
    }
    
    // Green seamer
    if (pitchType === "Green Seamer") {
      return "Play defensively in the first hour. Leave balls outside off stump. Wait for loose deliveries. Be patient as conditions will improve as the ball gets older.";
    }
    
    // Rank turner
    if (pitchType === "Rank Turner" || pitchType === "Dustbowl") {
      return "Be positive against spin. Use your feet and sweep shots. Don't let spinners settle. Try to disrupt their rhythm with calculated aggression.";
    }
    
    // Balanced with pace assistance
    if (pitchType === "Pace-friendly Balanced Pitch") {
      return "Respect good balls, punish the bad ones. Build your innings gradually. The pitch should get better for batting as the game progresses.";
    }
    
    // Balanced with spin assistance
    if (pitchType === "Spin-friendly Balanced Pitch") {
      return "Start positively while the ball is new. Be prepared for increasing spin as the game progresses. Use the crease well against spinners.";
    }
    
    // Default balanced strategy
    return "Play normal cricket. Assess conditions as you bat. Build partnerships and look to capitalize after getting set.";
  };
  
  // Determine bowling strategy based on pitch conditions
  const determineBowlingStrategy = (spinScore, paceScore, pitchType) => {
    // Extreme spin conditions
    if (spinScore > 75 && spinScore > paceScore + 20) {
      return "Attack with multiple spin options. Set aggressive fields with close catchers. Pace bowlers should focus on reverse swing with the older ball.";
    }
    
    // Extreme pace conditions
    if (paceScore > 75 && paceScore > spinScore + 20) {
      return "Aggressive pace bowling with attacking lines. Use the short ball tactically. Set fields for edges. Spinners play a holding role.";
    }
    
    // Green seamer
    if (pitchType === "Green Seamer") {
      return "Attack with pace bowlers. Bowl fuller lengths to exploit movement. Set fields for edges to slips and gully. Minimal role for spinners.";
    }
    
    // Rank turner
    if (pitchType === "Rank Turner" || pitchType === "Dustbowl") {
      return "Lead with quality spin bowling. Attack with close fielders. Pace bowlers should look for reverse swing and bowl cutters. Rotate your spinners from both ends.";
    }
    
    // Balanced with pace assistance
    if (pitchType === "Pace-friendly Balanced Pitch") {
      return "Start with your best pace bowlers. Mix lengths but focus on good line and length. Spinners should look to contain initially, then attack as the pitch wears.";
    }
    
    // Balanced with spin assistance
    if (pitchType === "Spin-friendly Balanced Pitch") {
      return "Use pace with the new ball, then switch to spin as the ball gets older. Keep close catchers for spinners. Patience is key - build pressure and wait for mistakes.";
    }
    
    // Flat batting track
    if (pitchType.includes("Batting Paradise") || pitchType.includes("Flat Road")) {
      return "Disciplined bowling required. Focus on containment rather than wicket-taking. Change pace and use variations. Set defensive fields and build pressure through dot balls.";
    }
    
    // Default balanced strategy
    return "Balanced attack with both pace and spin. Bowl to your fields and be patient. Build pressure through consistent bowling.";
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-gradient-to-b from-purple-50 to-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-6">
          <h2 className="text-3xl font-bold">🏏 Cricket Pitch Analysis</h2>
          <p className="text-purple-100 mt-2">Analyze pitch conditions and get strategic insights for your game</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-purple-800">Pitch Parameters</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FaSun className="text-yellow-500" />
                    Weather Conditions
                  </label>
                  <select
                    name="weather"
                    value={pitchParams.weather}
                    onChange={handleInputChange}
                    className="block w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  >
                    <option value="sunny">Sunny</option>
                    <option value="cloudy">Cloudy</option>
                    <option value="rainy">Rainy/Overcast</option>
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FaLeaf className="text-green-500" />
                    Grass Coverage
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      name="grassCoverage"
                      min="0"
                      max="100"
                      value={pitchParams.grassCoverage}
                      onChange={handleInputChange}
                      className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-bold">
                      {pitchParams.grassCoverage}%
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FaTint className="text-blue-500" />
                    Moisture Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['low', 'medium', 'high'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setPitchParams({...pitchParams, moisture: level})}
                        className={`py-2 px-4 rounded-lg border-2 capitalize ${
                          pitchParams.moisture === level
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                        } transition-all duration-200`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FaRulerCombined className="text-orange-500" />
                    Surface Cracking
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['minimal', 'moderate', 'extensive'].map((crack) => (
                      <button
                        key={crack}
                        type="button"
                        onClick={() => setPitchParams({...pitchParams, cracking: crack})}
                        className={`py-2 px-4 rounded-lg border-2 capitalize ${
                          pitchParams.cracking === crack
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                        } transition-all duration-200`}
                      >
                        {crack}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FaMapMarkedAlt className="text-red-500" />
                    Venue (Optional)
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={pitchParams.venue}
                    onChange={handleInputChange}
                    placeholder="e.g., Mumbai, Wankhede Stadium"
                    className="block w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FaHistory className="text-indigo-500" />
                    Recent Matches Played
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      name="recentMatches"
                      min="0"
                      max="10"
                      value={pitchParams.recentMatches}
                      onChange={handleInputChange}
                      className="block w-full p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    />
                    <div className="text-gray-500 text-sm">
                      (0-10)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={analyzePitch}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg disabled:opacity-50 transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                'Analyze Pitch'
              )}
            </motion.button>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200"
              >
                {error}
              </motion.div>
            )}
          </motion.div>
          
          {analysis ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-xl border-2 border-purple-100 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-5 text-purple-800 pb-2 border-b-2 border-purple-100">Pitch Analysis Results</h3>
              
              <div className="space-y-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-medium text-purple-800 mb-2">Pitch Type:</p>
                  <p className="text-lg font-semibold">{analysis.pitchType}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-medium text-green-800 mb-2">Favors Batsmen:</p>
                    <PitchVisualization value={analysis.favorsBatsmen} color="bg-green-500" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">0</span>
                      <span className="font-bold text-green-700">{analysis.favorsBatsmen}/10</span>
                      <span className="text-gray-500">10</span>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="font-medium text-red-800 mb-2">Favors Bowlers:</p>
                    <PitchVisualization value={analysis.favorsBowlers} color="bg-red-500" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">0</span>
                      <span className="font-bold text-red-700">{analysis.favorsBowlers}/10</span>
                      <span className="text-gray-500">10</span>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-medium text-purple-800 mb-2">Spin Friendly:</p>
                    <PitchVisualization value={analysis.spinFriendliness} color="bg-purple-500" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">0</span>
                      <span className="font-bold text-purple-700">{analysis.spinFriendliness}/10</span>
                      <span className="text-gray-500">10</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-medium text-blue-800 mb-2">Pace Friendly:</p>
                    <PitchVisualization value={analysis.paceFriendliness} color="bg-blue-500" />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">0</span>
                      <span className="font-bold text-blue-700">{analysis.paceFriendliness}/10</span>
                      <span className="text-gray-500">10</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="font-medium text-yellow-800 mb-2">Expected First Innings Score:</p>
                  <p className="text-xl font-bold text-yellow-700">{analysis.expectedFirstInningsScore}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="font-medium text-indigo-800 mb-2">Recommended Batting Strategy:</p>
                    <p className="text-gray-800">{analysis.battingStrategy}</p>
                  </div>
                  
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <p className="font-medium text-emerald-800 mb-2">Recommended Bowling Strategy:</p>
                    <p className="text-gray-800">{analysis.bowlingStrategy}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center bg-gray-50 p-8 rounded-xl border-2 border-dashed border-gray-200"
            >
              <img 
                src="/cricket-pitch.svg" 
                alt="Cricket Pitch" 
                className="w-48 h-48 mb-6 opacity-30"
                onError={(e) => {e.target.style.display = 'none'}}
              />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No Analysis Yet</h3>
              <p className="text-gray-400 text-center">
                Set your pitch parameters and click "Analyze Pitch" to get a detailed pitch analysis.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PitchAnalysis;