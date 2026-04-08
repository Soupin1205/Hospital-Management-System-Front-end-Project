import React, { useState } from 'react';

const Appointments = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'Sophie Bennett', doctor: 'Dr. Sarah Johnson', date: 'Feb 20, 2024', time: '10:00 AM', type: 'Follow-up', status: 'Scheduled' },
    { id: 2, patient: 'Liam Parker', doctor: 'Dr. Michael Chen', date: 'Feb 20, 2024', time: '11:30 AM', type: 'Consultation', status: 'Scheduled' },
    { id: 3, patient: 'Jackson Mitchell', doctor: 'Dr. Emily Rodriguez', date: 'Feb 21, 2024', time: '2:00 PM', type: 'Check-up', status: 'Pending' },
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

  const filteredAppointments = appointments.filter(apt =>
    apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const todayAppointments = appointments.filter(apt => apt.date === 'Feb 20, 2024');

  return (
    <>
      <div className="page-header">
        <div className="header-stats">
          <div className="header-stat">
            <span className="stat-number">{appointments.length}</span>
            <span className="stat-label">Total Appointments</span>
          </div>
          <div className="header-stat">
            <span className="stat-number">{todayAppointments.length}</span>
            <span className="stat-label">Today</span>
          </div>
          <div className="header-stat">
            <span className="stat-number">{appointments.filter(a => a.status === 'Pending').length}</span>
            <span className="stat-label">Pending</span>
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
          <select className="filter-select">
            <option>All Types</option>
            <option>Consultation</option>
            <option>Follow-up</option>
            <option>Check-up</option>
            <option>Emergency</option>
          </select>
          <select className="filter-select">
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
                  <button className="action-btn edit">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => setAppointments(appointments.filter(a => a.id !== apt.id))}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </>
  );
};

export default Appointments;