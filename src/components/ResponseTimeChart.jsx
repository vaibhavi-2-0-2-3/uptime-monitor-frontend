import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from '../api/axios';

const ResponseTimeChart = ({ monitorId, token }) => {
  const [data, setData] = useState([]);
  const [statistics, setStatistics] = useState({
    average: 0,
    minimum: 0,
    maximum: 0,
    totalChecks: 0,
    successfulChecks: 0
  });
  const [range, setRange] = useState('24h');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`/monitors/${monitorId}/history?range=${range}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setData(response.data.data);
      setStatistics(response.data.statistics);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load response time data');
      console.error('Error fetching monitor history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (monitorId && token) {
      fetchHistory();
    }
  }, [monitorId, token, range]);

  const formatTooltip = (value, name, props) => {
    if (name === 'responseTime') {
      return [`${value} ms`, 'Response Time'];
    }
    return [value, name];
  };

  const formatXAxis = (tickItem) => {
    if (range === '24h') {
      return new Date(tickItem).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return new Date(tickItem).toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getYAxisDomain = () => {
    if (data.length === 0) return [0, 100];
    const maxResponse = Math.max(...data.map(item => item.responseTime));
    return [0, Math.max(maxResponse * 1.1, 100)]; // Add 10% padding
  };

  if (loading) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Response Time</h3>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="input-dark text-sm"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="text-text-muted">Loading response time data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Response Time</h3>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="input-dark text-sm"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="text-accent-red text-center">
            <div className="text-sm mb-2">Failed to load data</div>
            <button
              onClick={fetchHistory}
              className="btn-secondary text-xs"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="chart-container">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Response Time</h3>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="input-dark text-sm"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="text-text-muted text-center">
            <div className="text-sm mb-2">No response time data available</div>
            <div className="text-xs">Data will appear after the first monitor check</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Response Time</h3>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="input-dark text-sm"
        >
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="responseTimeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            stroke="#718096"
            fontSize={12}
            tickFormatter={formatXAxis}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="#718096"
            fontSize={12}
            domain={getYAxisDomain()}
            tickFormatter={(value) => `${value}ms`}
          />
          <Tooltip
            formatter={formatTooltip}
            labelFormatter={(label) => new Date(label).toLocaleString()}
            contentStyle={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)'
            }}
          />
          <Area
            type="monotone"
            dataKey="responseTime"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#responseTimeGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#3b82f6' }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        <div>
          <div className="text-sm text-text-muted">Average</div>
          <div className="text-lg font-semibold text-text-primary">
            {statistics.average} ms
          </div>
        </div>
        <div>
          <div className="text-sm text-text-muted">Minimum</div>
          <div className="text-lg font-semibold text-accent-green">
            {statistics.minimum} ms
          </div>
        </div>
        <div>
          <div className="text-sm text-text-muted">Maximum</div>
          <div className="text-lg font-semibold text-accent-red">
            {statistics.maximum} ms
          </div>
        </div>
      </div>

      <div className="mt-3 text-center text-xs text-text-muted">
        {statistics.successfulChecks} of {statistics.totalChecks} checks successful
      </div>
    </div>
  );
};

export default ResponseTimeChart;
