import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Sidebar from '../components/Sidebar';

const CreateMonitor = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    frequency: '1',
    timeout: '30',
    retries: '3',
    expectedStatus: '200',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // For now, we'll use the existing API which only accepts URL
      // The backend will auto-generate the name from the URL
      const response = await axios.post('/monitors', {
        url: formData.url
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Monitor created:', response.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create monitor');
      console.error('Error creating monitor:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    return formData.url.trim() !== '';
  };

  return (
    <div className="flex h-screen bg-bg-primary">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-bg-secondary border-b border-border-color px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-text-primary">Create New Monitor</h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-text-secondary">Welcome back!</span>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/');
                }}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto">
            <div className="panel p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Monitor Configuration
                </h2>
                <p className="text-text-secondary">
                  Set up a new monitor to track your website's uptime and performance.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <p className="text-accent-red">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Basic Information</h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                        Monitor Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="My Website Monitor"
                        className="input-dark w-full"
                      />
                      <p className="text-xs text-text-muted mt-1">
                        Leave empty to auto-generate from URL
                      </p>
                    </div>

                    <div>
                      <label htmlFor="url" className="block text-sm font-medium text-text-primary mb-2">
                        URL to Monitor *
                      </label>
                      <input
                        type="url"
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        required
                        className="input-dark w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
                        Description (Optional)
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Brief description of what this monitor tracks..."
                        rows={3}
                        className="input-dark w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Monitoring Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Monitoring Settings</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="frequency" className="block text-sm font-medium text-text-primary mb-2">
                        Check Frequency
                      </label>
                      <select
                        id="frequency"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                        className="input-dark w-full"
                      >
                        <option value="1">Every 1 minute</option>
                        <option value="5">Every 5 minutes</option>
                        <option value="15">Every 15 minutes</option>
                        <option value="30">Every 30 minutes</option>
                        <option value="60">Every 1 hour</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="timeout" className="block text-sm font-medium text-text-primary mb-2">
                        Timeout (seconds)
                      </label>
                      <select
                        id="timeout"
                        name="timeout"
                        value={formData.timeout}
                        onChange={handleChange}
                        className="input-dark w-full"
                      >
                        <option value="10">10 seconds</option>
                        <option value="30">30 seconds</option>
                        <option value="60">60 seconds</option>
                        <option value="120">2 minutes</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="retries" className="block text-sm font-medium text-text-primary mb-2">
                        Retry Attempts
                      </label>
                      <select
                        id="retries"
                        name="retries"
                        value={formData.retries}
                        onChange={handleChange}
                        className="input-dark w-full"
                      >
                        <option value="1">1 retry</option>
                        <option value="2">2 retries</option>
                        <option value="3">3 retries</option>
                        <option value="5">5 retries</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="expectedStatus" className="block text-sm font-medium text-text-primary mb-2">
                        Expected Status Code
                      </label>
                      <select
                        id="expectedStatus"
                        name="expectedStatus"
                        value={formData.expectedStatus}
                        onChange={handleChange}
                        className="input-dark w-full"
                      >
                        <option value="200">200 (OK)</option>
                        <option value="201">201 (Created)</option>
                        <option value="204">204 (No Content)</option>
                        <option value="301">301 (Moved Permanently)</option>
                        <option value="302">302 (Found)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Alert Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Alert Settings</h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="emailAlerts"
                        defaultChecked
                        className="rounded border-border-color bg-bg-secondary text-accent-green focus:ring-accent-green"
                      />
                      <label htmlFor="emailAlerts" className="text-sm text-text-primary">
                        Send email alerts when monitor goes down
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="recoveryAlerts"
                        defaultChecked
                        className="rounded border-border-color bg-bg-secondary text-accent-green focus:ring-accent-green"
                      />
                      <label htmlFor="recoveryAlerts" className="text-sm text-text-primary">
                        Send email alerts when monitor recovers
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-border-color">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={!validateForm() || loading}
                    className="btn-primary"
                  >
                    {loading ? 'Creating...' : 'Create Monitor'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateMonitor;
