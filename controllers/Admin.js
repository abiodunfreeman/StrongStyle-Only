const User = require('../models/User');
// @desc View all users
// @route POST /admin
// @access Private
exports.viewUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).render('admin', { currentUser: req.user, users });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
