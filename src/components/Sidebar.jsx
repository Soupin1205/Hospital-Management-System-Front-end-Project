import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-header">HOME CARE</h2>

      <ul className="nav-links">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/patients"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Patients
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Doctors
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Appointment
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Report
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
