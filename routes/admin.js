const express = require('express');
const router = express.Router();
const { viewUsers } = require('../controllers/Admin');
router.route('/').get((req, res, next) => {
  if (!req.user) res.redirect('/');
  if (req.user.status !== 'admin') res.redirect('/');

  res.render('admin');
});
router.route('/users').get(viewUsers);
module.exports = router;
