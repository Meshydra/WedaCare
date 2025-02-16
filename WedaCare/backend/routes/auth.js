const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');  
const router = express.Router();

router.post('/signup', async (req, res) => {
    console.log("📥 Signup request received:", req.body); 

    const { name, mobile, password, language } = req.body;

    if (!name || !mobile || !password || !language) {
        console.log("Missing fields:", req.body);
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ mobile });
        if (existingUser) {
            console.log("🚫 User already exists:", existingUser);
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, mobile, password: hashedPassword, language });

        await newUser.save();
        console.log("✅ User registered successfully:", newUser);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("❌ Error during signup:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    console.log("📥 Login request received:", req.body);

    const { mobile, password } = req.body;

    if (!mobile || !password) {
        console.log("⚠️ Missing login fields");
        return res.status(400).json({ error: "Mobile and password are required" });
    }

    try {
        const user = await User.findOne({ mobile });
        if (!user) {
            console.log("🚫 User not found:", mobile);
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("🚫 Incorrect password for:", mobile);
            return res.status(400).json({ error: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("❌ Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/user-details/:mobile', async (req, res) => {
    const { mobile } = req.params;

    try {
        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user); // Send the complete user object
    } catch (error) {
        console.error("❌ Error fetching user details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/update-location', async (req, res) => {
    const { mobile, latitude, longitude } = req.body;

    if (!mobile || latitude == null || longitude == null) {
        return res.status(400).json({ error: "Mobile, latitude, and longitude are required" });
    }

    try {
        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update location
        user.location = { latitude, longitude };
        await user.save();

        res.status(200).json({ message: "Location updated successfully", location: user.location });
    } catch (error) {
        console.error("❌ Error updating location:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/get-location/:mobile', async (req, res) => {
    const { mobile } = req.params;

    try {
        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ location: user.location || "No location data available" });
    } catch (error) {
        console.error("❌ Error fetching location:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
