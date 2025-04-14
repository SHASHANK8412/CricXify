require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes"); // Import authRoutes

const app = express();
app.use(cors());
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Check if MONGO_URI is available
if (!MONGO_URI) {
    console.error("Error: MONGO_URI is missing in .env file!");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        console.log("⚠️ Starting server without database connection. Some features may not work.");
        // Continue running the server despite MongoDB connection failure
    });

// Mount authRoutes
app.use("/api", authRoutes); // Use authRoutes for /api routes

// Default route for testing
app.get("/", (req, res) => {
    res.send("✅ Server is running...");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});