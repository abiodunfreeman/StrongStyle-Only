const Post = require('../models/Post');
// @desc Show new post form
// @route GET /post/new
// @access Public
exports.viewPostForm = (req, res, next) => {
  res.render('newPostForm', { user: req.user });
};
// @desc Create new post
// @route POST /post/new
// @access Public
exports.createPost = async (req, res, next) => {
  try {
    if (!req.user) res.redirect('/login');
    const post = await Post.create({ ...req.body, creator: req.user._id });
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
