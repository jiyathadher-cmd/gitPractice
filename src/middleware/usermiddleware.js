const jwt = require('jsonwebtoken');
const { unprotectedroutes } = require('../utils/unprotectedRoutes.js');
const db = require('../models');
const Users = db.User;

module.exports = async (req, res, next) => {
    const url = req.url.split('?')[0];
    if (unprotectedroutes.includes(url)) return next();

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
        return res.status(401).json({ success: false, message: 'Invalid token format.' });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found.' });
        }

        if (user.isDeleted || user.status === 'deactive') {
            return res.status(401).json({
                success: false,
                message: 'Your account is inactive. Contact site admin.',
            });
        }

        // Ensure userId is a string
        req.user = {
            id: user._id.toString(),
            email: user.email,
            role: user.role
        };

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Session expired or invalid token.',
        });
    }
};
