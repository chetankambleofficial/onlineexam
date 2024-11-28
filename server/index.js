const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const StudentModel = require("./models/students");
const LecturesModel = require("./models/lectures");
const Exam = require('./models/exam'); // Ensure it's pointing to the correct file

const examRoutes = require('./routes/examRoutes');
// Only require the result model once
const Result = require('./models/results');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());  // To parse incoming JSON requests
app.use(cors());  // For handling cross-origin requests

// Use express-session for session management
app.use(
  session({
    secret: "onlineexam-secret-key", // Replace with a strong, unique secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1-hour session expiration
    },
  })
);

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/onlineexam", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use examRoutes for /api/exam endpoints
app.use('/api/exam', examRoutes);

// Define the Question model
const questionSchema = require("./models/Questions");
const Question = mongoose.model("Question", questionSchema);  // Create the model here

// Route to fetch questions
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find({}); // Use the model here
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// Login route for students
app.post("/Slogin", (req, res) => {
  const { email, password } = req.body;
  StudentModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        req.session.user = { id: user._id, role: "student" }; // Start session
        res.json("Success");
      } else {
        res.status(401).json("The Password is incorrect");
      }
    } else {
      res.status(404).json("No record existed");
    }
  });
});

// Login route for lectures
app.post("/llogin", (req, res) => {
  const { email, password } = req.body;
  LecturesModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        req.session.user = { id: user._id, role: "lecture" }; // Start session
        res.json("Success");
      } else {
        res.status(401).json("The Password is incorrect");
      }
    } else {
      res.status(404).json("No record existed");
    }
  });
});

// Signup route for students
app.post("/ssignup", (req, res) => {
  StudentModel.create(req.body)
    .then((students) => res.json(students))
    .catch((err) => res.status(500).json(err));
});

// Signup route for lectures
app.post("/lsignup", (req, res) => {
  LecturesModel.create(req.body)
    .then((lectures) => res.json(lectures))
    .catch((err) => res.status(500).json(err));
});

// Middleware to check if user is logged in
function authenticate(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json("Unauthorized. Please login.");
  }
}

// Example of a protected route
app.get("/protected", authenticate, (req, res) => {
  res.json(`Hello, user with ID: ${req.session.user.id}`);
});

// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out.");
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.status(200).send("Logged out successfully.");
  });
});

// Fetch exam details by examid
app.post('/createexam', async (req, res) => {
    try {
        const { Examid, ExamName, marks, Duration, Questions } = req.body;

        // Create a new exam document
        const newExam = new Exam({
            Examid,
            ExamName,
            marks,
            Duration,
            Questions,
        });

        // Save the exam document to the database
        await newExam.save();

        res.status(201).json({ message: 'Exam created successfully', exam: newExam });
    } catch (error) {
        console.error('Error creating exam:', error);
        res.status(500).json({ message: 'Error creating exam', error: error.message });
    }
});

// Sample route to get all exams
app.get('/finalexam', async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Error fetching exams', error: error.message });
    }
});
// Express route to submit exam answers and calculate result
app.post('/attend-exam', async (req, res) => {
    const { examId, studentAnswers } = req.body;
    try {
        // Fetch the exam details
        const exam = await Exam.findById(examId); // Assuming Exam is a model

        if (!exam) return res.status(404).send('Exam not found');

        // Calculate the score
        let score = 0;
        exam.questions.forEach((question, index) => {
            if (question.correctAnswer === studentAnswers[index]) {
                score++;
            }
        });

        res.json({ score, totalQuestions: exam.questions.length });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});
app.get('/api/exams/:Examid', async (req, res) => {
    try {
      const { Examid } = req.params;
  
      // Fetch the exam using Examid
      const exam = await Exam.findOne({ Examid });
  
      if (!exam) {
        return res.status(404).send('Exam not found');
      }
  
      res.json(exam);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

// Route for attending the exam and submitting answers
app.post('attendexam/:Examid', async (req, res) => {
    const { Examid, studentAnswers } = req.body;
  
    try {
      // Fetch the exam details
      const exam = await Exam.findOne({ Examid });
  
      if (!exam) {
        return res.status(404).send('Exam not found');
      }
  
      // Calculate the score
      let score = 0;
      exam.Questions.forEach((question, index) => {
        if (question.correctAnswer === studentAnswers[index]) {
          score++;
        }
      });
  
      res.json({
        score,
        totalQuestions: exam.Questions.length,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  

// Start server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
