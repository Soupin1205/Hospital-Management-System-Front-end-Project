import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import '../styles/components.css';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Morning');
    else if (hour < 18) setGreeting('Afternoon');
    else setGreeting('Evening');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/patients', icon: 'person', label: 'Patients' },
    { path: '/doctors', icon: 'stethoscope', label: 'Doctors' },
    { path: '/appointments', icon: 'calendar_month', label: 'Appointments' },
    { path: '/staff', icon: 'group', label: 'Staff' },
    { path: '/billing', icon: 'payments', label: 'Billing' },
  ];

  return (
    <div className="app-container">
      <aside className="fixed-sidebar">
        <div className="sidebar-gradient-bg"></div>
        <div className="sidebar-header">
          <div className="logo-icon">
            <span className="material-symbols-outlined">home_health</span>
          </div>
          <h2>MEDICARE</h2>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="material-symbols-outlined nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {isActive(item.path) && <span className="active-indicator"></span>}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="logout-btn" onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </div>
        </div>
      </aside>
      <main className="main-content">
        <div className="top-bar">
          <div className="page-title">
            <h1>Good {greeting}, Administrator.</h1>
            <p>Here is your system overview.</p>
          </div>
          <div className="header-actions">
            <ThemeToggle />
            <div className="admin-profile">
              <div className="admin-avatar">
                <span>AD</span>
                <div className="online-dot"></div>
              </div>
              <div className="admin-info">
                <span className="admin-name">Administrator</span>
                <span className="admin-role">System Administrator</span>
              </div>
            </div>
          </div>
        </div>
        <div className="content-card-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;