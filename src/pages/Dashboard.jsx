import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import MonitorPanel from "../components/MonitorPanel";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editModal, setEditModal] = useState({ open: false, monitor: null });
  const [editForm, setEditForm] = useState({ name: "", url: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchDashboardData();
  }, [token, navigate]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("/monitors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMonitors(response.data);
    } catch (err) {
      setError("Failed to fetch dashboard data. Please try again.");
      console.error("Error fetching monitors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (monitorId) => {
    if (!window.confirm("Are you sure you want to delete this monitor?")) {
      return;
    }

    try {
      await axios.delete(`/monitors/${monitorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMonitors(monitors.filter((m) => m._id !== monitorId));
    } catch (err) {
      alert("Failed to delete monitor. Please try again.");
      console.error("Error deleting monitor:", err);
    }
  };

  const handlePauseResume = async (monitorId) => {
    try {
      await axios.patch(
        `/monitors/${monitorId}/pause`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMonitors(
        monitors.map((m) =>
          m._id === monitorId ? { ...m, isPaused: !m.isPaused } : m
        )
      );
    } catch (err) {
      alert("Failed to update monitor status. Please try again.");
      console.error("Error updating monitor:", err);
    }
  };

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
    try {
      await axios.patch(
        `/monitors/${editModal.monitor._id}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMonitors(
        monitors.map((m) =>
          m._id === editModal.monitor._id
            ? { ...m, name: editForm.name, url: editForm.url }
            : m
        )
      );
      closeEditModal();
    } catch (err) {
      alert("Failed to update monitor. Please try again.");
      console.error("Error updating monitor:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[color:var(--bg-primary)]">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[color:var(--text-secondary)]">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[color:var(--bg-primary)]">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-[color:var(--bg-secondary)] border-b border-[color:var(--border-color)] px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-[color:var(--text-primary)]">Monitors</h1>
              <button
                onClick={() => navigate('/create-monitor')}
                className="btn-primary"
              >
                + Add Monitor
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/');
                }}
                className="text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors px-4 py-2 rounded-lg hover:bg-[color:var(--bg-tertiary)]"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 space-y-6">
          {error && (
            <div className="alert-error">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {monitors.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-bold text-[color:var(--text-primary)] mb-2">
                No monitors yet
              </h2>
              <p className="text-[color:var(--text-secondary)] mb-6">
                Get started by creating your first monitor to track your website's uptime.
              </p>
              <button
                onClick={() => navigate('/create-monitor')}
                className="btn-primary"
              >
                Create Your First Monitor
              </button>
            </div>
          ) : (
            <div>
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeEditModal}>
          <div className="card p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-[color:var(--text-primary)] mb-4">
              Edit Monitor
            </h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label htmlFor="edit-name" className="label">
                  Monitor Name
                </label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-url" className="label">
                  URL
                </label>
                <input
                  type="url"
                  id="edit-url"
                  name="url"
                  value={editForm.url}
                  onChange={handleEditChange}
                  className="w-full"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
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
