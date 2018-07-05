'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const conn = require('./mongoConnection');
const User = require('./models/User');
const Ad = require('./models/Ad');

async function insertData() {
    try {
        // Empty user collection and insert data
        console.log('\x1b[33m--------------------------------');
        console.log('Users');
        console.log('--------------------------------\x1b[0m');

        const usersDeleted = await User.deleteMany({});
        console.log(`\x1b[31m${usersDeleted.n} users deleted\x1b[0m`);

        const usersPath = path.join(__dirname, 'data', 'users.json');
        const users = JSON.parse(fs.readFileSync(usersPath));
        for (let i = 0; i < users.length; i++) {
            const user = new User(users[i]);
            if (user.password) {
                const hash = crypto.createHash('sha256').update(user.password).digest('base64');
                user.password = hash;
            }
            const userInserted = await user.save();
            console.log('\x1b[34mNew user\x1b[0m', userInserted.name);
        }

         // Empty ad collection and insert data
        console.log('\x1b[33m--------------------------------');
        console.log('Ads');
        console.log('--------------------------------\x1b[0m');

        const adsDeleted = await Ad.deleteMany({});
        console.log(`\x1b[31m${adsDeleted.n} ads deleted\x1b[0m`);

        const adsPath = path.join(__dirname, 'data', 'ads.json');
        const ads = JSON.parse(fs.readFileSync(adsPath));
        for (let i = 0; i < ads.length; i++) {
            const ad = new Ad(ads[i]);
            const adInserted = await ad.save();
            console.log('\x1b[34mNew ad\x1b[0m', adInserted.name);
        }

        console.log('\x1b[32m--------------------------------');
        console.log('Sample data inserted in database');
        console.log('--------------------------------\x1b[0m');

        process.exit(0);      
    } catch (err) {
        console.error('Error inserting data', err);
    }
}
insertData();