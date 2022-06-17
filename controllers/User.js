const colors = require('colors');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Post = require('../models/Post');
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
// @desc View all users
// @route GET /user/all
// @access Private
exports.viewAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).render('viewAllUsers', { allUsers, currentUser: req.user });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc View ONE users
// @route GET /user/:id
// @access Public
exports.viewOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ creator: user._id });
    if (!user) res.status(400).json({ success: false, err: err.message });
    res.status(200).render('viewOneUser', { user, posts });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc DELETE ONE user and all associated post
// @route POST /user/:id/delete
// @access PRIVATE
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    const posts = await Post.deleteMany({ creator: user._id });
    res.redirect('/user/all');
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
