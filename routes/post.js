const express = require('express');
const router = express.Router();
const {
  viewPostForm,
  createPost,
  viewAllPost,
  deletePost,
  createTopic,
  viewCreateTopic,
} = require('../controllers/Post');

router.route('/new').get(viewPostForm).post(createPost);
router.route('/all').get(viewAllPost);
router.route('/:id/delete').post(deletePost);
router.route('/topic/create').get(viewCreateTopic).post(createTopic);
module.exports = router;
