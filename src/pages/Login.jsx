import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isAuthenticated', 'true');
      setAttempts(0);
      setErrorMsg('');
      navigate('/dashboard');
    } else {
      setAttempts((prev) => prev + 1);
      setErrorMsg('Invalid username or password.');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="bg-animation">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      <div className="content-container">
        <div className="branding-side">
          <div className="logo-hexagon">
            <div className="logo-circle-inner">
              <span className="material-symbols-outlined">stethoscope_amp</span>
            </div>
          </div>
          <div className="brand-text">
            <h1 className="main-title">MEDICARE</h1>
            <p className="sub-title">Healthcare Management System</p>
          </div>
        </div>
        <div className="login-card">
          <h2 className="signin-header">SIGN IN</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-field-group">
              <span className="material-symbols-outlined icon-left">account_circle</span>
              <input
                type="text"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="glass-input"
              />
            </div>
            <div className="input-field-group">
              <span className="material-symbols-outlined icon-left">lock</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="glass-input"
              />
              <span
                className="material-symbols-outlined icon-right toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </div>
            <div className="attempts-display">LOGIN ATTEMPTS: {attempts}</div>
            <button type="submit" className="login-submit-btn">
              <span className="btn-glow"></span>
              LOG IN
            </button>
            <div className="form-footer">
              <button type="button" className="text-link" onClick={() => alert("Reset link sent!")}>
                FORGOT PASSWORD?
              </button>
              <div className="divider-line"></div>
              <button type="button" className="text-link faq-btn" onClick={() => alert("FAQ Page")}>
                FREQUENTLY ASKED QUESTIONS
              </button>
            </div>
            {errorMsg && <div className="error-toast">{errorMsg}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;