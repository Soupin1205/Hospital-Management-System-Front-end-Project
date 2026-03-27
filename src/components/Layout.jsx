import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../styles/doctor.css";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // This function checks if a link is active to change its style
  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  return (
    <div className="app-container">
      {/* PART ONE: THE FIXED SIDEBAR (LEFT) */}
      <aside className="fixed-left-sidebar">
        <div className="sidebar-header">
          <span className="material-symbols-outlined">home_health</span>
          <h2>HOME CARE</h2>
        </div>

        <nav className="sidebar-nav">
          <div
            className={`nav-item ${isActive("/dashboard")}`}
            onClick={() => navigate("/dashboard")}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </div>
          <div
            className={`nav-item ${isActive("/patients")}`}
            onClick={() => navigate("/patients")}
          >
            <span className="material-symbols-outlined">person</span>
            <span>Patients</span>
          </div>
          <div
            className={`nav-item ${isActive("/doctors")}`}
            onClick={() => navigate("/doctors")}
          >
            <span className="material-symbols-outlined">stethoscope</span>
            <span>Doctors</span>
          </div>
          <div
            className={`nav-item ${isActive("/appointments")}`}
            onClick={() => navigate("/appointments")}
          >
            <span className="material-symbols-outlined">calendar_month</span>
            <span>Appointment</span>
          </div>
          <div
            className={`nav-item ${isActive("/payout")}`}
            onClick={() => navigate("/payout")}
          >
            <span className="material-symbols-outlined">payments</span>
            <span>Payout</span>
          </div>
          <div
            className={`nav-item ${isActive("/settings")}`}
            onClick={() => navigate("/settings")}
          >
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="logout-btn" onClick={() => navigate("/")}>
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* PART TWO: THE DYNAMIC CONTENT AREA (RIGHT) */}
      <main className="dynamic-right-content">
        <div className="content-card-wrapper">
          <Outlet /> {/* This is where Doctors.jsx or Patients.jsx will load */}
        </div>
      </main>
    </div>
  );
};

export default Layout;
