import React, { useState } from 'react';

const Appointments = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'Sophie Bennett', doctor: 'Dr. Sarah Johnson', date: 'Feb 20, 2024', time: '10:00 AM', type: 'Follow-up', status: 'Scheduled' },
    { id: 2, patient: 'Liam Parker', doctor: 'Dr. Michael Chen', date: 'Feb 20, 2024', time: '11:30 AM', type: 'Consultation', status: 'Scheduled' },
    { id: 3, patient: 'Jackson Mitchell', doctor: 'Dr. Emily Rodriguez', date: 'Feb 21, 2024', time: '2:00 PM', type: 'Check-up', status: 'Pending' },
    { id: 4, patient: 'Emma Wilson', doctor: 'Dr. James Wilson', date: 'Feb 22, 2024', time: '9:00 AM', type: 'Emergency', status: 'Scheduled' },
  ]);

  const [formData, setFormData] = useState({
    patient: '', doctor: '', date: '', time: '', type: ''
  });

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const newAppointment = {
      ...formData,
      id: appointments.length + 1,
      status: 'Scheduled'
    };
    setAppointments([...appointments, newAppointment]);
    setShowModal(false);
    setFormData({ patient: '', doctor: '', date: '', time: '', type: '' });
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      patient: appointment.patient,
      doctor: appointment.doctor,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type
    });
    setShowEditModal(true);
  };

  const handleUpdateAppointment = (e) => {
    e.preventDefault();
    const updatedAppointments = appointments.map(a => 
      a.id === editingAppointment.id 
        ? { ...a, ...formData }
        : a
    );
    setAppointments(updatedAppointments);
    setShowEditModal(false);
    setEditingAppointment(null);
    setFormData({ patient: '', doctor: '', date: '', time: '', type: '' });
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter(a => a.id !== id));
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All Types' || apt.type === typeFilter;
    const matchesStatus = statusFilter === 'All Status' || apt.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const todayAppointments = appointments.filter(apt => apt.date === 'Feb 20, 2024');

  return (
    <>
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <span className="material-symbols-outlined">event</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">{appointments.length}</span>
            <span className="metric-label">Total Appointments</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <span className="material-symbols-outlined">today</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">{todayAppointments.length}</span>
            <span className="metric-label">Today</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <span className="material-symbols-outlined">pending</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">{appointments.filter(a => a.status === 'Pending').length}</span>
            <span className="metric-label">Pending</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">{appointments.filter(a => a.status === 'Scheduled').length}</span>
            <span className="metric-label">Scheduled</span>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-bar">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Search by patient or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-actions">
          <select 
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option>All Types</option>
            <option>Consultation</option>
            <option>Follow-up</option>
            <option>Check-up</option>
            <option>Emergency</option>
          </select>
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Scheduled</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            <span className="material-symbols-outlined">add</span>
            Schedule Appointment
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((apt) => (
              <tr key={apt.id}>
                <td>
                  <div className="patient-info">
                    <div className="patient-avatar">{apt.patient.charAt(0)}</div>
                    {apt.patient}
                  </div>
                                </td>
                <td>{apt.doctor}</td>
                <td>
                  <div className="datetime-cell">
                    <span className="date">{apt.date}</span>
                    <span className="time">{apt.time}</span>
                  </div>
                </td>
                <td>
                  <span className={`appointment-type type-${apt.type.toLowerCase().replace(' ', '-')}`}>
                    {apt.type}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${apt.status.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {apt.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="action-btn edit" onClick={() => handleEditAppointment(apt)}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className="action-btn delete" onClick={() => handleDeleteAppointment(apt.id)}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Appointment Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-header-icon">
                <span className="material-symbols-outlined">calendar_month</span>
              </div>
              <h2>Schedule Appointment</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddAppointment} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    placeholder="Enter patient name"
                    required
                    value={formData.patient}
                    onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Doctor</label>
                  <input
                    type="text"
                    placeholder="Doctor name"
                    required
                    value={formData.doctor}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Appointment Type</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="">Select Type</option>
                    <option>Consultation</option>
                    <option>Follow-up</option>
                    <option>Check-up</option>
                    <option>Emergency</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <span className="material-symbols-outlined">schedule</span>
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Appointment Modal */}
      {showEditModal && editingAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-header-icon">
                <span className="material-symbols-outlined">edit_calendar</span>
              </div>
              <h2>Edit Appointment</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleUpdateAppointment} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    required
                    value={formData.patient}
                    onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Doctor</label>
                  <input
                    type="text"
                    required
                    value={formData.doctor}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Appointment Type</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option>Consultation</option>
                    <option>Follow-up</option>
                    <option>Check-up</option>
                    <option>Emergency</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <span className="material-symbols-outlined">save</span>
                  Update Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Appointments;