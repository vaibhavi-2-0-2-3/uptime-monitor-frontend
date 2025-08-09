import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PulseLogo from "./PulseLogo";
import axios from "../api/axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !event.target.closest("#user-avatar-dropdown")) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="bg-bg-secondary border-b border-border-color px-6 py-4 flex items-center justify-between">
      <Link to="/dashboard" className="flex items-center space-x-2">
        <PulseLogo className="w-7 h-7" color="#10b981" />
        <span className="font-bold text-xl text-accent-green">UptimeMonitor</span>
      </Link>
      <div className="flex items-center space-x-4">
        {user && (
          <span className="hidden sm:block text-text-primary font-medium">
            Welcome, {user.username || user.name || "User"}
          </span>
        )}
        <div className="relative" id="user-avatar-dropdown" ref={dropdownRef}>
          <button
            className="w-10 h-10 rounded-full bg-accent-green flex items-center justify-center text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-accent-green"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-label="User menu"
          >
            {user && user.profilePic ? (
              <img
                src={user.profilePic}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span>{getInitials(user?.username || user?.name)}</span>
            )}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-bg-secondary border border-border-color rounded-lg shadow-lg z-50 animate-fade-in">
              <Link
                to="/settings"
                className="block px-4 py-2 text-text-primary hover:bg-bg-tertiary hover:text-accent-green rounded-t-lg transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Settings
              </Link>
              <button
                className="w-full text-left px-4 py-2 text-text-primary hover:bg-bg-tertiary hover:text-accent-red rounded-b-lg transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;