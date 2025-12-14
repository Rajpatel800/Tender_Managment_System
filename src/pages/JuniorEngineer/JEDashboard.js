import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './JEDashboard.css';

const JEDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Junior Engineer Dashboard</h1>
        <p className="dashboard-welcome">Welcome, {user?.name || 'Junior Engineer'}</p>
      </div>

      <div className="dashboard-actions">
        <Link to="/je/create-dpr" className="action-card primary">
          <div className="action-icon">+</div>
          <h3 className="action-title">Create New DPR</h3>
          <p className="action-description">Start a new Detailed Project Report</p>
        </Link>

        <Link to="/je/my-drafts" className="action-card">
          <div className="action-icon">📝</div>
          <h3 className="action-title">My Draft DPRs</h3>
          <p className="action-description">View and edit your draft reports</p>
        </Link>

        <Link to="/je/submitted" className="action-card">
          <div className="action-icon">📤</div>
          <h3 className="action-title">Submitted DPRs</h3>
          <p className="action-description">Track your submitted reports</p>
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Draft DPRs</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">8</div>
          <div className="stat-label">Submitted</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">5</div>
          <div className="stat-label">Approved</div>
        </div>
      </div>
    </div>
  );
};

export default JEDashboard;

