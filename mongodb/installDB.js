'use strict';

require('./mongoConnection');
const User = require('./models/User');

Promise.all([
    createUser
]).then(() => {
    console.log('Finished')
});

async function createUser() {
    let user = new User({
        name: 'Paquito33',
        email: 'asdaasd@asdadad.es',
        password: 'asdfasdsdasd'
    });
    
    try {
        await user.save((err, user) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('User created', user.name)
        });
    } catch (err) {
        console.error('Error', err);
    }    
}