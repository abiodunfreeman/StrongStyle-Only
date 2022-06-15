const colors = require('colors');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
// @desc Create new User
// @route POST /sign-up
// @access Public
exports.createNewUser = async (req, res, next) => {
  console.log(req.body);
  console.log('createNewUser Ran');
  try {
    const user = User.create({
      ...req.body,
      username: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });
    res.status(201).redirect('/');
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
