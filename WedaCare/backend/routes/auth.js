const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');  
const router = express.Router();

router.post('/signup', async (req, res) => {
    console.log("📥 Signup request received:", req.body); 

    const { name, mobile, password, language } = req.body;

    if (!name || !mobile || !password || !language) {
        console.log("⚠️ Missing fields:", req.body);
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

module.exports = router;
