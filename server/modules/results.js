const mongoose = require('mongoose');

// Define the Result schema
const resultSchema = new mongoose.Schema({
  studentName: String,
  examId: String,
  answers: [
    {
      questionId: String,
      selectedAnswer: String,
    }
  ],
  score: Number
});

// Check if the model already exists to avoid overwriting
const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

module.exports = Result;
