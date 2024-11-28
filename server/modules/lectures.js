const mongoose = require('mongoose');

const LecturesSchema = new mongoose.Schema({
  lid: {
    type: String,
    required: [true, "Lecture ID is required"],
    unique: true, // Ensure `lid` is unique
    trim: true,
  },
  lname: {
    type: String,
    required: [true, "Lecture name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensure `email` is unique
    match: [/.+\@.+\..+/, "Please enter a valid email address"], // Basic email validation
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true, // Ensure `phone` is unique
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"], // Ensure 10-digit phone number
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "Age must be at least 18"], // Minimum age requirement
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const LecturesModel = mongoose.model("Lectures", LecturesSchema);

module.exports = LecturesModel;
