import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LsignUp() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const lid = formData.get("lid");
    const lname = formData.get("lname");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const age = formData.get("age");
    const password = formData.get("password");

    axios
      .post("http://localhost:3001/lsignup", { lid, lname, email, phone, age, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/llogin");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 shadow-2xl rounded-xl max-w-lg w-full"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Lecturer Sign-Up
        </h1>
        <form onSubmit={handleSubmit} className="h-[80vh]">
          <div className="mb-6">
            <label
              htmlFor="lid"
              className="block text-gray-700 font-semibold mb-2"
            >
              Lecture ID
            </label>
            <input
              type="text"
              name="lid"
              id="lid"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition"
              placeholder="Enter your lecture ID"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="lname"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="lname"
              id="lname"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition"
              placeholder="Enter your name"
              required
            />
          </div>
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
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold mb-2"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition"
              placeholder="Enter your phone number"
              pattern="\d{10}"
              title="Enter a valid 10-digit phone number"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="age"
              className="block text-gray-700 font-semibold mb-2"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition"
              placeholder="Enter your age"
              min="18"
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
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition"
              placeholder="Enter your password"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition transform duration-200"
          >
            Register
          </motion.button>
        </form>
        <div className="mt-6 text-center">
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
            <Link
              to="/llogin"
              className="text-blue-500 hover:text-blue-700 font-medium transition"
            >
              Already have an account? Login here
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default LsignUp;
