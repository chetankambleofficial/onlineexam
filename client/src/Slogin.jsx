import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


function SLogin() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    axios
      .post("http://localhost:3001/Slogin", { email, password })
      .then((result) => {
        if (result.data === "Success") {
          // Store user role in localStorage
          localStorage.setItem("user", JSON.stringify({ email, role: "student" }));
          navigate("/shome"); // Redirect to student home page
        } else {
          alert(result.data);
        }
      })
      .catch((err) => console.error("Error:", err));
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-600 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 shadow-2xl rounded-xl max-w-lg w-full"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Student Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500 transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500 transition"
              placeholder="Enter your password"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition transform duration-200"
          >
            Login
          </motion.button>
        </form>
        <div className="mt-6 text-center">
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
            <Link
              to="/Ssignup"
              className="text-green-500 hover:text-green-700 font-medium transition"
            >
              Don't have an account? Register here
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default SLogin;
