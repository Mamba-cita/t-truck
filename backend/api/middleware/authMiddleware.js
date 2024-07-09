const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protected = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try {
            // Get the token from the headers
            token = req.headers.authorization.split(' ')[1];
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Set the user in req.user
            req.user = await User.findById(decoded.id).select('-password');
            next(); // Call next middleware
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('No token available');
    }
});

module.exports = {
    protected,
};
