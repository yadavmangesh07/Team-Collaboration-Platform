const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Ensure role exists
        const userRole = await Role.findOne({ roleName: role });
        if (!userRole) return res.status(400).json({ message: 'Invalid role.' });

        // Create new user
        const user = new User({ username, password, role: userRole._id });
        await user.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username }).populate('role');
        if (!user) return res.status(404).json({ message: 'User not found.' });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid password.' });

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role.roleName },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role.roleName });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in.', error: error.message });
    }
};

exports.logout = (req, res) => {
    // Token invalidation can be managed through a blacklist (not covered here)
    res.json({ message: 'Logout successful.' });
};
