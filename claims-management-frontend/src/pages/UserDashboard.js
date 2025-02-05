import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function UserDashboard() {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    // Get userId and name from localStorage
    const storedUserId = localStorage.getItem("userID");
    const storedName = localStorage.getItem("name");
    
    if (!storedUserId) {
      handleLogout();
      return;
    }

    setUserId(storedUserId);
    setName(storedName || "User");

    const fetchUserPolicies = async () => {
      try {
        const response = await api.get(`/users/my-policies/${storedUserId}`);

        if (response.data?.error === "User has not purchased any policies.") {
          setPolicies([]);
          setError("No policy purchased.");
        } else {
          setPolicies(response.data);
        }
      } catch (err) {
        console.error("API Fetch Error:", err.response?.data || err.message);

        if (err.response && err.response.status === 401) {
          handleLogout();
        } else {
          setError(err.response?.data?.message || "Failed to fetch policies.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserPolicies();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* ✅ Navigation Bar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Claim Management</h1>

        <div className="flex space-x-4">
          <button onClick={() => navigate("/user-dashboard")} className="hover:text-gray-300">🏠 Dashboard</button>
          <button onClick={() => navigate("/BuyPolicy")} className="hover:text-gray-300">📜 Buy Policy</button>
          <button onClick={() => navigate("/FileClaim")} className="hover:text-gray-300">📂 File a Claim</button>
          <button onClick={() => navigate("/myclaims")} className="hover:text-gray-300"> 📂 My Claims</button>
          <button onClick={() => navigate("/profile")} className="hover:text-gray-300">👤 Profile</button>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition duration-200">
            🚪 Logout
          </button>
        </div>
      </nav>

      {/*Main Content */}
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-md flex-grow">
        <h2 className="text-2xl font-bold text-center text-gray-800">Your Policies</h2>

        {/* Show User Name */}
        <p className="text-gray-500 text-center mt-2">Welcome: <span className="font-medium">{name}</span></p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mt-4 bg-red-100 p-2 rounded-md">
            {error}
          </p>
        )}

        {/*Loading Animation */}
        {loading ? (
          <div className="flex justify-center items-center mt-6">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : policies.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {policies.map((policy) => (
              <div key={policy.policyNumber} className="p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50">
                <h3 className="text-lg font-semibold text-blue-700">{policy.type}</h3>
                <p className="text-gray-600">Policy Number: <span className="font-medium">{policy.policyNumber}</span></p>
                <p className="text-gray-600">Coverage: <span className="font-medium">${policy.coverageAmount}</span></p>
                <p className="text-gray-600">Start Date: <span className="font-medium">{new Date(policy.startDate).toLocaleDateString()}</span></p>
                <p className="text-gray-600">End Date: <span className="font-medium">{new Date(policy.endDate).toLocaleDateString()}</span></p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">You don't have any active policies.</p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
