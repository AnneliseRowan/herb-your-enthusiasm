// import Plant from './Plant';
const {Schema, model} = require('mongoose');

const profileSchema = new Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    
    username: {
        type: String,
        required: true
    },

    // plants: [
    //     // do i pull from plant model?????
    //     {
    //         Plant
    //     }
    // ]
});

const Profile = model('Profile', profileSchema);

module.export = Profile;

// add regex to check email