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
    
    username: {
<<<<<<< HEAD
        type: String,
=======
        tupe: String,
>>>>>>> c9fa19d38f6e0dad4fe7e781435b9ff186d9efcc
        required: true
    },

    // plants: [
    //     // do i pull from plant model?????
    //     {
    //         Plant
    //     }
    // ]
});

const User = model('User', userSchema);

module.export = User;

// add regex to check email