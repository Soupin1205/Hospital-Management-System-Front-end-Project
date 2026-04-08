import React, { useState } from 'react';

const Dashboard = () => {
  const [chartView, setChartView] = useState('monthly');
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', disease: '', email: '', phone: '' });

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
    { name: 'Emma Wilson', id: '#P-1004', disease: 'Pneumonia', date: 'Dec 17, 2024', status: 'Inactive' },
  ];

  const monthlyData = [55, 35, 75, 90, 45, 80, 70, 40, 60, 50, 85, 95];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const weeklyData = [65, 72, 68, 85, 90, 78, 82, 88, 92, 86, 79, 84];
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];

  const chartData = chartView === 'monthly' ? monthlyData : weeklyData;
  const chartLabels = chartView === 'monthly' ? months : weeks;

  const handleAddPatient = (e) => {
    e.preventDefault();
    alert('Patient added successfully!');
    setShowPatientModal(false);
    setNewPatient({ name: '', disease: '', email: '', phone: '' });
  };

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
              <p>Admission trends for 2024</p>
            </div>
            <div className="pill-filters">
              <span 
                className={chartView === 'weekly' ? 'active' : ''} 
                onClick={() => setChartView('weekly')}
              >
                Weekly
              </span>
              <span 
                className={chartView === 'monthly' ? 'active' : ''} 
                onClick={() => setChartView('monthly')}
              >
                Monthly
              </span>
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
                  <span className="chart-label">{chartLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Panel - Replaces Department Performance */}
        <div className="data-panel quick-stats-panel">
          <div className="panel-header">
            <h3>Quick Statistics</h3>
            <span className="health-badge">Today</span>
          </div>
          <div className="quick-stats-grid">
            <div className="quick-stat-item">
              <div className="quick-stat-icon">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div className="quick-stat-info">
                <span className="quick-stat-value">48</span>
                <span className="quick-stat-label">Appointments Today</span>
              </div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-icon">
                <span className="material-symbols-outlined">bed</span>
              </div>
              <div className="quick-stat-info">
                <span className="quick-stat-value">124</span>
                <span className="quick-stat-label">Available Beds</span>
              </div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-icon">
                <span className="material-symbols-outlined">pending_actions</span>
              </div>
              <div className="quick-stat-info">
                <span className="quick-stat-value">12</span>
                <span className="quick-stat-label">Pending Approvals</span>
              </div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-icon">
                <span className="material-symbols-outlined">medication</span>
              </div>
              <div className="quick-stat-info">
                <span className="quick-stat-value">86</span>
                <span className="quick-stat-label">Active Prescriptions</span>
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
          <button className="add-btn" onClick={() => setShowPatientModal(true)}>
            <span className="material-symbols-outlined">add</span>
            Add Patient
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Patient ID</th>
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
                <td className="patient-id-cell">{patient.id}</td>
                <td>{patient.disease}</td>
                <td>{patient.date}</td>
                <td>
                  <span 
                    className={`status-badge status-${patient.status.toLowerCase()}`}
                    title={patient.status === 'Active' ? 'Currently receiving care' : 'Discharged from care'}
                  >
                    <span className="status-dot"></span>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Patient Modal */}
      {showPatientModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-header-icon">
                <span className="material-symbols-outlined">person_add</span>
              </div>
              <h2>Register New Patient</h2>
              <button className="modal-close" onClick={() => setShowPatientModal(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddPatient} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter patient's full name"
                    required
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Disease / Condition</label>
                  <input
                    type="text"
                    placeholder="Enter diagnosis"
                    required
                    value={newPatient.disease}
                    onChange={(e) => setNewPatient({ ...newPatient, disease: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    required
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowPatientModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <span className="material-symbols-outlined">save</span>
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;