const mongoose = require('mongoose');

// Define the schema
const resultSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  examId: { type: String, required: true },
  answers: { type: Array, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
}, { timestamps: true });

// Check if the model already exists before defining it
const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

module.exports = Result;
