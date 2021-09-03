const { Schema, model } = require('mongoose');

const userPlantSchema = new Schema({
    plantName: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    plantNickName: {
        type: String,        
    },
    
    plantLight: {
        type: String,
        required: true
    },

    plantWater: {
        type: String,
        required: true
    },

    petFriendly: {
        type: Boolean,
        required: true
    },

    plantImage: {
        type: String
    },

    moreInfo: {
        type: String
    }

});

const Userplant = model('Userplant', userPlantSchema);

module.exports = Userplant