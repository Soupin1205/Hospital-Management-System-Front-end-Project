import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    twoFactor: false,
    language: 'English',
    timezone: 'EST',
    dateFormat: 'MM/DD/YYYY'
  });

  const handleToggle = (setting) => {
    setSettings({ ...settings, [setting]: !settings[setting] });
  };

  return (
    <>
      <div className="settings-container">
        <div className="settings-sidebar">
          <div className="settings-nav">
            <button className="settings-nav-item active">
              <span className="material-symbols-outlined">person</span>
              Profile
            </button>
            <button className="settings-nav-item">
              <span className="material-symbols-outlined">notifications</span>
              Notifications
            </button>
            <button className="settings-nav-item">
              <span className="material-symbols-outlined">security</span>
              Security
            </button>
            <button className="settings-nav-item">
              <span className="material-symbols-outlined">language</span>
              Preferences
            </button>
          </div>
        </div>
        <div className="settings-content">
          <div className="settings-section">
            <h3>Profile Information</h3>
            <div className="profile-form">
              <div className="avatar-section">
                <div className="profile-avatar">AD</div>
                <button className="change-avatar-btn">Change Avatar</button>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue="Admin User" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" defaultValue="admin@medicare.com" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" defaultValue="+1 (555) 000-0000" />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" defaultValue="System Administrator" disabled />
                </div>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Notification Preferences</h3>
            <div className="toggle-group">
              <div className="toggle-item">
                <div>
                  <span className="toggle-label">Push Notifications</span>
                  <span className="toggle-description">Receive push notifications for updates</span>
                </div>
                <button
                  className={`toggle-switch ${settings.notifications ? 'active' : ''}`}
                  onClick={() => handleToggle('notifications')}
                >
                  <span className="toggle-slider"></span>
                </button>
              </div>
              <div className="toggle-item">
                <div>
                  <span className="toggle-label">Email Alerts</span>
                  <span className="toggle-description">Get email alerts for important events</span>
                </div>
                <button
                  className={`toggle-switch ${settings.emailAlerts ? 'active' : ''}`}
                  onClick={() => handleToggle('emailAlerts')}
                >
                  <span className="toggle-slider"></span>
                </button>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Security</h3>
            <div className="toggle-item">
              <div>
                <span className="toggle-label">Two-Factor Authentication</span>
                <span className="toggle-description">Add an extra layer of security to your account</span>
              </div>
              <button
                className={`toggle-switch ${settings.twoFactor ? 'active' : ''}`}
                onClick={() => handleToggle('twoFactor')}
              >
                <span className="toggle-slider"></span>
              </button>
            </div>
            <button className="change-password-btn">Change Password</button>
          </div>

          <div className="settings-actions">
            <button className="cancel-btn">Cancel</button>
            <button className="save-btn">Save Changes</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;