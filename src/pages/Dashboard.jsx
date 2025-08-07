import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import MonitorPanel from "../components/MonitorPanel";

const Dashboard = () => {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  return (
    <div className="flex h-screen bg-bg-primary">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Navigation Bar */}
        <header className="bg-bg-secondary border-b border-border-color px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded hover:bg-bg-tertiary"
              >
                ☰
              </button>
              <div>
                <h1 className="text-xl font-bold text-text-primary">Monitoring</h1>
                <p className="text-text-secondary text-sm">
                  {user ? `Welcome back, ${user.username}` : 'Dashboard'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="btn-secondary text-sm"
              >
                {refreshing ? "🔄 Refreshing..." : "🔄 Refresh"}
              </button>
              <div className="text-text-secondary text-sm">
                {user?.email}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Add Monitor Form */}
          <div className="mb-8">
            <div className="panel p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Add New Monitor</h2>
              <form onSubmit={handleAddMonitor} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="url"
                  placeholder="Enter website URL (e.g., https://example.com)"
                  className="input-dark flex-1"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                >
                  Add Monitor
                </button>
              </form>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-accent-red">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="text-text-secondary">Loading monitors...</div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && monitors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-text-muted text-lg mb-2">No monitors yet</div>
              <div className="text-text-secondary">Add your first monitor to get started</div>
            </div>
          )}

          {/* Monitor Panels */}
          {!loading && !error && monitors.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-6">
                Your Monitors ({monitors.length})
              </h2>
              {monitors.map((monitor) => (
                <MonitorPanel
                  key={monitor._id}
                  monitor={monitor}
                  token={token}
                  onDelete={handleDelete}
                  onPauseResume={handlePauseResume}
                  onEdit={openEditModal}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
          <div className="modal-content p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold mb-4 text-text-primary">Edit Monitor</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-text-primary">Name</label>
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="input-dark w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-text-primary">URL</label>
                <input
                  name="url"
                  value={editForm.url}
                  onChange={handleEditChange}
                  className="input-dark w-full"
                  type="url"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="btn-secondary"
                  disabled={editLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
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
