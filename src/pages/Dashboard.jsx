import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import "./../styles/doctor.css";

const Dashboard = () => {
  return (
    <div className="dashboard-layout dark-theme">
      <Sidebar />

      <main className="main-content black-glass">
        <header className="content-header">
          <div>
            <h1 className="neon-text">Hospital Analytics</h1>
            <p className="text-muted">
              Real-time command center for MedCare Pro
            </p>
          </div>
          <div className="header-profile">
            <span className="material-symbols-outlined notify-bell">
              notifications
            </span>
            <div className="admin-status">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=00f2ff&color=000"
                alt="Admin"
              />
              <span className="online-dot"></span>
            </div>
          </div>
        </header>

        {/* NEON TOP METRICS */}
        <section className="stats-grid">
          <div className="stat-card neon-border-cyan">
            <div className="stat-info">
              <p>Total Patients</p>
              <h3 className="cyan-text">61,923</h3>
              <small>Admitted today: 32,303</small>
            </div>
            <span className="material-symbols-outlined glow-icon-cyan">
              groups
            </span>
          </div>

          <div className="stat-card neon-border-blue">
            <div className="stat-info">
              <p>Operational Cost</p>
              <h3 className="blue-text">$2,923</h3>
              <small>Avg/Op: $30.0</small>
            </div>
            <span className="material-symbols-outlined glow-icon-blue">
              payments
            </span>
          </div>

          <div className="stat-card neon-border-orange">
            <div className="stat-info">
              <p>Staff Efficiency</p>
              <h3 className="orange-text">30.4</h3>
              <small>120 Doctors Active</small>
            </div>
            <span className="material-symbols-outlined glow-icon-orange">
              medical_services
            </span>
          </div>
        </section>

        {/* MAIN DATA GRID */}
        <div className="dashboard-main-grid">
          {/* Large Trend Chart */}
          <div className="data-panel chart-box">
            <div className="panel-header">
              <h3>Patient Admissions Overview</h3>
              <div className="pill-filters">
                <span className="active">Yearly</span>
                <span>Monthly</span>
              </div>
            </div>
            <div className="hospital-neon-chart">
              {[55, 35, 75, 90, 45, 80, 70, 40, 60, 50, 85, 95].map((h, i) => (
                <div key={i} className="chart-col">
                  <div className="bar-pair">
                    <div className="bar-cyan" style={{ height: `${h}%` }}></div>
                    <div
                      className="bar-blue"
                      style={{ height: `${h - 15}%` }}
                    ></div>
                  </div>
                  <span className="label">
                    {
                      [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                      ][i]
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Circular Ring */}
          <div className="data-panel ring-box">
            <h3>System Health</h3>
            <div className="neon-ring">
              <svg viewBox="0 0 36 36">
                <path
                  className="ring-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="ring-fill"
                  strokeDasharray="85, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="ring-text">85%</div>
            </div>
            <p className="status-label">Operational</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
