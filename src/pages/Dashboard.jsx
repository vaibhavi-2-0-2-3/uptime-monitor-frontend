import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const Dashboard = () => {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // 🔐 Get token
  const token = localStorage.getItem("token");

  const fetchDashboardData = async () => {
    if (!token) {
      setError("Not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      setError("");
      setLoading(true);

      console.log("🔍 Fetching user info...");
      // 1️⃣ Get user info
      const userRes = await axios.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ User info:", userRes.data);
      setUser(userRes.data);

      console.log("🔍 Fetching monitors...");
      // 2️⃣ Get monitors
      const monitorsRes = await axios.get("/monitors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ Monitors:", monitorsRes.data);
      setMonitors(monitorsRes.data || []);
    } catch (err) {
      console.error("❌ Dashboard fetch error:", err);
      setError(
        err.response?.data?.message ||
        "Failed to fetch dashboard data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [token]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading && !refreshing) {
        fetchDashboardData();
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [loading, refreshing]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  const handleAddMonitor = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/monitors",
        { url: newUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMonitors([...monitors, res.data]);
      setNewUrl("");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add monitor";
      alert(errorMessage);
    }
  };

  const handleTestEmail = async () => {
    try {
      const res = await axios.post(
        "/monitors/test-email",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Test email sent! Check your inbox.");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to send test email";
      alert(errorMessage);
    }
  };

  const formatLastChecked = (timestamp) => {
    if (!timestamp) return "Never";
    const diff = Math.floor((Date.now() - new Date(timestamp)) / 60000);
    if (diff < 1) return "Just now";
    if (diff === 1) return "1 min ago";
    if (diff < 60) return `${diff}m ago`;
    const hours = Math.floor(diff / 60);
    if (hours === 1) return "1 hour ago";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">
        Welcome{user ? `, ${user.username}` : ""}!
      </h1>
      <p className="text-gray-600 mb-6">
        {user?.email ? `Email: ${user.email}` : ""}
      </p>

      {/* 🔘 Add Monitor Form */}
      <form
        onSubmit={handleAddMonitor}
        className="mb-6 flex flex-col sm:flex-row gap-4"
      >
        <input
          type="url"
          placeholder="Enter website URL"
          className="border p-2 rounded flex-1"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Monitor
        </button>
      </form>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Monitors:</h2>
        <div className="flex gap-2">
          <button
            onClick={handleTestEmail}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            📧 Test Email
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {refreshing ? "🔄 Refreshing..." : "🔄 Refresh"}
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center text-gray-500">Loading monitors...</div>
      )}

      {error && (
        <div className="text-center text-red-500 mb-4">{error}</div>
      )}

      {!loading && !error && monitors.length === 0 && (
        <div className="text-center text-gray-400">
          (No monitors yet? Add one!)
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {monitors.map((monitor) => (
          <div
            key={monitor._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-100"
          >
            <div className="flex items-center gap-2">
              <span
                className={`text-lg ${monitor.status === "up" ? "text-green-500" :
                  monitor.status === "down" ? "text-red-500" :
                    "text-gray-500"
                  }`}
                title={monitor.status === "up" ? "Up" : monitor.status === "down" ? "Down" : "Pending"}
              >
                {monitor.status === "up" ? "🟢" : monitor.status === "down" ? "🔴" : "⏳"}
              </span>
              <span className="font-medium break-all">{monitor.url}</span>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold px-2 py-1 rounded-full ${monitor.status === 'up' ? 'bg-green-100 text-green-800' :
                monitor.status === 'down' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                {monitor.status.toUpperCase()}
              </span>
              {monitor.uptime !== null && monitor.uptime !== undefined && (
                <span className="text-sm text-gray-600">
                  Uptime: <span className="font-semibold">{monitor.uptime.toFixed(1)}%</span>
                </span>
              )}
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <div>
                Name: <span className="font-semibold">{monitor.name}</span>
              </div>
              <div>
                Last checked:{" "}
                <span>
                  {monitor.lastCheckedAt
                    ? formatLastChecked(monitor.lastCheckedAt)
                    : "Never"}
                </span>
              </div>
              <div>
                Created: <span>{new Date(monitor.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
