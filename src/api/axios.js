import axios from "axios";

const instance = axios.create({
  baseURL: "https://uptime-monitor-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // only if you're using cookies
});

export default instance;
