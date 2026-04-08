import React, { useState } from 'react';

const Staff = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [staff, setStaff] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', role: 'Cardiologist', department: 'Cardiology', lastPayout: '$12,450', status: 'Active', joinDate: 'Jan 2020', email: 'sarah@medicare.com', phone: '(555) 123-4567' },
    { id: 2, name: 'Dr. Michael Chen', role: 'Neurologist', department: 'Neurology', lastPayout: '$10,230', status: 'Active', joinDate: 'Mar 2019', email: 'michael@medicare.com', phone: '(555) 234-5678' },
    { id: 3, name: 'Dr. Emily Rodriguez', role: 'Pediatrician', department: 'Pediatrics', lastPayout: '$8,900', status: 'Active', joinDate: 'Jun 2021', email: 'emily@medicare.com', phone: '(555) 345-6789' },
    { id: 4, name: 'Dr. James Wilson', role: 'Orthopedic', department: 'Orthopedics', lastPayout: '$9,750', status: 'Inactive', joinDate: 'Aug 2018', email: 'james@medicare.com', phone: '(555) 456-7890' },
    { id: 5, name: 'Dr. Lisa Anderson', role: 'Dermatologist', department: 'Dermatology', lastPayout: '$7,800', status: 'Active', joinDate: 'Nov 2022', email: 'lisa@medicare.com', phone: '(555) 567-8901' },
  ]);

  const [formData, setFormData] = useState({
    name: '', role: '', department: '', email: '', phone: '', status: ''
  });

  const handleEditStaff = (member) => {
    setEditingStaff(member);
    setFormData({
      name: member.name,
      role: member.role,
      department: member.department,
      email: member.email,
      phone: member.phone,
      status: member.status
    });
    setShowEditModal(true);
  };

  const handleUpdateStaff = (e) => {
    e.preventDefault();
    const updatedStaff = staff.map(m => 
      m.id === editingStaff.id 
        ? { ...m, ...formData }
        : m
    );
    setStaff(updatedStaff);
    setShowEditModal(false);
    setEditingStaff(null);
    setFormData({ name: '', role: '', department: '', email: '', phone: '', status: '' });
  };

  const metrics = {
    totalStaff: staff.length,
    activeStaff: staff.filter(s => s.status === 'Active').length,
    departments: [...new Set(staff.map(s => s.department))].length,
    totalPayout: '$48,293'
  };

  const departments = [...new Set(staff.map(s => s.department))];

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
          <button className="add-btn" onClick={() => alert('Add Staff feature coming soon!')}>
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
                  <button className="action-btn edit" onClick={() => handleEditStaff(member)}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Staff Modal */}
      {showEditModal && editingStaff && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-header-icon">
                <span className="material-symbols-outlined">edit</span>
              </div>
              <h2>Edit Staff Member</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleUpdateStaff} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <select
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    {departments.map(dept => (
                      <option key={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <span className="material-symbols-outlined">save</span>
                  Update Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Staff;