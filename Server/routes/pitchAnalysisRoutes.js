const express = require('express');
const router = express.Router();
const PitchAnalysis = require('../models/PitchAnalysis');
const authMiddleware = require('../middleware/authMiddleware');

// Get all pitch analyses
router.get('/', async (req, res) => {
  try {
    const analyses = await PitchAnalysis.find({}).sort({ createdAt: -1 });
    res.json(analyses);
  } catch (error) {
    console.error('Error fetching pitch analyses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get pitch analysis by ID
router.get('/:id', async (req, res) => {
  try {
    const analysis = await PitchAnalysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ message: 'Pitch analysis not found' });
    }
    res.json(analysis);
  } catch (error) {
    console.error('Error fetching pitch analysis:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new pitch analysis
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { 
      weather, 
      grassCoverage, 
      moisture, 
      cracking, 
      venue, 
      recentMatches 
    } = req.body;

    // Basic validation
    if (!weather || !grassCoverage || !moisture || !cracking || !venue) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Run analysis algorithm
    const analysis = calculatePitchAnalysis(req.body);

    const newAnalysis = new PitchAnalysis({
      weather,
      grassCoverage,
      moisture,
      cracking,
      venue,
      recentMatches: recentMatches || 0,
      analysis
    });

    const savedAnalysis = await newAnalysis.save();
    res.status(201).json(savedAnalysis);
  } catch (error) {
    console.error('Error creating pitch analysis:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a pitch analysis
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const analysis = await PitchAnalysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ message: 'Pitch analysis not found' });
    }

    const { 
      weather, 
      grassCoverage, 
      moisture, 
      cracking, 
      venue, 
      recentMatches 
    } = req.body;

    // Run analysis algorithm
    const updatedAnalysis = calculatePitchAnalysis(req.body);

    // Update fields
    analysis.weather = weather || analysis.weather;
    analysis.grassCoverage = grassCoverage || analysis.grassCoverage;
    analysis.moisture = moisture || analysis.moisture;
    analysis.cracking = cracking || analysis.cracking;
    analysis.venue = venue || analysis.venue;
    analysis.recentMatches = recentMatches || analysis.recentMatches;
    analysis.analysis = updatedAnalysis;

    const savedAnalysis = await analysis.save();
    res.json(savedAnalysis);
  } catch (error) {
    console.error('Error updating pitch analysis:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a pitch analysis
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const analysis = await PitchAnalysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ message: 'Pitch analysis not found' });
    }
    await analysis.remove();
    res.json({ message: 'Pitch analysis deleted' });
  } catch (error) {
    console.error('Error deleting pitch analysis:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to calculate pitch analysis based on input parameters
function calculatePitchAnalysis(data) {
  const { weather, grassCoverage, moisture, cracking } = data;
  
  // Calculate scores (0-100) for different types of players
  let batsmenScore = 50; // neutral starting point
  let bowlersScore = 50;
  let spinScore = 50;
  let paceScore = 50;
  
  // Weather effects
  if (weather === 'sunny') {
    batsmenScore += 10;
    spinScore += 5;
    paceScore -= 5;
  } else if (weather === 'cloudy') {
    bowlersScore += 10;
    paceScore += 10;
    batsmenScore -= 5;
  } else if (weather === 'rainy') {
    bowlersScore += 15;
    paceScore += 15;
    batsmenScore -= 10;
    spinScore -= 10;
  }
  
  // Grass coverage effects (0-100%)
  if (grassCoverage > 70) {
    bowlersScore += 15;
    paceScore += 15;
    batsmenScore -= 15;
    spinScore -= 10;
  } else if (grassCoverage > 30) {
    bowlersScore += 5;
    paceScore += 5;
  } else {
    batsmenScore += 10;
    spinScore += 10;
    paceScore -= 5;
  }
  
  // Moisture effects
  if (moisture === 'high') {
    bowlersScore += 15;
    paceScore += 15;
    batsmenScore -= 15;
    spinScore -= 5;
  } else if (moisture === 'medium') {
    bowlersScore += 5;
    paceScore += 5;
    batsmenScore -= 5;
  } else if (moisture === 'low') {
    batsmenScore += 10;
    spinScore += 10;
    paceScore -= 5;
  }
  
  // Cracking effects
  if (cracking === 'extensive') {
    spinScore += 20;
    bowlersScore += 10;
    batsmenScore -= 15;
  } else if (cracking === 'moderate') {
    spinScore += 10;
    bowlersScore += 5;
    batsmenScore -= 5;
  }
  
  // Determine strategies based on scores
  let battingStrategy = 'Balanced approach';
  let bowlingStrategy = 'Mixed bowling attack';
  
  if (batsmenScore > 60) {
    battingStrategy = 'Aggressive batting favorable';
  } else if (batsmenScore < 40) {
    battingStrategy = 'Defensive batting recommended';
  }
  
  if (spinScore > paceScore + 15) {
    bowlingStrategy = 'Spin dominant attack recommended';
  } else if (paceScore > spinScore + 15) {
    bowlingStrategy = 'Pace dominant attack recommended';
  }
  
  // Ensure scores are within 0-100 range
  batsmenScore = Math.min(100, Math.max(0, batsmenScore));
  bowlersScore = Math.min(100, Math.max(0, bowlersScore));
  spinScore = Math.min(100, Math.max(0, spinScore));
  paceScore = Math.min(100, Math.max(0, paceScore));
  
  return {
    batsmen: batsmenScore,
    bowlers: bowlersScore,
    spin: spinScore,
    pace: paceScore,
    battingStrategy,
    bowlingStrategy
  };
}

module.exports = router;