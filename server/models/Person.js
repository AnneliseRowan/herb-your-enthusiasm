// import Plant from './Plant';
const {Schema, model} = require('mongoose');

const personSchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },

    age: {
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



const Person = model('Person', personSchema);

module.exports = Person;

// add regex to check email