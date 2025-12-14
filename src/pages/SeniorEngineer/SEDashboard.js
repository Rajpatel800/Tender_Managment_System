import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './SEDashboard.css';

const SEDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Senior Engineer Dashboard</h1>
        <p className="dashboard-welcome">Welcome, {user?.name || 'Senior Engineer'}</p>
      </div>

      <div className="dashboard-actions">
        <Link to="/se/create-tender" className="action-card primary">
          <div className="action-icon">📋</div>
          <h3 className="action-title">Create Tender</h3>
          <p className="action-description">Create a new tender from approved DPR</p>
        </Link>

        <Link to="/se/review-dpr/1" className="action-card">
          <div className="action-icon">✓</div>
          <h3 className="action-title">Review DPRs</h3>
          <p className="action-description">Review and approve submitted DPRs</p>
        </Link>

        <Link to="/se/approved" className="action-card">
          <div className="action-icon">📄</div>
          <h3 className="action-title">Approved DPRs</h3>
          <p className="action-description">View all approved DPRs</p>
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">15</div>
          <div className="stat-label">Pending Reviews</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">42</div>
          <div className="stat-label">Approved DPRs</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">8</div>
          <div className="stat-label">Active Tenders</div>
        </div>
      </div>
    </div>
  );
};

export default SEDashboard;

