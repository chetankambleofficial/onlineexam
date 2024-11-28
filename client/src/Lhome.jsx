import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function LHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = () => {
    axios.post('http://localhost:3001/logout')
      .then(() => {
        // Clear localStorage if needed
        localStorage.removeItem('user');
        navigate('/llogin'); // Redirect using navigate
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
        <div className="text-3xl font-semibold text-center text-white">LHome</div>
        <ul className="space-y-4">
          <li>
            <Link
              to="/createexam"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Add Examinations
            </Link>
          </li>
          <li>
            <Link
              to="/manage-students"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Manage Students
            </Link>
          </li>
          <li>
            <Link
              to="/issue-notice"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Issue Notice for Students
            </Link>
          </li>
          <li>
            <Link
              to="/upload-modules"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Upload Modules
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
        <h1 className="text-4xl font-semibold text-gray-800">Lecturer Home</h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome to your dashboard. Here you can manage examinations, students, notices, and upload learning modules.
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

export default LHome;
