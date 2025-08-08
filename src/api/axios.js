import axios from "axios";

const instance = axios.create({
  baseURL: "import.meta.env.VITE_API_URL",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // only if you're using cookies
});

export default instance;
