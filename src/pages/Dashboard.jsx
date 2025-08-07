import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const Dashboard = () => {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [editModal, setEditModal] = useState({ open: false, monitor: null });
  const [editForm, setEditForm] = useState({ name: "", url: "" });
  const [editLoading, setEditLoading] = useState(false);

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

      // 1️⃣ Get user info
      const userRes = await axios.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data);

      // 2️⃣ Get monitors
      const monitorsRes = await axios.get("/monitors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMonitors(monitorsRes.data || []);
    } catch (err) {
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

  // DELETE MONITOR
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this monitor?")) return;
    try {
      await axios.delete(`/monitors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMonitors(monitors.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete monitor");
    }
  };

  // PAUSE/RESUME MONITOR
  const handlePauseResume = async (id) => {
    try {
      const res = await axios.patch(`/monitors/${id}/pause`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMonitors(monitors.map((m) => (m._id === id ? res.data : m)));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to pause/resume monitor");
    }
  };

  // EDIT MONITOR
  const openEditModal = (monitor) => {
    setEditForm({ name: monitor.name, url: monitor.url });
    setEditModal({ open: true, monitor });
  };
  const closeEditModal = () => {
    setEditModal({ open: false, monitor: null });
    setEditForm({ name: "", url: "" });
  };
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const res = await axios.patch(
        `/monitors/${editModal.monitor._id}`,
        { name: editForm.name, url: editForm.url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMonitors(monitors.map((m) => (m._id === res.data._id ? res.data : m)));
      closeEditModal();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update monitor");
    } finally {
      setEditLoading(false);
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
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {refreshing ? "🔄 Refreshing..." : "🔄 Refresh"}
        </button>
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
              {monitor.isPaused && (
                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Paused</span>
              )}
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

            {/* Action Buttons */}
            <div className="flex gap-2 mt-2">
              <button
                title={monitor.isPaused ? "Resume" : "Pause"}
                onClick={() => handlePauseResume(monitor._id)}
                className={`px-2 py-1 rounded text-sm font-semibold border ${monitor.isPaused ? "bg-green-100 text-green-800 border-green-300" : "bg-yellow-100 text-yellow-800 border-yellow-300"}`}
              >
                {monitor.isPaused ? "▶️ Resume" : "⏸️ Pause"}
              </button>
              <button
                title="Edit"
                onClick={() => openEditModal(monitor)}
                className="px-2 py-1 rounded text-sm font-semibold border bg-blue-100 text-blue-800 border-blue-300"
              >
                ✏️ Edit
              </button>
              <button
                title="Delete"
                onClick={() => handleDelete(monitor._id)}
                className="px-2 py-1 rounded text-sm font-semibold border bg-red-100 text-red-800 border-red-300"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Monitor</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  name="url"
                  value={editForm.url}
                  onChange={handleEditChange}
                  className="border p-2 rounded w-full"
                  type="url"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  disabled={editLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                  disabled={editLoading}
                >
                  {editLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
