import React from 'react';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Navigation */}
      <nav className="bg-bg-secondary border-b border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-green rounded-full"></div>
              <span className="text-xl font-bold text-text-primary">UptimeMonitor</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-text-secondary hover:text-text-primary transition-colors">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Features
          </h1>
          <p className="text-lg text-text-secondary">
            This page is under construction. Check back soon for detailed feature information.
          </p>
        </div>

        <div className="text-center">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
