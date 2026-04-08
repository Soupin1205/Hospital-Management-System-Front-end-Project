import React, { useState } from 'react';

const Doctors = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology', email: 'sarah.johnson@medicare.com', phone: '(555) 123-4567', status: 'Active', experience: '12 years' },
    { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurology', email: 'michael.chen@medicare.com', phone: '(555) 234-5678', status: 'Active', experience: '8 years' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Pediatrics', email: 'emily.rodriguez@medicare.com', phone: '(555) 345-6789', status: 'Active', experience: '15 years' },
  ]);

  const [formData, setFormData] = useState({
    name: '', specialization: '', email: '', phone: '', experience: ''
  });

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const newDoctor = {
      ...formData,
      id: doctors.length + 1,
      status: 'Active'
    };
    setDoctors([...doctors, newDoctor]);
    setShowModal(false);
    setFormData({ name: '', specialization: '', email: '', phone: '', experience: '' });
  };

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const specializations = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Psychiatry'];

  return (
    <>
      <div className="page-header">
        <div className="header-stats">
          <div className="header-stat">
            <span className="stat-number">{doctors.length}</span>
            <span className="stat-label">Active Doctors</span>
          </div>
          <div className="header-stat">
            <span className="stat-number">{specializations.length}</span>
            <span className="stat-label">Specializations</span>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-bar">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-actions">
          <select className="filter-select">
            <option>All Specializations</option>
            {specializations.map(spec => (
              <option key={spec}>{spec}</option>
            ))}
          </select>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            <span className="material-symbols-outlined">add</span>
            Add Doctor
          </button>
        </div>
      </div>

      <div className="doctors-grid">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-card-header">
              <div className="doctor-avatar large">
                {doctor.name.replace('Dr. ', '').charAt(0)}
              </div>
              <div className="doctor-status">
                <span className={`status-badge status-${doctor.status.toLowerCase()}`}>
                  <span className="status-dot"></span>
                  {doctor.status}
                </span>
              </div>
            </div>
            <div className="doctor-card-body">
              <h3 className="doctor-name">{doctor.name}</h3>
              <span className="doctor-specialty">{doctor.specialization}</span>
              <div className="doctor-details">
                <div className="detail-item">
                  <span className="material-symbols-outlined">mail</span>
                  <span>{doctor.email}</span>
                </div>
                <div className="detail-item">
                  <span className="material-symbols-outlined">call</span>
                  <span>{doctor.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="material-symbols-outlined">work_history</span>
                  <span>{doctor.experience} experience</span>
                </div>
              </div>
            </div>
            <div className="doctor-card-footer">
              <button className="action-btn edit">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button className="action-btn view">
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button
                className="action-btn delete"
                onClick={() => setDoctors(doctors.filter(d => d.id !== doctor.id))}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-header-icon">
                <span className="material-symbols-outlined">medical_services</span>
              </div>
              <h2>Add New Doctor</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddDoctor} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Dr. John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Specialization</label>
                  <select
                    required
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  >
                    <option value="">Select Specialization</option>
                    {specializations.map(spec => (
                      <option key={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="doctor@medicare.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Years of Experience</label>
                  <input
                    type="text"
                    placeholder="e.g., 10 years"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <span className="material-symbols-outlined">save</span>
                  Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Doctors;