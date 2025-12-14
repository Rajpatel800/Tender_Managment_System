import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('junior_engineer');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    if (!role) {
      setError('Please select your role');
      return;
    }

    try {
      const user = login(username, password, role);
      
      // Redirect based on role
      const roleRoutes = {
        junior_engineer: '/je/dashboard',
        senior_engineer: '/se/dashboard',
        admin: '/admin/dashboard',
        contractor: '/contractor/dashboard'
      };

      navigate(roleRoutes[user.role] || '/je/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="login-container">
        <div className="login-card">
          <div className="login-icon">📋</div>
          <h1 className="login-title">Tender Portal Login</h1>
          <p className="login-description">
            Access authorized tender documentation and submission tools.
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username / Department ID</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role">Select Role *</label>
              <div className="input-wrapper">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="junior_engineer">Junior Engineer</option>
                  <option value="senior_engineer">Senior Engineer</option>
                  <option value="admin">Admin</option>
                  <option value="contractor">Contractor</option>
                </select>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="btn-signin">
              <span>→</span>
              Sign in to Dashboard
            </button>
          </form>

          <p className="login-disclaimer">
            Unauthorized access is prohibited. This system is for official Government of Rajasthan use only.
          </p>

          <p className="login-help">
            Need help? <a href="#" className="help-link">Contact IT Support</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

