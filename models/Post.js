const mongoose = require('mongoose');
const { DateTime } = require('luxon');
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
    date: {
      type: String,
      default: DateTime.fromJSDate(Date.now).toLocaleString(DateTime.DATE_MED),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
