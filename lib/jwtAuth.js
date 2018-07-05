'use strict';

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');

module.exports = function() {
    return (req, res, next) => {
        // Retrieve token
        const token = req.body.token || req.query.token || req.get('x-access-token');

        // If no token, the user is not authorised
        if (!token) {
            // TODO i18n
            const err = new Error(res.__('No token provided'));
            err.status = 401;
            next(err);
            return;
        }

        // Verify token
        jwt.verify(token, localConfig.jwt.secret, (err, decoded) => {
            if (err) {
                err.status = 401;
                err.message = res.__('Invalid token');
                next(err);
                return;
            }
            req.user_id = decoded.user_id;
            next();
        });
    };
}