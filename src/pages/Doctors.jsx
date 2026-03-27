import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import "./../styles/doctor.css";

const Doctors = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [doctors, setDoctors] = useState([
    {
      id: "2dbb7b",
      name: "Dr. caaliyo cali",
      specialization: "Neurology",
      email: "caaliyo@gmail.com",
      phone: "612534253452",
      status: "Active",
    },
    {
      id: "643488",
      name: "Dr. ahmed",
      specialization: "Dentistry",
      email: "ahmed@gmail.com",
      phone: "61253253452",
      status: "Active",
    },
    {
      id: "643303",
      name: "Dr. xasan maxamuud",
      specialization: "Psychiatry",
      email: "xasan1@gmail.com",
      phone: "6152435234",
      status: "Active",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
    setFormData({ name: "", specialization: "", email: "", phone: "" });
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const newDoctor = {
      ...formData,
      id: Math.random().toString(36).substr(2, 6),
      status: "Active",
    };
    setDoctors([newDoctor, ...doctors]);
    toggleModal();
  };

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR FIXED ON THE LEFT */}
      <Sidebar />

      <main className="main-content">
        <header className="content-header">
          <div>
            <h1>Doctors Management</h1>
            <p>Manage all doctors in the system</p>
          </div>
          <button className="add-doctor-btn" onClick={toggleModal}>
            <span className="material-symbols-outlined">add</span> Add New
            Doctor
          </button>
        </header>

        <section className="filter-bar">
          <div className="search-box">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder="Search by name, email, or spec..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select>
            <option>All Specializations</option>
          </select>
          <select>
            <option>All Status</option>
          </select>
          <select>
            <option>Name (A-Z)</option>
          </select>
        </section>

        <div className="table-container">
          <table className="doctors-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div className="doc-info">
                      <div className="doc-avatar">
                        {doc.name.replace("Dr. ", "").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="doc-name">{doc.name}</div>
                        <div className="doc-id">ID: {doc.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="spec-badge">{doc.specialization}</span>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div>
                        <span className="material-symbols-outlined">mail</span>{" "}
                        {doc.email}
                      </div>
                      <div>
                        <span className="material-symbols-outlined">call</span>{" "}
                        {doc.phone}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="status-active">{doc.status}</span>
                  </td>
                  <td className="actions">
                    <span className="material-symbols-outlined view">
                      visibility
                    </span>
                    <span className="material-symbols-outlined edit">edit</span>
                    <span
                      className="material-symbols-outlined delete"
                      onClick={() =>
                        setDoctors(doctors.filter((d) => d.id !== doc.id))
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Doctor</h2>
            <form onSubmit={handleAddDoctor}>
              <input
                type="text"
                placeholder="Full Name"
                required
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Specialization"
                required
                onChange={(e) =>
                  setFormData({ ...formData, specialization: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                required
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <div className="modal-actions">
                <button type="button" onClick={toggleModal}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
