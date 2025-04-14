const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure the User model is correctly imported

const router = express.Router();

// User login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Missing email or password" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ success: true, token, user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// User registration
router.post("/register", async (req, res) => {
    console.log("Register endpoint hit"); // Debugging log
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully!" });
    } catch (error) {
        console.error("Error during registration:", error); // Log the error
        res.status(500).json({ message: "Server error" });
    }
});

// Forgot password route
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // In a real application, you would:
        // 1. Generate a password reset token
        // 2. Store it in the database with an expiry
        // 3. Send an email with a reset link
        
        // For now, just return success
        res.json({ 
            success: true, 
            message: "Password reset instructions sent to your email" 
        });
    } catch (error) {
        console.error("Error in forgot password:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;