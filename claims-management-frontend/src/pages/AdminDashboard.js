import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AdminDashboard() {
  const navigate = useNavigate();
  const [purchasedPolicies, setPurchasedPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPurchasedPolicies = async () => {
      try {
        const response = await api.get("/admin/purchased-policies");
        setPurchasedPolicies(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch policies.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedPolicies();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Admin Navbar */}
      <nav className="bg-blue-700 text-white px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-6">
          <button onClick={() => navigate("/admin-dashboard")} className="hover:text-gray-300 transition">
            🏠 Dashboard
          </button>
          <button onClick={() => navigate("/admin/manage-policies")} className="hover:text-gray-300 transition">
            📜 Manage Policies
          </button>
          <button onClick={() => navigate("/admin/manage-claims")} className="hover:text-gray-300 transition">
            📂 Manage Claims
          </button>
          <button onClick={() => navigate("/admin/create-policy")} className="hover:text-gray-300 transition">
            ➕ Create Policy
          </button>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition duration-200"
          >
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* Main container with left, center, and right sections */}
      <div className="flex flex-1 mt-8">
        {/* Left Creative Sidebar */}
        <aside className="hidden lg:block w-1/6 p-4">
          <div className="bg-blue-50 p-4 rounded-md shadow">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Admin Tips</h2>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li>🔍 Regularly review policies</li>
              <li>🛡️ Enhance security</li>
              <li>📊 Monitor claims</li>
              <li>💡 Stay updated</li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">All Purchased Policies</h2>

            {error && (
              <p className="text-red-500 text-center mt-4 bg-red-100 p-2 rounded-md">{error}</p>
            )}

            {loading ? (
              <div className="flex justify-center items-center mt-6">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
              </div>
            ) : purchasedPolicies.length > 0 ? (
              <div className="mt-6 space-y-8">
                {purchasedPolicies.map((user) => (
                  <div key={user.userId} className="p-6 border border-gray-300 rounded-lg shadow-md bg-gray-50">
                    <h3 className="text-lg font-semibold text-blue-700">
                      {user.userName} (User ID: {user.userId})
                    </h3>

                    <table className="w-full mt-4 border-collapse border border-gray-300">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="border border-gray-300 px-4 py-2 text-left">Policy Number</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Coverage</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Cost</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.purchasedPolicies.map((policy) => (
                          <tr key={policy._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{policy.policyNumber}</td>
                            <td className="border border-gray-300 px-4 py-2">{policy.type}</td>
                            <td className="border border-gray-300 px-4 py-2">${policy.coverageAmount}</td>
                            <td className="border border-gray-300 px-4 py-2">${policy.cost || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{new Date(policy.startDate).toLocaleDateString()}</td>
                            <td className="border border-gray-300 px-4 py-2">{new Date(policy.endDate).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-6">No policies have been purchased yet.</p>
            )}
          </div>
        </main>

        {/* Right Creative Sidebar */}
        <aside className="hidden lg:block w-1/6 p-4">
          <div className="bg-blue-50 p-4 rounded-md shadow">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Did You Know?</h2>
            <p className="text-blue-700 text-sm">
              Insurance not only provides security but also boosts economic growth by mitigating financial risks.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AdminDashboard;
