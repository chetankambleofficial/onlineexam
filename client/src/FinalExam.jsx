
  
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FinalExam = () => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axios.get('http://localhost:3001/finalexam');
                setExams(response.data);
            } catch (error) {
                console.error('Error fetching exams:', error);
            }
        };

        fetchExams();
    }, []);

    return (
        <div>
            <h2>Available Final Exams</h2>
            <ul>
                {exams.map((exam) => (
                    <li key={exam._id}>
                        <button onClick={() => window.location.href = `/attendexam/${exam.Examid}`}>
                            {exam.ExamName}
                        </button>
                        <Link to="/ExamRoom" className="text-blue-500">Python Exam</Link> {/* Use 'to' prop for navigation */}
   
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FinalExam;

    
