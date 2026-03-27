import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Doctors from "./pages/Doctors.jsx";
import Patients from "./pages/Patients.jsx";
import Appointments from "./pages/Appointments.jsx"; // 1. Import the new page
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* 2. Routes that include the Sidebar/Layout */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/patients" element={<Patients />} />

        {/* 3. ADD THIS ROUTE to fix the error */}
        <Route path="/appointments" element={<Appointments />} />

        {/* 4. Catch-all: Redirect unknown routes to Dashboard or Login */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
