require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const geminiRoutes = require("./routes/GeminiRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const connectDB = require("./Config/db");

const app = express();

// Security middleware - removed CSP that might block API requests
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
});

app.use(limiter);

// Simple CORS configuration to allow all origins during development
app.use(cors());

// Increased payload limit for Gemini responses
app.use(express.json({ limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Log available environment variables for debugging
console.log('Environment variables check:');
console.log('- MONGO_URI configured:', !!process.env.MONGO_URI);
console.log('- JWT_SECRET configured:', !!process.env.JWT_SECRET);
console.log('- GEMINI_API_KEY configured:', !!process.env.GEMINI_API_KEY);
console.log('- EMAIL_USER configured:', !!process.env.EMAIL_USER);
console.log('- EMAIL_PASSWORD configured:', !!process.env.EMAIL_PASSWORD);

// Validate environment variables but don't crash server
const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'GEMINI_API_KEY'];
const optionalEnvVars = ['EMAIL_USER', 'EMAIL_PASSWORD']; // Made email vars optional
const missingRequiredVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
const missingOptionalVars = optionalEnvVars.filter(envVar => !process.env[envVar]);

if (missingRequiredVars.length > 0) {
    console.warn("⚠️ Missing required environment variables:", missingRequiredVars.join(", "));
    console.warn("⚠️ Some features may not work properly without these variables.");
}

if (missingOptionalVars.length > 0) {
    console.warn("⚠️ Missing optional environment variables:", missingOptionalVars.join(", "));
    console.warn("⚠️ Email notifications will be disabled.");
}

// Use fallback values if EMAIL variables aren't set to prevent app from crashing
if (!process.env.EMAIL_USER) {
    process.env.EMAIL_ENABLED = 'false';
    console.log("⚠️ Email sending disabled due to missing credentials");
} else {
    process.env.EMAIL_ENABLED = 'true';
    console.log("✅ Email functionality enabled");
}

const PORT = process.env.PORT || 5176;

// Database connection with retry mechanism
const connectWithRetry = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await connectDB();
            console.log("✅ MongoDB Connected Successfully!");
            break;
        } catch (err) {
            if (i === retries - 1) {
                console.error("❌ MongoDB Connection Failed after retries:", err);
                console.log("⚠️ Starting server without database connection. Some features may not work.");
            } else {
                console.log(`Retrying database connection in ${delay/1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
};

// Connect to database but continue even if connection fails
connectWithRetry().catch(err => {
    console.error("❌ Database connection error:", err);
    console.log("⚠️ Starting server without database connection. Some features may not work.");
});

// Mount routes - ensure correct paths
app.use("/api", authRoutes);
app.use("/api", geminiRoutes);
app.use("/api", subscriptionRoutes);

// Testing route for Gemini API
app.get('/test-gemini', (req, res) => {
    res.json({
        message: 'Gemini API route is working',
        apiKeyConfigured: !!process.env.GEMINI_API_KEY,
        serverTime: new Date().toISOString()
    });
});

// Health check route
app.get("/health", (req, res) => {
    res.json({ 
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        apiKey: process.env.GEMINI_API_KEY ? "configured" : "missing",
        emailEnabled: process.env.EMAIL_ENABLED === 'true'
    });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    
    if (err.name === 'ValidationError') {
        return res.status(400).json({ 
            error: "Validation Error",
            details: err.message 
        });
    }
    
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ 
            error: "Unauthorized",
            details: "Invalid or missing authentication token" 
        });
    }
    
    res.status(err.status || 500).json({ 
        error: "Internal Server Error",
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start Server with graceful shutdown
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`
🚀 Server running on port ${PORT}
✅ API endpoints available at http://localhost:${PORT}/api
✅ Health check endpoint at http://localhost:${PORT}/health
✅ Test Gemini at http://localhost:${PORT}/test-gemini
✅ Email sending is ${process.env.EMAIL_ENABLED === 'true' ? 'enabled' : 'disabled'}
    `);
});

// Graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown() {
    console.log('Received shutdown signal, closing server and database connections...');
    server.close(async () => {
        try {
            await mongoose.connection.close();
            console.log('Server and database connections closed.');
            process.exit(0);
        } catch (err) {
            console.error('Error during shutdown:', err);
            process.exit(1);
        }
    });
}
