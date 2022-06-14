const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please add a firstname'],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, 'Please add a lastname'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please add an email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email',
    ],
  },
  username: String,
  password: {
    type: String,
    required: [true, 'password required'],
  },
  status: String,
});

module.exports = mongoose.model('User', UserSchema);
