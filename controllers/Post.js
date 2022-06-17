const Post = require('../models/Post');
const Topic = require('../models/Topic');
const { DateTime } = require('luxon');
const User = require('../models/User');
// @desc Show new post form
// @route GET /post/new
// @access Public
exports.viewPostForm = async (req, res, next) => {
  const topics = await Topic.find();
  res.render('newPostForm', { user: req.user, topics });
};
// @desc Create new post
// @route POST /post/new
// @access Public
exports.createPost = async (req, res, next) => {
  try {
    if (!req.user) res.redirect('/login');
    const topic = await Topic.findOne({ name: req.body.topic });
    const user = await User.findById(req.user._id);
    const post = await Post.create({
      ...req.body,
      creator: user,
      topic,
    });
    console.log(post);
    res.redirect('/post/new');
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc View all post
// @route GET /post/all
// @access Public
exports.viewAllPost = async (req, res, next) => {
  try {
    const allPost = await Post.find();
    res
      .status(200)
      .render('viewAllPost', { posts: allPost, currentUser: req.user });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc Delete one post
// @route POST /post/:id/delete
// @access Private
exports.deletePost = async (req, res, next) => {
  try {
    console.log('post delete ran'.red.bold.underline);
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).redirect('/post/all');
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc GET topic
// @route GET /post/topic/create
// @access Private
exports.viewCreateTopic = (req, res, next) => {
  try {
    res.status(200).render('topicForm', { user: req.user });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).render('topicForm', { user: req.user, err });
  }
};
// @desc Create topic
// @route POST /post/topic/create
// @access Private
exports.createTopic = async (req, res, next) => {
  try {
    const topic = Topic.create({ ...req.body });
    res.redirect('/');
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
