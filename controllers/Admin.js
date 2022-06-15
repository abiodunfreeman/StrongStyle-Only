const User = require('../models/User')
// @desc View all users
// @route POST /admin
// @access Private
exports.viewUsers = await (req, res, next) => {
try {
const users = User.find();
res.status(200).render('viewUsers', {users})    
} catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
}    
}