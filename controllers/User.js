const colors = require('colors');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
// @desc Create new User
// @route POST /sign-up
// @access Public
exports.createNewUser = async (req, res, next) => {
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
// @desc Update User Status
// @route GET /user/:id/update-status
// @access Public
exports.viewUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ success: false, err: 'User not found' });
    res.status(200).render('userStatus', { user });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc Update User Status
// @route POST /user/:id/update-status
// @access Public
exports.updateUserStatus = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    res.render('userStatus', { success: true, user });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
