'use strict';

const express = require('express');
const router = express.Router();

const Ad = require('../../mongodb/models/Ad');
const jwtAuth = require('../../lib/jwtAuth');

/**
 * GET /
 * Retrieves a list of ads
 */
router.get('/', jwtAuth(), async (req, res, next) => {
    try {
        const name = req.query.name;
        const price = req.query.price;
        const tag = req.query.tag;
        const selling = req.query.selling;

        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const fields = req.query.fields;
        const sort = req.query.sort;

        // Build filters (name, tag, type, price range)
        const filter = {};

        if (name) {
            filter.name = { '$regex': new RegExp(`^${name}`, 'i') };
        }

        if (price) {
            if (price.indexOf('-') !== -1) {
                const priceAux = price.split('-');
                if (priceAux.length == 2) {
                    if (priceAux[0] === '' && priceAux[1] === '') {
                        throw new Error('Price range is not valid');
                    }
                    filter.price = {};
                    if (priceAux[0] !== '') {
                        filter.price['$gte'] = parseInt(priceAux[0]);
                    } 
                    if (priceAux[1] !== '') {
                        filter.price['$lte'] = parseInt(priceAux[1]);
                    } 
                } else {
                    throw new Error('Price range is not valid');
                }
            } else {
                filter.price = parseInt(price);
            }
        }

        if (tag) {
            filter.tags = tag;
        }

        if (selling) {
            filter.selling = (selling === 'true');
        }

        const ads = await Ad.list(filter, skip, limit, fields, sort);
        res.json({
            success: true, 
            result: ads 
        });
    } catch(err) {
        next(err);    
    }
});

/**
 * GET /tags
 * Retrieves a list of tags used in the ads
 */
router.get('/tags', jwtAuth(), async (req, res, next) => {
    try {
        const tags = await Ad.getTags();
        res.json({
            success: true,
            result: tags.sort() // Workaround for mongoose not being able to sort a distinct search
        });
    } catch(err) {
        next(err);    
    }
});

module.exports = router;