import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function SHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState(false);
  const [isResultDropdownOpen, setIsResultDropdownOpen] = useState(false);
  
  const navigate = useNavigate(); // useNavigate hook
  
  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to toggle dropdown for Examinations
  const toggleExamDropdown = () => {
    setIsExamDropdownOpen(!isExamDropdownOpen);
  };

  // Function to toggle dropdown for Results
  const toggleResultDropdown = () => {
    setIsResultDropdownOpen(!isResultDropdownOpen);
  };

  // Logout function
  const logout = () => {
    axios.post('http://localhost:3001/logout')
      .then(() => {
        // Clear localStorage if needed
        localStorage.removeItem('user');
        navigate('/slogin'); // Use navigate here to redirect
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="bg-blue-600 text-white w-64 space-y-6 py-7 px-2 fixed top-0 left-0 h-full"
      >
        <div className="text-3xl font-semibold text-center text-white">SHome</div>
        <ul className="space-y-4">
          {/* Examinations Dropdown */}
          <li>
            <button
              onClick={toggleExamDropdown}
              className="text-white hover:text-gray-200 w-full text-left"
            >
              Examinations
            </button>
            {isExamDropdownOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link
                    to="/mockexam"
                    className="text-white hover:text-gray-200 transition duration-300"
                  >
                    Mock Exam
                  </Link>
                </li>
                <li>
                  <Link
                    to="/finalexam"
                    className="text-white hover:text-gray-200 transition duration-300"
                  >
                    Final Exam
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Results Dropdown */}
          <li>
            <button
              onClick={toggleResultDropdown}
              className="text-white hover:text-gray-200 w-full text-left"
            >
              Results
            </button>
            {isResultDropdownOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link
                    to="/mock-result"
                    className="text-white hover:text-gray-200 transition duration-300"
                  >
                    Mock Result
                  </Link>
                </li>
                <li>
                  <Link
                    to="/final-result"
                    className="text-white hover:text-gray-200 transition duration-300"
                  >
                    Final Result
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/notifications"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Notifications
            </Link>
          </li>
          <li>
            <Link
              to="/study-materials"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Study Materials
            </Link>
          </li>
        </ul>
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 p-6 ml-64">
        <div className="flex justify-between items-center mb-6">
          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="bg-blue-600 text-white px-4 py-2 rounded-md md:hidden"
          >
            {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          </button>
        </div>

        {/* Page content */}
        <h1 className="text-4xl font-semibold text-gray-800">Student Home</h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome to your student dashboard. Here you can view your exams, results, notifications, and study materials.
        </p>
        <button
          onClick={logout}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SHome;
