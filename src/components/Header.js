import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    const roleRoutes = {
      junior_engineer: '/je/dashboard',
      senior_engineer: '/se/dashboard',
      admin: '/admin/dashboard',
      contractor: '/contractor/dashboard'
    };
    return roleRoutes[user.role] || '/login';
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">🏛️</div>
            <div className="logo-text">
              <div className="logo-title">DPR Generator</div>
              <div className="logo-subtitle">Government of Rajasthan</div>
            </div>
          </div>
        </div>
        <div className="header-right">
          <nav className="header-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to={getDashboardPath()} className="nav-link">Projects</Link>
            <Link to={getDashboardPath()} className="nav-link">Reports</Link>
            {user ? (
              <>
                <button className="btn-login" onClick={handleLogout}>Logout</button>
                <div className="user-icon">👤</div>
              </>
            ) : (
              <Link to="/login" className="btn-login">Login</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

