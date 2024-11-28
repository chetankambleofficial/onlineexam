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
              to="/displaynotice"
              className="text-white shad hover:text-gray-200 transition duration-300"
            >
              Notifications
            </Link>
          </li>

          <li>
            <Link
              to="/console"
              className="text-white shad hover:text-gray-200 transition duration-300"
            >
              console
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
  

      {/* Content Area */}
    

        {/* Page content */}
      
      </div>
    </div>
  );
}

export default SHome;
