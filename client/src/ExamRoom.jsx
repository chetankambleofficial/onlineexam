import React, { useState, useEffect } from "react";
// src/index.js or src/App.js
import "./index.css";

const ExamRoom = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Fetch questions from the backend
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/questions");
        const data = await response.json();
        if (data.length > 0) {
          setQuestions(data[0].questions); // Assuming only one exam for now
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center text-xl text-gray-600 mt-8">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Online Exam - Python Programming
      </h1>

      {showResult ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Exam Completed</h2>
          <p className="text-xl">
            Your Score: <span className="font-bold">{score}</span> /{" "}
            {questions.length}
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-medium mb-4">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <p className="text-lg mb-4">
            {questions[currentQuestionIndex].question}
          </p>

          <div className="space-y-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  className="h-5 w-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={`option-${index}`} className="text-lg">
                  {option}
                </label>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleNextQuestion}
              disabled={!selectedOption}
              className={`px-6 py-2 text-white rounded-lg ${
                selectedOption
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Submit"
                : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamRoom;
