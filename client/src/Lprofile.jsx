import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Check if the user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "lecturer") {
      // Redirect to login if the user is not logged in or not a lecturer
      navigate("/llogin");
    } else {
      setUserData(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear the localStorage and navigate to login page
    localStorage.removeItem("user");
    navigate("/llogin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4">
      <div className="bg-white p-8 shadow-2xl rounded-xl max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Lecturer Profile
        </h1>
        {userData ? (
          <div>
            <p className="text-lg font-semibold mb-4">Welcome, Lecturer!</p>
            <p className="text-md">Email: {userData.email}</p>
            {/* You can add more fields as needed */}
            <div className="mt-6 text-center">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default LProfile;
