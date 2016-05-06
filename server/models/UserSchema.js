const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Users');

// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const UserSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: Number,
  data: {
    chat_data: Array,
    other_data: Arrray
  },
  created_at: Date,
  updated_at: Date
});


const User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
