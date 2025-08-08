import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Navigation */}
      <nav className="bg-bg-secondary border-b border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-green rounded-full"></div>
              <span className="text-xl font-bold text-text-primary">UptimeMonitor</span>
            </div>
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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
            Monitor Your Website's
            <span className="text-accent-green"> Uptime</span>
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Get instant alerts when your websites go down. Monitor response times, track uptime, and ensure your services are always available to your users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-8 py-4">
              Start Monitoring Free
            </Link>
            <Link to="/features" className="btn-secondary text-lg px-8 py-4">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Why Choose UptimeMonitor?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Professional uptime monitoring with advanced features to keep your websites running smoothly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="w-12 h-12 bg-accent-green/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Real-time Monitoring</h3>
              <p className="text-text-secondary">
                Check your websites every minute and get instant notifications when they go down.
              </p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 bg-accent-green/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Advanced Analytics</h3>
              <p className="text-text-secondary">
                Track response times, uptime percentages, and detailed performance metrics.
              </p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 bg-accent-green/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Smart Alerts</h3>
              <p className="text-text-secondary">
                Receive email notifications when your services are down or experiencing issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent-green mb-2">99.9%</div>
              <div className="text-text-secondary">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-green mb-2">1 min</div>
              <div className="text-text-secondary">Check Frequency</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-green mb-2">24/7</div>
              <div className="text-text-secondary">Monitoring</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-green mb-2">∞</div>
              <div className="text-text-secondary">Unlimited Monitors</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Ready to Start Monitoring?
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Join thousands of developers and businesses who trust UptimeMonitor to keep their services running.
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-4">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-tertiary border-t border-border-color py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-accent-green rounded-full"></div>
                <span className="text-lg font-bold text-text-primary">UptimeMonitor</span>
              </div>
              <p className="text-text-secondary">
                Professional uptime monitoring for modern businesses.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-text-secondary hover:text-accent-green transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-text-secondary hover:text-accent-green transition-colors">Pricing</Link></li>
                <li><Link to="/integrations" className="text-text-secondary hover:text-accent-green transition-colors">Integrations</Link></li>
                <li><Link to="/api" className="text-text-secondary hover:text-accent-green transition-colors">API</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/docs" className="text-text-secondary hover:text-accent-green transition-colors">Documentation</Link></li>
                <li><Link to="/help" className="text-text-secondary hover:text-accent-green transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="text-text-secondary hover:text-accent-green transition-colors">Contact Us</Link></li>
                <li><Link to="/status" className="text-text-secondary hover:text-accent-green transition-colors">Status Page</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-text-secondary hover:text-accent-green transition-colors">About</Link></li>
                <li><Link to="/blog" className="text-text-secondary hover:text-accent-green transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="text-text-secondary hover:text-accent-green transition-colors">Careers</Link></li>
                <li><Link to="/privacy" className="text-text-secondary hover:text-accent-green transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border-color mt-8 pt-8 text-center">
            <p className="text-text-secondary">
              © 2024 UptimeMonitor. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
