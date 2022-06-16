const express = require('express');
const router = express.Router();
const {
  viewPostForm,
  createPost,
  viewAllPost,
  deletePost,
} = require('../controllers/Post');

router.route('/new').get(viewPostForm).post(createPost);
router.route('/all').get(viewAllPost);
router.route('/:id/delete').post(deletePost);
module.exports = router;
