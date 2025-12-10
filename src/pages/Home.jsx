import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PulseLogo from '../components/PulseLogo';
import '../styles/landing.css';
import FloatingCoins from "../components/FloatingCoins"

const AnimatedIcon = ({ delay, size = 'small', icon }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20'
  };

  return (
    <div
      className={`absolute ${sizeClasses[size]} rounded-full bg-gradient-to-br from-accent-green/20 to-accent-green/5 backdrop-blur-md border border-accent-green/30 flex items-center justify-center text-2xl animate-float`}
      style={{ '--delay': `${delay}s` }}
    >
      {icon}
    </div>
  );
};

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary">
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0) 70%);
          border-radius: 50%;
          filter: blur(40px);
        }

        .features-grid {
          perspective: 1000px;
        }

        .feature-card-new {
          background: linear-gradient(135deg, rgba(17, 17, 17, 0.8) 0%, rgba(26, 26, 26, 0.4) 100%);
          border: 1px solid rgba(16, 185, 129, 0.2);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .feature-card-new:hover {
          border-color: rgba(16, 185, 129, 0.5);
          background: linear-gradient(135deg, rgba(17, 17, 17, 0.9) 0%, rgba(26, 26, 26, 0.6) 100%);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.1);
        }

        .testimonial-card {
          background: linear-gradient(135deg, rgba(17, 17, 17, 0.7) 0%, rgba(26, 26, 26, 0.3) 100%);
          border: 1px solid rgba(16, 185, 129, 0.15);
          backdrop-filter: blur(10px);
        }

        .faq-item {
          border-bottom: 1px solid rgba(16, 185, 129, 0.1);
        }

        .faq-item[open] {
          background: rgba(16, 185, 129, 0.05);
        }

        .btn-glow {
          position: relative;
          overflow: hidden;
        }

        .btn-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .btn-glow:hover::before {
          left: 100%;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-bg-primary/80 backdrop-blur-md border-b border-border-color z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <PulseLogo className="w-6 h-6" color="#10b981" />
              <span className="text-xl font-bold text-text-primary">PulseWatch</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-text-secondary hover:text-text-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-text-secondary hover:text-text-primary transition-colors">
                How it works
              </a>
              <a href="#for-teams" className="text-text-secondary hover:text-text-primary transition-colors">
                For teams
              </a>
              <a href="#faq" className="text-text-secondary hover:text-text-primary transition-colors">
                FAQ
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-text-secondary hover:text-text-primary transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-accent-green hover:bg-accent-green-hover text-black font-semibold px-6 py-2 rounded-lg transition-colors">
                Get Early Access
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">
        {/* Animated Background Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingCoins />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
            Never Let Downtime
            <br />
            <span className="text-accent-green">Go Unnoticed Again.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Real-time uptime monitoring for websites & APIs. Get instant alerts before your users notice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="btn-glow bg-accent-green hover:bg-accent-green-hover text-black font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-green/50"
            >
              Start Monitoring Free
            </Link>
            <button className="border border-accent-green text-accent-green hover:bg-accent-green/10 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Why PulseWatch Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-bg-primary to-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Downtime Costs More Than You Think.
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Every minute offline means lost revenue, frustrated users, and damaged reputation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="feature-card-new p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-text-primary mb-4">Without Monitoring</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">💀</span>
                </div>
                <ul className="space-y-3 text-text-secondary">
                  <li>• Users discover outages first</li>
                  <li>• Hours of silent downtime</li>
                  <li>• Revenue lost, trust broken</li>
                </ul>
              </div>
            </div>

            <div className="feature-card-new p-8 rounded-xl border-accent-green/50">
              <h3 className="text-2xl font-bold text-text-primary mb-4">With PulseWatch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">💚</span>
                </div>
                <ul className="space-y-3 text-text-secondary">
                  <li>• Instant alerts in seconds</li>
                  <li>• 24/7 automated checks</li>
                  <li>• Fix issues before users notice</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Complete Uptime Monitoring,<br />Zero Complexity.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="feature-card-new p-8 rounded-xl">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Monitor Websites & APIs</h3>
              <p className="text-text-secondary">
                Continuous health checks from global locations every 30 seconds.
              </p>
            </div>

            <div className="feature-card-new p-8 rounded-xl">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Real-time Alerts</h3>
              <p className="text-text-secondary">
                Get notified instantly via Email, SMS, Slack, or Telegram.
              </p>
            </div>

            <div className="feature-card-new p-8 rounded-xl">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Response-time Analytics</h3>
              <p className="text-text-secondary">
                Track performance trends with detailed charts and insights.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-green mb-2">30 seconds</div>
              <p className="text-text-secondary">Check interval</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-green mb-2">12+ regions</div>
              <p className="text-text-secondary">Global locations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-green mb-2">99.99%</div>
              <p className="text-text-secondary">Uptime SLA</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-16">
            How PulseWatch Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center text-2xl font-bold text-accent-green mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Add Your Monitors</h3>
              <p className="text-text-secondary">
                Simply add the URLs of your websites and APIs to monitor.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center text-2xl font-bold text-accent-green mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">We Check Every 30 Seconds</h3>
              <p className="text-text-secondary">
                Our global monitoring network checks your services continuously.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center text-2xl font-bold text-accent-green mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Get Instant Alerts</h3>
              <p className="text-text-secondary">
                Receive notifications before your users notice any issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Teams Section */}
      <section id="for-teams" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-16">
            Built for Teams That Ship.<br />Trusted by Those Who Scale.
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-xl bg-bg-secondary border border-border-color">
              <h3 className="text-2xl font-bold text-text-primary mb-3">For Developers</h3>
              <p className="text-text-secondary">
                Monitor APIs, webhooks, and microservices with ease.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-bg-secondary border border-border-color">
              <h3 className="text-2xl font-bold text-text-primary mb-3">For DevOps Teams</h3>
              <p className="text-text-secondary">
                Integrate with your CI/CD pipeline and incident workflows.
              </p>
            </div>
            <div className="p-8 rounded-xl bg-bg-secondary border border-border-color">
              <h3 className="text-2xl font-bold text-text-primary mb-3">For Business Owners</h3>
              <p className="text-text-secondary">
                Protect revenue with proactive uptime monitoring.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="testimonial-card p-8 rounded-xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-accent-green/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">SK</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-primary">Sarah K.</h4>
                  <p className="text-text-secondary text-sm">Lead Engineer @ TechStart</p>
                </div>
              </div>
              <p className="text-text-secondary italic">
                "PulseWatch caught an API outage 2 minutes in. Our customers never noticed."
              </p>
            </div>

            <div className="testimonial-card p-8 rounded-xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-accent-green/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">MT</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-primary">Marcus T.</h4>
                  <p className="text-text-secondary text-sm">DevOps Manager</p>
                </div>
              </div>
              <p className="text-text-secondary italic">
                "The response-time charts helped us identify a slow database query before it became critical."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-text-primary text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="faq-item group cursor-pointer">
              <summary className="flex justify-between items-center p-6 font-semibold text-text-primary hover:text-accent-green transition-colors">
                <span>What is PulseWatch?</span>
                <span className="text-xl group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="px-6 pb-6 text-text-secondary">
                PulseWatch is a real-time uptime monitoring platform that checks your websites and APIs every 30 seconds and alerts you instantly when something goes down.
              </p>
            </details>

            <details className="faq-item group cursor-pointer">
              <summary className="flex justify-between items-center p-6 font-semibold text-text-primary hover:text-accent-green transition-colors">
                <span>How do alerts work?</span>
                <span className="text-xl group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="px-6 pb-6 text-text-secondary">
                When downtime is detected, we send alerts via your chosen channels: Email, SMS, Slack, or Telegram. You get notified in seconds.
              </p>
            </details>

            <details className="faq-item group cursor-pointer">
              <summary className="flex justify-between items-center p-6 font-semibold text-text-primary hover:text-accent-green transition-colors">
                <span>Can I create public status pages?</span>
                <span className="text-xl group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="px-6 pb-6 text-text-secondary">
                Yes! Create beautiful public status pages that your users can check. Keep them informed during incidents.
              </p>
            </details>

            <details className="faq-item group cursor-pointer">
              <summary className="flex justify-between items-center p-6 font-semibold text-text-primary hover:text-accent-green transition-colors">
                <span>What about cron job monitoring?</span>
                <span className="text-xl group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="px-6 pb-6 text-text-secondary">
                Monitor scheduled jobs with our cron monitoring feature. Get alerts if your cron jobs fail to execute.
              </p>
            </details>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-text-primary mb-4">Still have questions?</h3>
            <p className="text-text-secondary mb-6">
              Reach out to our team or join the waitlist for early access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="border border-text-secondary text-text-secondary hover:border-text-primary hover:text-text-primary px-6 py-3 rounded-lg transition-colors">
                Email us
              </button>
              <Link
                to="/register"
                className="bg-accent-green hover:bg-accent-green-hover text-black font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Get Early Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-tertiary border-t border-border-color py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <PulseLogo className="w-5 h-5" color="#10b981" />
                <span className="text-lg font-bold text-text-primary">PulseWatch</span>
              </div>
              <p className="text-text-secondary">
                Real-time uptime monitoring for the modern web.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-text-primary mb-4">Product</h3>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li><a href="#features" className="hover:text-accent-green transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-accent-green transition-colors">How it works</a></li>
                <li><a href="#for-teams" className="hover:text-accent-green transition-colors">For teams</a></li>
                <li><a href="#" className="hover:text-accent-green transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-text-primary mb-4">Resources</h3>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li><a href="#" className="hover:text-accent-green transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-accent-green transition-colors">Blog</a></li>
                <li><a href="#faq" className="hover:text-accent-green transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-accent-green transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-text-primary mb-4">Company</h3>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li><a href="#" className="hover:text-accent-green transition-colors">About</a></li>
                <li><a href="#" className="hover:text-accent-green transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-accent-green transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-accent-green transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border-color pt-8 text-center">
            <p className="text-text-secondary text-sm">
              © 2025 PulseWatch. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
