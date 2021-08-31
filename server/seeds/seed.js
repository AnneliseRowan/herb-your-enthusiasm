const db = require('../config/connection');
const { Plant, Profile } = require('../models');
const plantData = require('./plantData.json');
const userSeeds = require('./userSeeds.json')

db.once('open', async () => {
    try {
        await Plant.deleteMany({});
        // await Profile.deleteMany({})

        await Plant.create(plantData)
        // await Profile.create(userSeeds);

        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    }

})