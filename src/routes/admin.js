const express = require('express');
const authenticateToken = require('../middleware/auth');
const authorizeRole = require('../middleware/role');

const router = express.Router();

// Admin route - accessible only by Admin
router.get('/admin-dashboard', authenticateToken, authorizeRole('Admin'), (req, res) => {
    res.json({ message: 'Welcome to the Admin Dashboard!' });
});

module.exports = router;
