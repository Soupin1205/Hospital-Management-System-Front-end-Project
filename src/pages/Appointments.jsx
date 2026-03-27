import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/doctor.css"; // Reuse your modern styles

const Appointments = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <header className="content-header">
          <div>
            <h1>Appointments</h1>
            <p>View and manage patient schedules</p>
          </div>
        </header>

        <div className="table-container">
          <div
            style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "48px" }}
            >
              calendar_month
            </span>
            <p>Appointment scheduling coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// CRITICAL: This is the line you are likely missing!
export default Appointments;
