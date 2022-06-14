const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const colors = require('colors');
const User = require('../models/User');
const { createNewUser } = require('../controllers/User');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router
  .route('/')
  .get((req, res, next) => {
    res.render('sign-up');
  })
  .post(urlencodedParser, createNewUser);
module.exports = router;
