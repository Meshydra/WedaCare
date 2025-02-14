require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
    console.error("❌ MongoDB connection string is missing in .env file");
    process.exit(1); // Exit if no database connection string is found
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit on failure
});

// Routes
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';  // Use a custom host if needed

app.listen(PORT, HOST, () => console.log(`✅ Server running on http://${HOST}:${PORT}`));


