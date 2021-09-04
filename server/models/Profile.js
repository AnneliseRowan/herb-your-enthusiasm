// import Plant from './Plant';
const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt')

const profileSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
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

profileSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  profileSchema.methods.isCorrectPassword = async function (password) {    
    console.log('bcrypt.compare(password, this.password):', bcrypt.compare(password, this.password))
    return bcrypt.compare(password, this.password);
  };

const Profile = model('Profile', profileSchema);

module.exports = Profile;

// add regex to check email