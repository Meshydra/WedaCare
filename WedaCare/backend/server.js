require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // For authentication routes
const User = require('./models/user'); 


const app = express();
app.use(express.json());

// CORS Configuration (Adjust allowedOrigins as needed)
const allowedOrigins = ['http://localhost:19006', 'http://192.168.1.8:19006']; // Replace with your React Native app's origin(s)
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// Middleware: Log all requests
app.use((req, res, next) => {
    console.log(`📢 ${req.method} ${req.url} - Body:`, req.body);
    next();
});

// Authentication Routes (Keep these for signup/login)
app.use('/api/auth', authRoutes);

// User Routes (Directly in server.js - Option B)
app.get('/api/user-details/:mobile', async (req, res) => {
    const { mobile } = req.params;

    // 1. AUTHENTICATION CHECK (REPLACE WITH YOUR ACTUAL LOGIC)
    // Example (replace with your JWT verification or other auth):
    // const userId = await verifyToken(req.headers.authorization); // Example
    // if (!userId) return res.status(401).json({ error: "Unauthorized" });

    try {
        const user = await User.findOne({ mobile }); // Find by mobile
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({
            name: user.name,
            mobile: user.mobile,
            latitude: user.location?.latitude,
            longitude: user.location?.longitude
        });
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/api/save-location', async (req, res) => {
    const { mobile, latitude, longitude } = req.body; // Include mobile in request body

    // 1. AUTHENTICATION CHECK (REPLACE WITH YOUR ACTUAL LOGIC)
    // const userId = await verifyToken(req.headers.authorization); // Example
    // if (!userId) return res.status(401).json({ error: "Unauthorized" });

    if (!mobile || latitude == null || longitude == null) {
        return res.status(400).json({ error: "Mobile, latitude, and longitude are required" });
    }

    try {
        const user = await User.findOne({ mobile }); // Find by mobile
        if (!user) return res.status(404).json({ error: "User not found" });

        user.location = { latitude, longitude };
        await user.save();

        res.status(200).json({ message: "Location saved successfully" });
    } catch (error) {
        console.error("❌ Error saving location:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Handle Invalid Routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on port ${PORT}`));