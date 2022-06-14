const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router
  .route('/')
  .get((req, res, next) => {
    res.render('login');
  })
  .post(urlencodedParser, (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/',
    });
  });

module.exports = router;
