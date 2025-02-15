require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');  
const User = require('./models/user');       

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

// Ensure MongoDB URI exists
if (!process.env.MONGO_URI) {
    console.error("❌ MongoDB connection string missing in .env file");
    process.exit(1);
}

// Connect to MongoDB
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

// Authentication Routes
app.use('/api/auth', authRoutes);

// Add Route to Fetch User Details
app.get('/api/user-details', async (req, res) => {
    try {
        const user = await User.findOne();  // Adjust logic for authenticated users
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ name: user.name, mobile: user.mobile });
    } catch (error) {
        console.error("❌ Error fetching user:", error);
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


