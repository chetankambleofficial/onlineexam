import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DisplayNotice = () => {
    const [notices, setNotices] = useState([]); // Define state to store notices

    useEffect(() => {
        const fetchNotices = async () => { // Match the function name to the one used in useEffect
            try {
                const response = await axios.get('http://localhost:3001/displaynotice');
                setNotices(response.data); // Store the fetched notices in state
            } catch (error) {
                console.error('Error fetching notice:', error);
            }
        };

        fetchNotices(); // Call the function to fetch notices
    }, []); // Empty dependency array means it runs only once when the component mounts

    return (
        <div className="p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-3xl font-semibold mb-6">Notices From Lectures</h2>
            <ul className="space-y-4">
                {notices.length > 0 ? (
                    notices.map((notice) => (
                        <li key={notice._id} className="border-b py-4">
                            <h3 className="text-xl font-medium">{notice.title}</h3>
                            <p className="text-gray-600">{notice.description}</p>
                           <label className='text-xs'>Published Date</label> <p className="text-gray-600">{notice.createAt}</p>
                            <Link to="/ExamRoom" className="text-blue-500 mt-2 inline-block">Go to Exam Room</Link>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No notices available</p>
                )}
            </ul>
        </div>
    );
};

export default DisplayNotice;
