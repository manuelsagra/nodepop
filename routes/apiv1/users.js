'use strict';

const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const User = require('../../mongodb/models/User');
const jwt = require('jsonwebtoken');
const localConfig = require('../../localConfig');

/**
 * POST /
 * Registers a user
 */
router.post('/', async (req, res, next) => {
    try {
        const user = new User(req.body);

        // Validations
        if (!user.name || !user.email || !user.password) {
            throw new Error('All parameters (email, name, password) are required');
        }
        if (!localConfig.validations.email.test(user.email)) {
            throw new Error('The e-mail format is not valid');
        }

        // Hash password
        const hash = crypto.createHash('sha256').update(user.password).digest('base64');
        user.password = hash;

        const userSaved = await user.save();
        userSaved['__v'] = undefined;
        res.json({
            success: true, 
            result: userSaved 
        });
    } catch(err) {
        next(err);
    }
});

/**
 * POST /authenticate
 * Returns a token for valid users
 */
router.post('/authenticate', async (req, res, next) => {
    try {
        // Get credentials
        const email = req.body.email;
        const password = crypto.createHash('sha256').update(req.body.password).digest('base64');

        // Check credentials
        const user = await User.findOne({ email: email }).exec();
        if (!user || password !== user.password) {
            res.json({ 
                success: true, 
                message: res.__('Invalid credentials')
            });
            return;
        }

        // Create JWT
        jwt.sign({ user_id: user._id }, localConfig.jwt.secret, {
            expiresIn: localConfig.jwt.expiresIn
        }, (err, token) => {
            if (err) {
                next(err);
                return;
            }
            res.json({
                success: true, 
                token: token 
            });
        });
    } catch(err) {
        next(err);
    }
});

module.exports = router;