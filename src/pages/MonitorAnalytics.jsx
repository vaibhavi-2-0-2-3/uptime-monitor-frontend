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
    <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-100">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-gray-700">Analytics</span>
        <select
          value={range}
          onChange={e => setRange(e.target.value)}
          className="text-xs border rounded px-1 py-0.5"
        >
          <option value="24h">Last 24h</option>
          <option value="7d">Last 7d</option>
        </select>
      </div>
      {loading ? (
        <div className="text-xs text-gray-400">Loading...</div>
      ) : error ? (
        <div className="text-xs text-red-400">{error}</div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={40}>
            <LineChart data={data.map(l => ({
              ...l,
              up: l.status === "UP" ? 1 : 0,
              time: new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }))} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 1]} hide />
              <Tooltip formatter={(v, n) => n === "up" ? (v ? "UP" : "DOWN") : v} labelFormatter={() => ""} />
              <Line type="monotone" dataKey="up" stroke="#10b981" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 text-xs mt-1">
            <span>Uptime: <span className="font-semibold">{uptime}%</span></span>
            <span>Downtimes: <span className="font-semibold">{downtime}</span></span>
            <span>Avg resp: <span className="font-semibold">{avgResponse}ms</span></span>
          </div>
        </>
      )}
    </div>
  );
};

export default MonitorAnalytics;
