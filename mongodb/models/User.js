'use strict';

const mongoose = require('mongoose');

// ad schema
const adSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String 
});

const User = mongoose.model('User', adSchema);

module.exports = User;
