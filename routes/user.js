const express = require('express');
const router = express.Router();
const { viewUserStatus, updateUserStatus } = require('../controllers/User');
router.route('/').get((req, res) => res.redirect('/user/update-status'));
router.route('/:id/update-status').get(viewUserStatus).post(updateUserStatus);

module.exports = router;
