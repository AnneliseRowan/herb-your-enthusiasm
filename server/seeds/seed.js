const db = require('../config/connection');
const { Plant, User } = require('../models');
const plantData = require('./plantData.json');
const userSeeds = require('./userSeeds.json')

db.once('open', async () => {
    try {
        await Plant.deleteMany({});
        // await User.deleteMany({})

        await Plant.create(plantData)
        // await User.create(userSeeds);

        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    }

})