const { Schema, model } = require('mongoose');

const plantSchema = new Schema({
    plantName: {
        type: String,
        required: true
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
    },

    waterFrequency: {
        type: String
    }

});

const Plant = model('Plant', plantSchema);

module.exports = Plant

//possibly add plant 
// plantWater might not be string??