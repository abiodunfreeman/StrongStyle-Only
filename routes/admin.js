const express = require('express');
const router = express.Router();

router.route('/').get((req, res, next) => {
  if (!req.user) res.redirect('/');
  if (req.user.status !== 'admin') res.redirect('/');

  res.render('admin', { currentUser: req.user });
});
module.exports = router;
