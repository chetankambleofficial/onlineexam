const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  Examid: {
    type: String,
    required: true,
  },
  ExamName: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  Duration: {
    type: String,
    required: true,
  },
  Questions: {
    type: Array,
    required: true,
  },
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
