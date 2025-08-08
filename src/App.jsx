import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import CreateMonitor from "./pages/CreateMonitor";
import Features from "./pages/Features";
import PlaceholderPage from "./pages/PlaceholderPage";

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Footer Link Pages */}
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<PlaceholderPage title="Pricing" description="Pricing plans and packages are coming soon. Check back for competitive pricing options." />} />
        <Route path="/integrations" element={<PlaceholderPage title="Integrations" description="Integrations with popular tools and services are under development." />} />
        <Route path="/api" element={<PlaceholderPage title="API Documentation" description="REST API documentation and examples will be available soon." />} />
        <Route path="/docs" element={<PlaceholderPage title="Documentation" description="Comprehensive documentation and guides are being prepared." />} />
        <Route path="/help" element={<PlaceholderPage title="Help Center" description="Help articles and support resources are coming soon." />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact Us" description="Get in touch with our support team. Contact information will be available soon." />} />
        <Route path="/status" element={<PlaceholderPage title="Status Page" description="System status and uptime information will be displayed here." />} />
        <Route path="/about" element={<PlaceholderPage title="About Us" description="Learn more about UptimeMonitor and our mission." />} />
        <Route path="/blog" element={<PlaceholderPage title="Blog" description="Latest updates, tips, and insights about uptime monitoring." />} />
        <Route path="/careers" element={<PlaceholderPage title="Careers" description="Join our team. Career opportunities will be posted here." />} />
        <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" description="Our privacy policy and data protection practices." />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-monitor" element={<CreateMonitor />} />
      </Routes>
    </div>
  );
};

export default App;
