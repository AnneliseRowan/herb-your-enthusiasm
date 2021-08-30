const db = require('../config/connection');
const { Plant } = require('../models');
const plantData = require('./plantData.json');

db.once('open', async () => {
    try {
        await Plant.deleteMany({});
        await Plant.create(plantData);

        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    }

})