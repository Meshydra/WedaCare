const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    language: { type: String, default: "English" },
    location: {  
        latitude: { type: Number },  
        longitude: { type: Number }  
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;



