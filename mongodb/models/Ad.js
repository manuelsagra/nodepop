'use strict';

const mongoose = require('mongoose');

// ad schema
const adSchema = mongoose.Schema({
    name: String,
    selling: Boolean,
    price: Number,
    photo: String,
    tags: [String] 
});

// lists ads with criteria
adSchema.statics.list = function(filter, skip, limit, fields, sort) {
  const query = Ad.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);

  return query.exec();
}

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
