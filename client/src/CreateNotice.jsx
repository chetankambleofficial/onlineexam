import React, { useState } from 'react';
import axios from 'axios';

const CreateNotice = () => {
    const [lid, setLid] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'lid') setLid(value);
        if (name === 'title') setTitle(value);
        if (name === 'description') setDescription(value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const createdAt = new Date().toISOString(); // Add a timestamp
        const noticeData = { lid, title, description, createdAt };

        try {
            const response = await axios.post('http://localhost:3001/createnotice', noticeData);
            alert('Notice created successfully!');
            console.log(response.data);
            // Reset form
            setLid('');
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error creating notice:', error);
            alert('Failed to create notice');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Create Notice for Students</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="lid" className="block text-sm font-medium text-gray-700">Lecture ID:</label>
                        <input
                            type="text"
                            id="lid"
                            name="lid"
                            value={lid}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Notice Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Create Notice
                </button>
            </form>
        </div>
    );
};

export default CreateNotice;
