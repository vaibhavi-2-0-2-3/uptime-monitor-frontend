import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const MonitorAnalytics = ({ monitorId, token }) => {
  const [range, setRange] = useState("24h");
  const [data, setData] = useState([]);
  const [uptime, setUptime] = useState(0);
  const [downtime, setDowntime] = useState(0);
  const [avgResponse, setAvgResponse] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`/monitors/${monitorId}/logs?range=${range}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.logs);
        setUptime(res.data.uptime);
        setDowntime(res.data.downtimeCount);
        setAvgResponse(res.data.avgResponseTime);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [monitorId, range, token]);

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-text-primary">Detailed Analytics</span>
        <select
          value={range}
          onChange={e => setRange(e.target.value)}
          className="input-dark text-sm"
        >
          <option value="24h">Last 24h</option>
          <option value="7d">Last 7d</option>
        </select>
      </div>

      {loading ? (
        <div className="text-sm text-text-muted text-center py-8">Loading analytics...</div>
      ) : error ? (
        <div className="text-sm text-accent-red text-center py-8">{error}</div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={data.map(l => ({
              ...l,
              up: l.status === "UP" ? 1 : 0,
              time: new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }))} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 1]} hide />
              <Tooltip
                formatter={(v, n) => n === "up" ? (v ? "UP" : "DOWN") : v}
                labelFormatter={() => ""}
                contentStyle={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }}
              />
              <Line type="monotone" dataKey="up" stroke="#10b981" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div>
              <div className="text-sm text-text-muted">Uptime</div>
              <div className="text-lg font-semibold text-accent-green">{uptime}%</div>
            </div>
            <div>
              <div className="text-sm text-text-muted">Downtimes</div>
              <div className="text-lg font-semibold text-accent-red">{downtime}</div>
            </div>
            <div>
              <div className="text-sm text-text-muted">Avg Response</div>
              <div className="text-lg font-semibold text-text-primary">{avgResponse}ms</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MonitorAnalytics;
