const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const User = require('../../mongodb/models/User');

/**
 * POST /
 * Registers a user
 */
router.post('/', async (req, res, next) => {
    try {
        const user = new User(req.body);
        if (user.password) {
            const hash = crypto.createHash('sha256').update(user.password).digest('base64');
            user.password = hash;
        }
        const userSaved = await user.save();
        res.json({
            success: true, 
            result: userSaved 
        });
    } catch(err) {
        next(err);    
    }
});

module.exports = router;