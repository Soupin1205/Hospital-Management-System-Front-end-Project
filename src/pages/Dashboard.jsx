import React from 'react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Patients', value: '2,847', icon: 'people', change: '+12%', color: 'cyan' },
    { label: 'Appointments Today', value: '48', icon: 'event', change: '+8%', color: 'blue' },
    { label: 'Available Beds', value: '124', icon: 'bed', change: '-5%', color: 'orange' },
    { label: 'Revenue', value: '$48,293', icon: 'payments', change: '+23%', color: 'purple' },
  ];

  const recentPatients = [
    { name: 'Sophie Bennett', id: '#P-1001', disease: 'Stroke', date: 'Dec 20, 2024', status: 'Active' },
    { name: 'Liam Parker', id: '#P-1002', disease: 'Arrhythmia', date: 'Dec 19, 2024', status: 'Active' },
    { name: 'Jackson Mitchell', id: '#P-1003', disease: 'Viral Fever', date: 'Dec 18, 2024', status: 'Active' },
    { name: 'Emma Wilson', id: '#P-1004', disease: 'Pneumonia', date: 'Dec 17, 2024', status: 'Active' },
  ];

  const chartData = [55, 35, 75, 90, 45, 80, 70, 40, 60, 50, 85, 95];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  return (
    <>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card stat-${stat.color}`}>
            <div className="stat-glow"></div>
            <div className="stat-info">
              <p>{stat.label}</p>
              <h3>{stat.value}</h3>
              <small className={`trend ${stat.change.startsWith('+') ? 'trend-up' : 'trend-down'}`}>
                {stat.change} from last month
              </small>
            </div>
            <div className="stat-icon-wrapper">
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-main-grid">
        <div className="data-panel chart-panel">
          <div className="panel-header">
            <div>
              <h3>Patient Admissions Overview</h3>
              <p>Monthly admission trends for 2024</p>
            </div>
            <div className="pill-filters">
              <span className="active">Yearly</span>
              <span>Monthly</span>
              <span>Weekly</span>
            </div>
          </div>
          <div className="chart-container">
            <div className="hospital-neon-chart">
              {chartData.map((height, i) => (
                <div key={i} className="chart-col">
                  <div className="bar-container">
                    <div className="bar bar-primary" style={{ height: `${height}%` }}>
                      <div className="bar-tooltip">{height}%</div>
                    </div>
                    <div className="bar bar-secondary" style={{ height: `${Math.max(height - 15, 5)}%` }}></div>
                  </div>
                  <span className="chart-label">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="data-panel health-panel">
          <div className="panel-header">
            <h3>System Health</h3>
            <span className="health-badge">Live</span>
          </div>
          <div className="health-metrics">
            <div className="circular-progress">
              <svg viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#00f2ff' }} />
                    <stop offset="100%" style={{ stopColor: '#3b82f6' }} />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" className="progress-bg"/>
                <circle cx="50" cy="50" r="45" className="progress-fill" strokeDasharray="283" strokeDashoffset="42"/>
              </svg>
              <div className="progress-text">
                <span className="progress-value">85%</span>
                <span className="progress-label">Operational</span>
              </div>
            </div>
            <div className="health-stats">
              <div className="health-stat">
                <span className="stat-dot green"></span>
                <span>API Response</span>
                <strong>98ms</strong>
              </div>
              <div className="health-stat">
                <span className="stat-dot blue"></span>
                <span>Uptime</span>
                <strong>99.9%</strong>
              </div>
              <div className="health-stat">
                <span className="stat-dot orange"></span>
                <span>Active Users</span>
                <strong>156</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div>
            <h3>Recent Patients</h3>
            <p>Latest registered patients in the system</p>
          </div>
          <button className="add-btn">
            <span className="material-symbols-outlined">add</span>
            Add Patient
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>ID</th>
              <th>Disease</th>
              <th>Registration Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentPatients.map((patient, index) => (
              <tr key={index}>
                <td>
                  <div className="patient-cell">
                    <div className="patient-avatar">{patient.name.charAt(0)}</div>
                    {patient.name}
                  </div>
                </td>
                <td>{patient.id}</td>
                <td>{patient.disease}</td>
                <td>{patient.date}</td>
                <td>
                  <span className={`status-badge status-${patient.status.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;