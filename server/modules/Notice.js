const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  lid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String, // Corrected type
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now, // Default set to current date
  },
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
