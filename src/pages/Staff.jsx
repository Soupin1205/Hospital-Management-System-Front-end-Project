import React, { useState } from 'react';

const Staff = () => {
  const [staff] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', role: 'Cardiologist', department: 'Cardiology', lastPayout: '$12,450', status: 'Active', joinDate: 'Jan 2020' },
    { id: 2, name: 'Dr. Michael Chen', role: 'Neurologist', department: 'Neurology', lastPayout: '$10,230', status: 'Active', joinDate: 'Mar 2019' },
    { id: 3, name: 'Dr. Emily Rodriguez', role: 'Pediatrician', department: 'Pediatrics', lastPayout: '$8,900', status: 'Active', joinDate: 'Jun 2021' },
    { id: 4, name: 'Dr. James Wilson', role: 'Orthopedic', department: 'Orthopedics', lastPayout: '$9,750', status: 'Inactive', joinDate: 'Aug 2018' },
    { id: 5, name: 'Dr. Lisa Anderson', role: 'Dermatologist', department: 'Dermatology', lastPayout: '$7,800', status: 'Active', joinDate: 'Nov 2022' },
  ]);

  const metrics = {
    totalStaff: staff.length,
    activeStaff: staff.filter(s => s.status === 'Active').length,
    departments: [...new Set(staff.map(s => s.department))].length,
    totalPayout: '$48,293'
  };

  return (
    <>
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">{metrics.totalStaff}</span>
            <span className="metric-label">Total Staff</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <span className="material-symbols-outlined">badge</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">{metrics.activeStaff}</span>
            <span className="metric-label">Active Staff</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <span className="material-symbols-outlined">business</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">{metrics.departments}</span>
            <span className="metric-label">Departments</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">{metrics.totalPayout}</span>
            <span className="metric-label">Total Payout</span>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div>
            <h3>Staff Overview</h3>
            <p>Manage all staff members and their information</p>
          </div>
          <button className="add-btn">
            <span className="material-symbols-outlined">add</span>
            Add Staff
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Staff Member</th>
              <th>Role</th>
              <th>Department</th>
              <th>Join Date</th>
              <th>Last Payout</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id}>
                <td>
                  <div className="staff-info">
                    <div className="staff-avatar">{member.name.charAt(0)}</div>
                    <div>
                      <div className="staff-name">{member.name}</div>
                      <div className="staff-id">ID: #{member.id}</div>
                    </div>
                  </div>
                </td>
                <td>{member.role}</td>
                <td>
                  <span className="department-badge">{member.department}</span>
                </td>
                <td>{member.joinDate}</td>
                <td className="payout-amount">{member.lastPayout}</td>
                <td>
                  <span className={`status-badge status-${member.status.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {member.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="action-btn edit">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className="action-btn view">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Staff;