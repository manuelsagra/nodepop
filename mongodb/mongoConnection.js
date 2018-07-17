'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;
const mongodb_uri = process.env.NODEPOP_DATABASE_URI || 'mongodb://localhost:27017/nodepop';

conn.on('error', err => {
    console.log('MongoDB error', err);
});

conn.once('open', () => {
    console.log('Connected to MongoDB on', conn.name);
});

mongoose.connect(mongodb_uri, { useNewUrlParser: true });

module.exports = conn;