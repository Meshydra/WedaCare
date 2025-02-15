require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

if (!process.env.MONGO_URI) {
    console.error("❌ MongoDB connection string missing in .env file");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

app.use((req, res, next) => {
    console.log(`📢 ${req.method} ${req.url} - Body:`, req.body);
    next();
});

// Routes
app.use('/api/auth', authRoutes);

// Start Server
//const PORT = process.env.PORT || 5001;
app.listen(5001, '0.0.0.0', () => console.log(`✅ Server running on port 5001`));

