import Plant from './Plant';
const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    plants: [
        // do i pull from plant model?????
        {
            Plant
        }
    ]
});

const User = model('User', userSchema);

module.export = User;

// add regex to check email and password