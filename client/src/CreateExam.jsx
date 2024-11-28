// src/components/ExamCreateForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateExam = () => {
    const [Examid, setExamid] = useState('');
    const [ExamName, setExamName] = useState('');
    const [marks, setMarks] = useState('');
    const [Duration, setDuration] = useState('');
    const [Questions, setQuestions] = useState([
        {
            questionText: '',
            options: ['', '', '', ''],
            correctAnswer: ''
        }
    ]);

    // Handle input changes for exam details
    const handleExamInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Examid') setExamid(value);
        if (name === 'ExamName') setExamName(value);
        if (name === 'marks') setMarks(value);
        if (name === 'Duration') setDuration(value);
    };

    // Handle input changes for questions and options
    const handleQuestionInputChange = (index, field, value) => {
        const updatedQuestions = [...Questions];
        if (field === 'questionText') {
            updatedQuestions[index].questionText = value;
        } else if (field === 'correctAnswer') {
            updatedQuestions[index].correctAnswer = value;
        } else {
            updatedQuestions[index].options[field] = value;
        }
        setQuestions(updatedQuestions);
    };

    // Add new question
    const addQuestion = () => {
        setQuestions([...Questions, {
            questionText: '',
            options: ['', '', '', ''],
            correctAnswer: ''
        }]);
    };

    // Remove question
    const removeQuestion = (index) => {
        const updatedQuestions = Questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const examData = { Examid, ExamName, marks, Duration, Questions };

        try {
            const response = await axios.post('http://localhost:3001/createexam', examData);
            alert('Exam created successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error creating exam:', error);
            alert('Failed to create exam');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Create Exam for Lecturers</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Exam Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="Examid" className="block text-sm font-medium text-gray-700">Exam ID:</label>
                        <input
                            type="text"
                            id="Examid"
                            name="Examid"
                            value={Examid}
                            onChange={handleExamInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="ExamName" className="block text-sm font-medium text-gray-700">Exam Name:</label>
                        <input
                            type="text"
                            id="ExamName"
                            name="ExamName"
                            value={ExamName}
                            onChange={handleExamInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="marks" className="block text-sm font-medium text-gray-700">Marks:</label>
                        <input
                            type="text"
                            id="marks"
                            name="marks"
                            value={marks}
                            onChange={handleExamInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="Duration" className="block text-sm font-medium text-gray-700">Duration:</label>
                        <input
                            type="text"
                            id="Duration"
                            name="Duration"
                            value={Duration}
                            onChange={handleExamInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                </div>

                {/* Questions Section */}
                <div id="questionsContainer">
                    {Questions.map((question, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                            <div>
                                <label htmlFor={`questionText${index}`} className="block text-sm font-medium text-gray-700">Question Text:</label>
                                <input
                                    type="text"
                                    id={`questionText${index}`}
                                    value={question.questionText}
                                    onChange={(e) =>
                                        handleQuestionInputChange(index, 'questionText', e.target.value)
                                    }
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {question.options.map((option, i) => (
                                    <div key={i}>
                                        <label htmlFor={`option${i}${index}`} className="block text-sm font-medium text-gray-700">Option {i + 1}:</label>
                                        <input
                                            type="text"
                                            id={`option${i}${index}`}
                                            value={option}
                                            onChange={(e) =>
                                                handleQuestionInputChange(index, i, e.target.value)
                                            }
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label htmlFor={`correctAnswer${index}`} className="block text-sm font-medium text-gray-700">Correct Answer:</label>
                                <input
                                    type="text"
                                    id={`correctAnswer${index}`}
                                    value={question.correctAnswer}
                                    onChange={(e) =>
                                        handleQuestionInputChange(index, 'correctAnswer', e.target.value)
                                    }
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeQuestion(index)}
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                Remove Question
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                >
                    Add Question
                </button>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Create Exam
                </button>
            </form>
        </div>
    );
};

export default CreateExam;
