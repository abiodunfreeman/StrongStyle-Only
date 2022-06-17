const express = require('express');
const router = express.Router();
const {
  viewUserStatus,
  updateUserStatus,
  viewUsers,
  viewAllUsers,
  viewOneUser,
  deleteUser,
} = require('../controllers/User');
router.route('/').get((req, res) => res.redirect('/user/update-status'));
router.route('/all').get(viewAllUsers).post();
router.route('/:id').get(viewOneUser);
router.route('/:id/delete').post(deleteUser);
router.route('/:id/update-status').get(viewUserStatus).post(updateUserStatus);

module.exports = router;
