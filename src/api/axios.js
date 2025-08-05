import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // matches backend routes like /api/auth
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // only if you're using cookies
});

export default instance;
