import React, { useState } from 'react';
import MonitorAnalytics from '../pages/MonitorAnalytics';
import ResponseTimeChart from './ResponseTimeChart';

const MonitorPanel = ({ monitor, token, onDelete, onPauseResume, onEdit }) => {
  const [showAnalytics, setShowAnalytics] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'up':
        return <div className="w-3 h-3 bg-accent-green rounded-full"></div>;
      case 'down':
        return <div className="w-3 h-3 bg-accent-red rounded-full"></div>;
      default:
        return <div className="w-3 h-3 bg-accent-yellow rounded-full"></div>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'up':
        return 'text-accent-green';
      case 'down':
        return 'text-accent-red';
      default:
        return 'text-accent-yellow';
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
    <div className="panel p-6 mb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          {getStatusIcon(monitor.status)}
          <div>
            <h2 className="text-xl font-bold text-text-primary">{monitor.name}</h2>
            <p className="text-text-secondary text-sm">HTTP/S monitor for {monitor.url}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPauseResume(monitor._id)}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${monitor.isPaused
              ? 'bg-accent-green text-white hover:bg-green-600'
              : 'bg-bg-tertiary text-text-primary hover:bg-border-color border border-border-color'
              }`}
          >
            {monitor.isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          <button
            onClick={() => onEdit(monitor)}
            className="px-3 py-1.5 rounded text-sm font-medium bg-bg-tertiary text-text-primary hover:bg-border-color border border-border-color"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(monitor._id)}
            className="px-3 py-1.5 rounded text-sm font-medium bg-bg-tertiary text-accent-red hover:bg-red-900/20 border border-border-color"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="metric-card">
          <div className={`metric-value ${getStatusColor(monitor.status)}`}>
            {monitor.status.toUpperCase()}
          </div>
          <div className="metric-label">
            Current Status
          </div>
          {monitor.status === 'up' && (
            <div className="text-xs text-text-muted mt-1">
              Currently up for {formatLastChecked(monitor.lastCheckedAt)}
            </div>
          )}
        </div>

        <div className="metric-card">
          <div className="metric-value text-text-primary">
            {formatLastChecked(monitor.lastCheckedAt)}
          </div>
          <div className="metric-label">
            Last Check
          </div>
          <div className="text-xs text-text-muted mt-1">
            Checked every 1 min
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-value text-accent-green">
            {monitor.uptime?.toFixed(1) || 0}%
          </div>
          <div className="metric-label">
            Uptime (24h)
          </div>
          <div className="text-xs text-text-muted mt-1">
            0 incidents, 0m down
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-value text-text-primary">
            {monitor.isPaused ? 'Paused' : 'Active'}
          </div>
          <div className="metric-label">
            Monitor Status
          </div>
          <div className="text-xs text-text-muted mt-1">
            {monitor.isPaused ? 'Monitoring stopped' : 'Monitoring active'}
          </div>
        </div>
      </div>

      {/* Dynamic Response Time Chart */}
      <div className="mb-6">
        <ResponseTimeChart monitorId={monitor._id} token={token} />
      </div>

      {/* Analytics Toggle */}
      <div className="border-t border-border-color pt-4">
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="text-accent-blue hover:text-blue-400 text-sm font-medium"
        >
          {showAnalytics ? 'Hide' : 'Show'} Detailed Analytics
        </button>

        {showAnalytics && (
          <div className="mt-4">
            <MonitorAnalytics monitorId={monitor._id} token={token} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitorPanel;
