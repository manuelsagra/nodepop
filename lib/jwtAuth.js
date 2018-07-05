'use strict';

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');

module.exports = function() {
    return (req, res, next) => {
        // Retrieve token
        const token = req.body.token || req.query.token || req.get('x-access-token');

        // If no token, the user is not authorised
        if (!token) {
            const err = new Error('No token provided');
            err.status = 401;
            next(err);
            return;
        }

        // Verify token
        jwt.verify(token, localConfig.jwt.secret, (err, decoded) => {
            if (err) {
                err.status = 401;
                err.message = 'Invalid token';
                next(err);
                return;
            }
            req.user_id = decoded.user_id;
            next();
        });
    };
};