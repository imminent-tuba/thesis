const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Users');
const Schema = mongoose.Schema;

// create a schema
const UserSchema = new Schema({
  id: Number,
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: String,
  profile: Array,
  other_data: Array,
  created_at: Date,
  updated_at: Date
});


const User = mongoose.model('User', UserSchema);

// make this available to our users in our Node applications
module.exports = User;
