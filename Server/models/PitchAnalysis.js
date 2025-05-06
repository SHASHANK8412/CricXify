const mongoose = require('mongoose');

const pitchAnalysisSchema = new mongoose.Schema({
  weather: {
    type: String,
    enum: ['sunny', 'cloudy', 'rainy'],
    required: true
  },
  grassCoverage: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  moisture: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  cracking: {
    type: String,
    enum: ['minimal', 'moderate', 'extensive'],
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  recentMatches: {
    type: Number,
    default: 0
  },
  analysis: {
    batsmen: Number,
    bowlers: Number,
    spin: Number,
    pace: Number,
    battingStrategy: String,
    bowlingStrategy: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PitchAnalysis', pitchAnalysisSchema);