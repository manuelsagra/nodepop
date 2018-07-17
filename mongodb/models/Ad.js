'use strict';

const mongoose = require('mongoose');

// Ad schema
const adSchema = mongoose.Schema({
    name: String,
    selling: Boolean,
    price: Number,
    photo: String,
    tags: [String] 
});

adSchema.index({
    name: 1,
    selling: 1,
    price: 1,
    tags: 1
});

adSchema.index({
    selling: 1
});

adSchema.index({
    price: 1
});

adSchema.index({
    tags: 1
});

// lists ads with criteria
adSchema.statics.list = function(filter, skip, limit, sort) {
    const query = Ad.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select('-__v');
    query.sort(sort);

    return query.exec();
};

adSchema.statics.getTags = function() {
    const query = Ad.distinct('tags');
    // Mongoose doesn't support sorting this!!! 

    return query.exec();
};

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;