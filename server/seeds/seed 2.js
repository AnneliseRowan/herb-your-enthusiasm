const db = require('../config/connection');
const { Plant, Profile, Userplant } = require('../models');
const plantData = require('./plantData.json');
const userSeeds = require('./userSeeds.json')
const userPlants = require('./userPlants.json')

db.once('open', async () => {
    try {
        await Plant.deleteMany({});
        await Profile.deleteMany({})
        await Userplant.deleteMany({})

        await Plant.create(plantData)
        await Profile.create(userSeeds);
        await Userplant.create(userPlants)

        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    }

})