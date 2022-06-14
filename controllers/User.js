const colors = require('colors');
const User = require('../models/User');

// @desc Create new User
// @route POST /sign-up
// @access Public
exports.createNewUser = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = User.create({ ...req.body, username: req.body.email });
    res.status(201).redirect('/');
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
