import React, { useState } from 'react';

const Doctors = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('All Specializations');
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology', email: 'sarah.johnson@medicare.com', phone: '(555) 123-4567', status: 'Active', experience: '12 years' },
    { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurology', email: 'michael.chen@medicare.com', phone: '(555) 234-5678', status: 'Active', experience: '8 years' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Pediatrics', email: 'emily.rodriguez@medicare.com', phone: '(555) 345-6789', status: 'Active', experience: '15 years' },
    { id: 4, name: 'Dr. James Wilson', specialization: 'Orthopedics', email: 'james.wilson@medicare.com', phone: '(555) 456-7890', status: 'Inactive', experience: '10 years' },
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

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      email: doctor.email,
      phone: doctor.phone,
      experience: doctor.experience
    });
    setShowEditModal(true);
  };

  const handleUpdateDoctor = (e) => {
    e.preventDefault();
    const updatedDoctors = doctors.map(d => 
      d.id === editingDoctor.id 
        ? { ...d, ...formData }
        : d
    );
    setDoctors(updatedDoctors);
    setShowEditModal(false);
    setEditingDoctor(null);
    setFormData({ name: '', specialization: '', email: '', phone: '', experience: '' });
  };

  const handleDeleteDoctor = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(d => d.id !== id));
    }
  };

  const specializations = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Psychiatry'];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = specializationFilter === 'All Specializations' || doc.specialization === specializationFilter;
    return matchesSearch && matchesSpecialization;
  });

  return (
    <>
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <span className="material-symbols-outlined">medical_services</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">{doctors.filter(d => d.status === 'Active').length}</span>
            <span className="metric-label">Active Doctors</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <span className="material-symbols-outlined">category</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">{specializations.length}</span>
            <span className="metric-label">Specializations</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">{doctors.length}</span>
            <span className="metric-label">Total Doctors</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">{doctors.filter(d => d.status === 'Inactive').length}</span>
            <span className="metric-label">Inactive</span>
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
          <select 
            className="filter-select"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
          >
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
              <div className="doctor-avatar">
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
              <button className="action-btn edit" onClick={() => handleEditDoctor(doctor)}>
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button className="action-btn delete" onClick={() => handleDeleteDoctor(doctor.id)}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Doctor Modal */}
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

      {/* Edit Doctor Modal */}
      {showEditModal && editingDoctor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-header-icon">
                <span className="material-symbols-outlined">edit</span>
              </div>
              <h2>Edit Doctor</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleUpdateDoctor} className="modal-form">
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
                  <label>Specialization</label>
                  <select
                    required
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  >
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
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Years of Experience</label>
                  <input
                    type="text"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <span className="material-symbols-outlined">save</span>
                  Update Doctor
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