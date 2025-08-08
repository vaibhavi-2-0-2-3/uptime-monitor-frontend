import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PulseLogo from './PulseLogo';

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      path: '/dashboard',
      icon: '📊',
      label: 'Monitors',
      active: location.pathname === '/dashboard'
    },
    {
      path: '/create-monitor',
      icon: '➕',
      label: 'Create Monitor',
      active: location.pathname === '/create-monitor'
    },
    {
      path: '/incidents',
      icon: '🚨',
      label: 'Incidents',
      active: location.pathname === '/incidents'
    },
    {
      path: '/status-pages',
      icon: '📡',
      label: 'Status Pages',
      active: location.pathname === '/status-pages'
    },
    {
      path: '/maintenance',
      icon: '🔧',
      label: 'Maintenance',
      active: location.pathname === '/maintenance'
    },
    {
      path: '/team',
      icon: '👥',
      label: 'Team Members',
      active: location.pathname === '/team'
    },
    {
      path: '/integrations',
      icon: '🔗',
      label: 'Integrations & API',
      active: location.pathname === '/integrations'
    },
    {
      path: '/settings',
      icon: '⚙️',
      label: 'Settings',
      active: location.pathname === '/settings'
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        sidebar ${collapsed ? 'sidebar-collapsed' : ''}
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-border-color">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <PulseLogo className="w-6 h-6" color="#10b981" />
              <span className={`font-bold text-lg ${collapsed ? 'hidden' : 'block'}`}>
                UptimeMonitor
              </span>
            </Link>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:block p-1 rounded hover:bg-bg-tertiary"
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  nav-item flex items-center space-x-3
                  ${item.active ? 'active' : ''}
                  ${collapsed ? 'justify-center' : ''}
                `}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border-color">
            <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-accent-green rounded-full flex items-center justify-center text-white font-semibold">
                U
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">User</div>
                  <div className="text-xs text-text-muted truncate">Team Owner</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
