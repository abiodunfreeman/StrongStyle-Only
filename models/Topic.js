const mongoose = require('mongoose');

const TopicSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'add a topic please'],
    trim: true,
    unique: true,
    minLength: 3,
    maxLength: 25,
  },
});

module.exports = mongoose.Model('Topic', TopicSchema);
