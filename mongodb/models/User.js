'use strict';

const mongoose = require('mongoose');

// User schema
const userSchema = mongoose.Schema({
    name: String,
    email: { type: [String], index: true },
    password: String 
});


const User = mongoose.model('User', userSchema);

module.exports = User;