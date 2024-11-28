import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SExam() {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
   
    axios.get(`http://localhost:3001/api/exam/E02`)
      .then((response) => {
        setExam(response.data);
        setAnswers(Array(response.data.Questions.length).fill(''));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmitDetails = () => {
    if (!studentName || !studentId) {
      alert('Please enter your name and ID');
      return;
    }

    localStorage.setItem('studentName', studentName);
    localStorage.setItem('studentId', studentId);
    setIsRegistered(true);
  };

  const handleChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Ensure answers2 is initialized before use
    const answers2 = [...answers]; // Example initialization of 'answers2'
  
    const studentId = localStorage.getItem('studentId');
    const studentName = localStorage.getItem('studentName');
    const examId = exam.Examid;
  
    if (!studentId || !studentName || !examId) {
      alert("Missing student or exam details");
      return;
    }
  
    // Log the payload for debugging
    console.log("Submitting exam with payload:", {
      studentId,
      name: studentName,
      examId,
      answers: answers2,
    });
  
    // Sending the data to the backend
    axios.post('http://localhost:3001/api/exam/submit', {
      studentId,
      name: studentName,
      examId,
      answers: answers2,
    })
    .then((response) => {
      console.log('Exam submitted successfully', response.data);
    })
    .catch((error) => {
      console.error('Error submitting exam:', error);
    });
  };
  
  

  if (!isRegistered) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Enter Your Details</h1>
        <input
          type="text"
          placeholder="Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="block mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="block mb-4 p-2 border rounded"
        />
        <button
          onClick={handleSubmitDetails}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Start Exam
        </button>
      </div>
    );
  }

  if (!exam) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{exam.ExamName}</h1>
      <p className="text-lg mb-6">Duration: {exam.Duration}</p>

      {exam.Questions.map((q, index) => (
        <div key={index} className="mb-4">
          <p className="text-lg font-medium">{index + 1}. {q.questionText}</p>
          {q.options.map((option, idx) => (
            <label key={idx} className="block">
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={answers[index] === option}
                onChange={() => handleChange(index, option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Submit Exam
      </button>

      {score && (
        <div className="mt-6 text-lg">
          <p>Score: {score.score} / {score.total}</p>
        </div>
      )}
    </div>
  );
}

export default SExam;
