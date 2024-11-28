// routes/examRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const Exam = require('../models/exam');  // Assuming you have the Exam model defined
const Result = mongoose.model('Result', new mongoose.Schema({
  studentName: String,
  examId: String,
  answers: [
    {
      questionId: String,
      selectedAnswer: String,
    }
  ],
  score: Number
}));

const router = express.Router();

// Save student answers and result
router.post('/submit', async (req, res) => {
  try {
    const { studentName, examId, answers } = req.body;
    
    // Calculate score
    const exam = await Exam.findOne({ Examid: examId });
    let score = 0;
    
    exam.Questions[0].questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score += 1;
      }
    });

    // Save result
    const result = new Result({
      studentName,
      examId,
      answers,
      score
    });

    await result.save();
    res.status(200).json({ message: 'Result saved successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving result');
  }
});

module.exports = router;
