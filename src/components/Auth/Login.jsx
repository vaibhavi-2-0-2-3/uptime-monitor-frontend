import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../api/axios";
import PulseLogo from "../PulseLogo";
import { fadeUp, popIn } from "../../utils/motion-presets";

const BRAND = "#CCFF11";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center px-4 py-12">
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="max-w-md w-full"
      >
        <motion.div className="text-center mb-8" variants={fadeUp}>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 mb-8 group"
            whileHover={{ y: -2 }}
          >
            <motion.div
              className="transition group-hover:drop-shadow-[0_0_16px_rgba(204,255,17,0.6)]"
              whileHover={{ scale: 1.05 }}
            >
              <PulseLogo className="w-8 h-8" color={BRAND} />
            </motion.div>
            <span className="text-2xl font-extrabold tracking-tight">PulseWatch</span>
          </Link>
          <motion.h1
            className="text-4xl font-extrabold tracking-tight mb-3"
            variants={fadeUp}
          >
            Welcome back
          </motion.h1>
          <motion.p
            className="text-lg text-black/70 dark:text-white/70"
            variants={fadeUp}
          >
            Sign in to your account to continue
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-white/70 dark:bg-black/50 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl shadow-lg p-8"
          variants={popIn}
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg"
            >
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={fadeUp}>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition-all"
                placeholder="Enter your email"
                style={{ "--brand": BRAND }}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition-all"
                placeholder="Enter your password"
                style={{ "--brand": BRAND }}
              />
            </motion.div>

            <motion.div variants={popIn}>
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--brand)] text-black hover:bg-[color:rgb(204,255,17,0.9)] px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ "--brand": BRAND }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </motion.button>
            </motion.div>
          </form>

          <motion.div
            className="mt-6 text-center"
            variants={fadeUp}
          >
            <p className="text-black/70 dark:text-white/70">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[var(--brand)] hover:text-[color:rgb(204,255,17,0.8)] font-semibold transition-colors"
                style={{ "--brand": BRAND }}
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
