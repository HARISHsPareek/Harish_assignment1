const mongoose = require('mongoose');
const Admin=require('../models/Admin');
const bcrypt=require('bcryptjs');
const connectDB = async () => {
    try {
        // Make sure the URI points to the correct MongoDB instance
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
