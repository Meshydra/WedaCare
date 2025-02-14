const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, mobile, password, confirmPassword } = req.body;

    if (!name || !mobile || !password || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ mobile });
        if (existingUser) return res.status(400).json({ error: "Mobile already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, mobile, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User Registered Successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error registering user" });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login Successful", token, user });
});

module.exports = router;

