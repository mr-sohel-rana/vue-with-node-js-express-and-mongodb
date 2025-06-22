 const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true  // optional, but often useful for emails
  },
  dept: {
    type: String,
    required: true,
    trim: true
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
