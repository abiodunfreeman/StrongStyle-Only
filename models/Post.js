const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'please add a post title'],
    },
    message: {
      type: String,
      required: [true, 'BANNED'],
      trim: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
