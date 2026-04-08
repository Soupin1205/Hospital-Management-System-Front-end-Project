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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showFAQ, setShowFAQ] = useState(false);

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

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (resetEmail) {
      alert(`Password reset link sent to ${resetEmail}`);
      setShowForgotPassword(false);
      setResetEmail('');
    } else {
      alert('Please enter your email address');
    }
  };

  const faqItems = [
    { question: 'How do I reset my password?', answer: 'Click on "Forgot Password?" link and enter your registered email address to receive a password reset link.' },
    { question: 'How do I add a new patient?', answer: 'Navigate to the Patients page from the sidebar and click the "Register Patient" button.' },
    { question: 'How do I schedule an appointment?', answer: 'Go to the Appointments page and click "Schedule Appointment" to book a new appointment.' },
    { question: 'How do I generate reports?', answer: 'Visit the Reports page where you can generate various reports based on date ranges and filters.' },
    { question: 'How do I manage staff members?', answer: 'Use the Staff page to view, add, and manage all staff members and their information.' },
  ];

  return (
    <div className="login-page-wrapper">
      <div className="bg-animation">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="login-container">
        <div className="login-card-modern">
          <div className="login-header">
            <div className="login-logo">
              <span className="material-symbols-outlined">health_and_safety</span>
            </div>
            <h1>MEDICARE</h1>
            <p>Healthcare Management System</p>
          </div>

          {!showForgotPassword ? (
            <form onSubmit={handleLogin} className="login-form-modern">
              <div className="input-group">
                <span className="material-symbols-outlined input-icon">person</span>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <span className="material-symbols-outlined input-icon">lock</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span 
                  className="material-symbols-outlined password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </div>

              <div className="login-attempts">
                Attempts: {attempts}
              </div>

              <button type="submit" className="login-button">
                <span className="material-symbols-outlined">login</span>
                Sign In
              </button>

              <div className="login-links">
                <button 
                  type="button" 
                  className="link-button"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="login-form-modern">
              <div className="input-group">
                <span className="material-symbols-outlined input-icon">email</span>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="login-button">
                <span className="material-symbols-outlined">send</span>
                Send Reset Link
              </button>

              <button 
                type="button" 
                className="link-button back-button"
                onClick={() => setShowForgotPassword(false)}
              >
                ← Back to Login
              </button>
            </form>
          )}

          {errorMsg && <div className="error-message">{errorMsg}</div>}
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <div className="faq-header" onClick={() => setShowFAQ(!showFAQ)}>
            <span className="material-symbols-outlined">help</span>
            <h3>Frequently Asked Questions</h3>
            <span className="material-symbols-outlined faq-arrow">
              {showFAQ ? 'expand_less' : 'expand_more'}
            </span>
          </div>
          
          {showFAQ && (
            <div className="faq-content">
              {faqItems.map((item, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-question">
                    <span className="material-symbols-outlined">question_mark</span>
                    <strong>{item.question}</strong>
                  </div>
                  <div className="faq-answer">
                    <span className="material-symbols-outlined">answer</span>
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;