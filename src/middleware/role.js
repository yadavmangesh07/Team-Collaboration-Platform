const Role = require('../models/Role');

const authorizeRole = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const userRole = req.user?.role;
            if (!userRole) {
                return res.status(403).json({ message: 'No role assigned to the user.' });
            }

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: 'Access denied.' });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: 'Error authorizing role.', error: error.message });
        }
    };
};

module.exports = authorizeRole;
