import React, { useState } from 'react';

const AttendExam = ({ examId }) => {
  const [exam, setExam] = useState(null);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');

  // Fetch the exam details
  const fetchExam = async () => {
    try {
      const response = await fetch(`http://localhost:3001/attendexam/${examId}`);
      if (!response.ok) throw new Error('Exam not found');
      const data = await response.json();
      setExam(data);
      setStudentAnswers(new Array(data.Questions.length).fill(''));
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle answer change
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...studentAnswers];
    updatedAnswers[index] = value;
    setStudentAnswers(updatedAnswers);
  };

  // Submit the exam
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/exams/attend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Examid: examId, studentAnswers }),
      });

      if (!response.ok) throw new Error('Failed to submit answers');
      const result = await response.json();
      setScore(result.score);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch exam on component load
  React.useEffect(() => {
    fetchExam();
  }, [examId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!exam) {
    return <div>Loading exam...</div>;
  }

  return (
    <div>
      <h1>Attend Exam: {exam.ExamName}</h1>
      <form onSubmit={handleSubmit}>
        {exam.Questions.map((question, index) => (
          <div key={index}>
            <p>{question.questionText}</p>
            {question.options.map((option, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {score !== null && (
        <div>
          <h2>Your Score: {score} / {exam.Questions.length}</h2>
        </div>
      )}
    </div>
  );
};

export default AttendExam;
