const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const StudentModel = require("./models/students");
const LecturesModel = require("./models/lectures");
const Exam = require('./models/exam'); 
const Notice = require('./models/Notice');// Ensure it's pointing to the correct file
const { exec } = require('child_process');
const examRoutes = require('./routes/examRoutes');
// Only require the result model once
const Result = require('./models/Result'); 
const router = express.Router();

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
app.post("/createnotice", async (req, res) => {
  const { lid, title, description } = req.body;

  console.log("Request Body:", req.body);  // Log the incoming request body

  // Validate input fields
  if (!lid || !title || !description) {
    return res.status(400).json({ message: "All fields (lid, title, description) are required." });
  }

  try {
    // Create a new notice instance
    const newNotice = new Notice({
      lid,
      title,
      description,
    });

    // Save the notice to the database
    const savedNotice = await newNotice.save();

    console.log("Notice saved:", savedNotice);
    return res.status(201).json({ message: "Notice created successfully!", notice: savedNotice });
  } catch (error) {
    console.error("Error saving notice:", error);
    return res.status(500).json({ message: "Failed to create notice." });
  }
});



// GET route to fetch all notices
app.get('/displaynotice', async (req, res) => {
  try {
    const notices = await Notice.find(); // Fetch all notices
    res.status(200).json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ message: 'Error fetching notices', error: error.message });
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
app.get('/api/exam/:id', async (req, res) => {
  try {
    const exam = await Exam.findOne({ Examid: req.params.id });
    if (!exam) return res.status(404).send('Exam not found');
    res.json(exam);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});
// Replace with the actual path to your Result schema

router.post('/api/exam/submit', async (req, res) => {
  const { studentId, name, examId, answers } = req.body;
  
  // Check if all required details are provided
  if (!studentId || !name || !examId || !answers) {
    return res.status(400).json({ message: "Missing student or exam details" });
  }

  try {
    // Calculate score (assuming you have a function to do so)
    const score = calculateScore(answers);

    // Create a new result object to store in the database
    const result = new Result({
      studentId,
      name,
      examId,
      answers,
      score,
      total: 10, // Assuming total marks are 10
    });

    // Save the result to the database
    await result.save();

    // Return the response
    res.status(200).json({ message: "Result saved successfully", score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving result" });
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
  

// Endpoint to run code and validate test cases
app.post('/run-code', (req, res) => {
  const { code, language, testCases } = req.body;

  // Create a temporary file for the code
  const fs = require('fs');
  const filePath = `./temp.${language}`;

  // Write the code to the file
  fs.writeFileSync(filePath, code);

  let command;
  if (language === 'javascript') {
      command = `node ${filePath}`;
  } else if (language === 'python') {
      command = `python ${filePath}`;
  }

  // Execute the code
  exec(command, (error, stdout, stderr) => {
      if (error) {
          return res.status(500).json({ error: stderr });
      }

      const results = testCases.map((testCase, index) => {
          const output = stdout.trim(); // Assuming output from code execution is valid
          const isPassed = output === testCase.expected;
          return {
              input: testCase.input,
              expected: testCase.expected,
              output,
              passed: isPassed,
          };
      });

      // Remove the temporary file after execution
      fs.unlinkSync(filePath);

      // Send back the results
      res.json({ results });
    });
  });
  module.exports = router;
// Start server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
