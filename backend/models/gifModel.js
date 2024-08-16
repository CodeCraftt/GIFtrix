const mongoose = require('mongoose');

const gifSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  tags: [String],
  upload_date: {
    type: Date,
    default: Date.now,
  },
  share_count: {
    type: Number,
    default: 0,
  },
});

const Gif = mongoose.model('Gif', gifSchema);

module.exports = Gif;
