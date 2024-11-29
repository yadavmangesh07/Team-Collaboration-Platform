const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
const adminRoutes = require('./routes/admin');



// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', require('./routes/auth'));

module.exports = app;
