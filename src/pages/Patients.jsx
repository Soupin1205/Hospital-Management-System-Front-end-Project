import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import "./../styles/doctor.css";

const Patients = () => {
  // --- 1. STATE ---
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([
    {
      id: "247600af",
      name: "cali",
      email: "calikulane@gmail.com",
      phone: "612543524352",
      status: "Active",
      date: "Dec 20, 2025",
    },
    {
      id: "342b033e",
      name: "muno cali",
      email: "muno@gmail.com",
      phone: "6123532425",
      status: "Active",
      date: "Dec 16, 2025",
    },
    {
      id: "44549702",
      name: "mohamed ahmed",
      email: "mohamed@gmail.com",
      phone: "61368255678",
      status: "Active",
      date: "Dec 15, 2025",
    },
  ]);

  // Make sure specialization is here!
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    gender: "Male",
    age: "",
  });

  // --- 2. HANDLERS ---
  const handleRegister = (e) => {
    e.preventDefault();
    const newPatient = {
      ...formData,
      id: Math.random().toString(36).substr(2, 8),
      status: "Active",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setPatients([newPatient, ...patients]);
    setShowModal(false);
    // Reset Form
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      gender: "Male",
      age: "",
    });
  };

  // --- 3. SEARCH LOGIC ---
  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm),
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <header className="content-header">
          <div>
            <h1>Patients Management</h1>
            <p>Manage and monitor all patient records</p>
          </div>
          <button className="add-doctor-btn" onClick={() => setShowModal(true)}>
            <span className="material-symbols-outlined">person_add</span>{" "}
            Register Patient
          </button>
        </header>

        {/* STATS CARDS */}
        <section className="stats-grid">
          <div className="stat-card green">
            <div className="stat-info">
              <p>Total Patients</p>
              <h3>{patients.length}</h3>
            </div>
            <span className="material-symbols-outlined">group</span>
          </div>
          <div className="stat-card blue">
            <div className="stat-info">
              <p>Active Today</p>
              <h3>2</h3>
            </div>
            <span className="material-symbols-outlined">today</span>
          </div>
          <div className="stat-card purple">
            <div className="stat-info">
              <p>New This Month</p>
              <h3>1</h3>
            </div>
            <span className="material-symbols-outlined">person_add</span>
          </div>
          <div className="stat-card orange">
            <div className="stat-info">
              <p>Appointments</p>
              <h3>5</h3>
            </div>
            <span className="material-symbols-outlined">event</span>
          </div>
        </section>

        {/* SEARCH BAR */}
        <section className="filter-bar">
          <div className="search-box">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        {/* TABLE */}
        <div className="table-container">
          <table className="doctors-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Contact</th>
                <th>Account Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((pat) => (
                <tr key={pat.id}>
                  <td>
                    <div className="doc-info">
                      <div className="doc-avatar">
                        {pat.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="doc-name">{pat.name}</div>
                        <div className="doc-id">ID: {pat.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-cell">
                      <span>
                        <i className="material-symbols-outlined">mail</i>{" "}
                        {pat.email}
                      </span>
                      <span>
                        <i className="material-symbols-outlined">call</i>{" "}
                        {pat.phone}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="account-info">
                      <div>
                        Created: <strong>{pat.date}</strong>
                      </div>
                      <div className="status-pill active">
                        Status: {pat.status}
                      </div>
                    </div>
                  </td>
                  <td className="actions">
                    <span className="material-symbols-outlined edit">
                      edit_square
                    </span>
                    <span
                      className="material-symbols-outlined delete"
                      onClick={() =>
                        setPatients(patients.filter((p) => p.id !== pat.id))
                      }
                    >
                      delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* --- MODAL (FIXED 2-COLUMN) --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Register New Patient</h2>
              <span
                className="material-symbols-outlined close-icon"
                onClick={() => setShowModal(false)}
              >
                close
              </span>
            </div>
            <form onSubmit={handleRegister} className="modal-form">
              {/* ROW 1: Name and Specialization */}
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Specialization *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cardiology"
                  value={formData.specialization}
                  onChange={(e) =>
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                />
              </div>

              {/* ROW 2: Email and Phone */}
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              {/* ROW 3: BUTTONS (Spans full width) */}
              <div className="modal-actions full-width">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
