'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const colors = require('colors');

const conn = require('./mongoConnection');
const User = require('./models/User');
const Ad = require('./models/Ad');

async function insertData() {
    try {
        // Empty user collection and insert data
        console.log('--------------------------------'.yellow);
        console.log('Users'.yellow);
        console.log('--------------------------------'.yellow);

        const usersDeleted = await User.deleteMany({});
        console.log(colors.red(`${usersDeleted.n} users deleted`));

        const usersPath = path.join(__dirname, 'data', 'users.json');
        const users = JSON.parse(fs.readFileSync(usersPath));
        for (let i = 0; i < users.length; i++) {
            const user = new User(users[i]);
            if (user.password) {
                const hash = crypto.createHash('sha256').update(user.password).digest('base64');
                user.password = hash;
            }
            const userInserted = await user.save();
            console.log('New user'.blue, userInserted.name);
        }

        // Empty ad collection and insert data
        console.log('--------------------------------'.yellow);
        console.log('Ads'.yellow);
        console.log('--------------------------------'.yellow);

        const adsDeleted = await Ad.deleteMany({});
        console.log(colors.red(`${adsDeleted.n} ads deleted`));

        const adsPath = path.join(__dirname, 'data', 'ads.json');
        const ads = JSON.parse(fs.readFileSync(adsPath));
        for (let i = 0; i < ads.length; i++) {
            const ad = new Ad(ads[i]);
            const adInserted = await ad.save();
            console.log('New ad'.blue, adInserted.name);
        }

        console.log('--------------------------------'.green);
        console.log('Sample data inserted in database'.green);
        console.log('--------------------------------'.green);

        conn.close();     
    } catch (err) {
        console.error('Error inserting data', err);
    }
}
insertData();