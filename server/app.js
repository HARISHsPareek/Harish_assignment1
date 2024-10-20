require('dotenv').config(); // This loads .env variables into process.env
const express = require('express');
const cors= require("cors");
const connectDB = require('./config/db');
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();

app.use(express.json());
app.use(cors());
// Connect to DB
connectDB();

// Middleware
app.use(express.json());

// API routes
app.use('/api/rules', ruleRoutes);
app.use('/api/admin',ruleRoutes);

module.exports = app;
