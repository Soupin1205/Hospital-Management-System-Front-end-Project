import React, { useState } from 'react';

const Patients = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([
    { id: 1, name: 'Sophie Bennett', email: 'sophie@email.com', phone: '(555) 123-4567', disease: 'Stroke', status: 'Active', date: 'Dec 20, 2024' },
    { id: 2, name: 'Liam Parker', email: 'liam@email.com', phone: '(555) 234-5678', disease: 'Arrhythmia', status: 'Active', date: 'Dec 19, 2024' },
    { id: 3, name: 'Jackson Mitchell', email: 'jackson@email.com', phone: '(555) 345-6789', disease: 'Viral Fever', status: 'Active', date: 'Dec 18, 2024' },
  ]);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', disease: ''
  });

  const handleAddPatient = (e) => {
    e.preventDefault();
    const newPatient = {
      ...formData,
      id: patients.length + 1,
      status: 'Active',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setPatients([newPatient, ...patients]);
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '', disease: '' });
  };

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="page-header">
        <div className="header-stats">
          <div className="header-stat">
            <span className="stat-number">{patients.length}</span>
            <span className="stat-label">Total Patients</span>
          </div>
          <div className="header-stat">
            <span className="stat-number">+{patients.filter(p => p.date.includes('Dec')).length}</span>
            <span className="stat-label">This Month</span>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-bar">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <span className="clear-search" onClick={() => setSearchTerm('')}>
              <span className="material-symbols-outlined">close</span>
            </span>
          )}
        </div>
        <div className="filter-actions">
          <select className="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Discharged</option>
          </select>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            <span className="material-symbols-outlined">person_add</span>
            Register Patient
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Contact Information</th>
              <th>Diagnosis</th>
              <th>Registered</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>
                  <div className="patient-info">
                    <div className="patient-avatar large">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <div className="patient-name">{patient.name}</div>
                      <div className="patient-id">ID: #{patient.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <div className="contact-item">
                      <span className="material-symbols-outlined">mail</span>
                      {patient.email}
                    </div>
                    <div className="contact-item">
                      <span className="material-symbols-outlined">call</span>
                      {patient.phone}
                    </div>
                  </div>
                </td>
                <td>
                  <span className="diagnosis-badge">{patient.disease}</span>
                </td>
                <td>{patient.date}</td>
                <td>
                  <span className={`status-badge status-${patient.status.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {patient.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="action-btn edit">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => setPatients(patients.filter(p => p.id !== patient.id))}
                  >
                    <span className="material-symbols-outlined">delete</span>
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-header-icon">
                <span className="material-symbols-outlined">person_add</span>
              </div>
              <h2>Register New Patient</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Disease / Condition</label>
                  <input
                    type="text"
                    placeholder="Enter diagnosis"
                    required
                    value={formData.disease}
                    onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
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
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
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

export default Patients;