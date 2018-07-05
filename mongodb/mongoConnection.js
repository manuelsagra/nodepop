'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.on('error', err => {
  console.log('MongoDB error', err);
});

conn.once('open', () => {
  console.log('Connected to MongoDB on', conn.name);
});

mongoose.connect('mongodb://localhost:27017/nodepop', { useNewUrlParser: true });

module.exports = conn;