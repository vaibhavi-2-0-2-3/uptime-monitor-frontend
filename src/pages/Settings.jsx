import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    telegramAlerts: false
  });
  const [theme, setTheme] = useState('dark');
  const [apiKey, setApiKey] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUserData();
    loadTheme();
  }, [token, navigate]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setProfileForm({
        name: response.data.username || '',
        email: response.data.email || ''
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to load user data');
      console.error('Error fetching user data:', err);
      setLoading(false);
    }
  };

  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light-theme', savedTheme === 'light');
  };

  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      setSuccess(message);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.patch('/user/update', profileForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('Profile updated successfully');
      fetchUserData(); // Refresh user data
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    setSaving(true);
    try {
      await axios.patch('/user/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('Password changed successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to change password', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationToggle = async (setting) => {
    const newSettings = {
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    };
    setNotificationSettings(newSettings);
    
    try {
      await axios.patch('/user/preferences', {
        notifications: newSettings
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('Notification settings updated');
    } catch (err) {
      showToast('Failed to update notification settings', 'error');
      // Revert the change
      setNotificationSettings(notificationSettings);
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light-theme', newTheme === 'light');
    showToast(`Theme changed to ${newTheme} mode`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('theme');
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') {
      showToast('Please type DELETE to confirm account deletion', 'error');
      return;
    }
    
    try {
      await axios.delete('/user/delete', {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('token');
      localStorage.removeItem('theme');
      navigate('/');
      showToast('Account deleted successfully');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete account', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[color:var(--bg-primary)]">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[color:var(--text-secondary)]">Loading settings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[color:var(--bg-primary)]">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-[color:var(--bg-secondary)] border-b border-[color:var(--border-color)] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-tertiary)]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-[color:var(--text-primary)]">Settings</h1>
            </div>
          </div>
        </header>

        {/* Toast Notifications */}
        {success && (
          <div className="alert-success fixed top-4 right-4 z-50">
            <p className="text-[color:var(--accent-green)] text-sm">{success}</p>
          </div>
        )}
        {error && (
          <div className="alert-error fixed top-4 right-4 z-50">
            <p className="text-[color:var(--accent-red)] text-sm">{error}</p>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Profile Section */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-[color:var(--text-primary)] mb-4">Profile</h2>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-[color:var(--accent-green)] rounded-full flex items-center justify-center text-[color:var(--bg-primary)] text-xl font-bold">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{user?.username}</h3>
                  <p className="text-[color:var(--text-secondary)]">{user?.email}</p>
                </div>
              </div>
              
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label htmlFor="name" className="label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                    className="input w-full"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary"
                >
                  {saving ? 'Saving...' : 'Update Profile'}
                </button>
              </form>
            </div>

            {/* Password Change */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-[color:var(--text-primary)] mb-4">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    className="input w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="label">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    className="input w-full"
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="label">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    className="input w-full"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary"
                >
                  {saving ? 'Changing...' : 'Change Password'}
                </button>
              </form>
            </div>

            {/* Notification Settings */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-[color:var(--text-primary)] mb-4">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[color:var(--text-primary)] font-medium">Email Alerts</h3>
                    <p className="text-[color:var(--text-secondary)] text-sm">Receive email notifications when monitors go down</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('emailAlerts')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notificationSettings.emailAlerts ? 'bg-[color:var(--accent-green)]' : 'bg-[color:var(--bg-tertiary)]'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[color:var(--text-primary)] font-medium">SMS Alerts</h3>
                    <p className="text-[color:var(--text-secondary)] text-sm">Receive SMS notifications (coming soon)</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('smsAlerts')}
                    disabled
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-[color:var(--bg-tertiary)] opacity-50 cursor-not-allowed"
                  >
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[color:var(--text-primary)] font-medium">Telegram Alerts</h3>
                    <p className="text-[color:var(--text-secondary)] text-sm">Receive Telegram notifications (coming soon)</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('telegramAlerts')}
                    disabled
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-[color:var(--bg-tertiary)] opacity-50 cursor-not-allowed"
                  >
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Theme Settings */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-[color:var(--text-primary)] mb-4">Theme Settings</h2>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[color:var(--text-primary)] font-medium">Dark Mode</h3>
                  <p className="text-[color:var(--text-secondary)] text-sm">Toggle between dark and light themes</p>
                </div>
                <button
                  onClick={handleThemeToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    theme === 'dark' ? 'bg-[color:var(--accent-green)]' : 'bg-[color:var(--bg-tertiary)]'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>

            {/* API Key Management */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-[color:var(--text-primary)] mb-4">API Key Management</h2>
              <div className="space-y-4">
                <div>
                  <label className="label">
                    Your API Key
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={apiKey || '••••••••••••••••••••••••••••••••'}
                      readOnly
                      className="input flex-1 font-mono text-sm"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(apiKey)}
                      className="btn-secondary"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <button className="btn-secondary">
                  Regenerate API Key
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card p-6 border border-[color:var(--accent-red)]/30">
              <h2 className="text-xl font-bold text-[color:var(--accent-red)] mb-4">Danger Zone</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-[color:var(--text-primary)] font-medium mb-2">Delete Account</h3>
                  <p className="text-[color:var(--text-secondary)] text-sm mb-4">
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="btn-danger"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="card p-6">
              <button
                onClick={handleLogout}
                className="btn-secondary w-full"
              >
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowDeleteModal(false)}>
          <div className="card p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-[color:var(--accent-red)] mb-4">Delete Account</h2>
            <p className="text-[color:var(--text-secondary)] mb-4">
              This action cannot be undone. All your monitors, data, and settings will be permanently deleted.
            </p>
            <div className="space-y-4">
              <div>
                <label className="label">
                  Type "DELETE" to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  className="input w-full"
                  placeholder="DELETE"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirm !== 'DELETE'}
                  className="btn-danger disabled:opacity-50"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
