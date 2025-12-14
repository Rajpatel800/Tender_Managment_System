import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './ContractorDashboard.css';

const ContractorDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Contractor Dashboard</h1>
        <p className="dashboard-welcome">Welcome, {user?.name || 'Contractor'}</p>
      </div>

      <div className="dashboard-actions">
        <Link to="/contractor/tender/1" className="action-card primary">
          <div className="action-icon">📋</div>
          <h3 className="action-title">Active Tenders</h3>
          <p className="action-description">View and bid on active tenders</p>
        </Link>

        <Link to="/contractor/my-bids" className="action-card">
          <div className="action-icon">📤</div>
          <h3 className="action-title">My Bids</h3>
          <p className="action-description">Track your submitted bids</p>
        </Link>

        <Link to="/contractor/awarded" className="action-card">
          <div className="action-icon">🏆</div>
          <h3 className="action-title">Awarded Works</h3>
          <p className="action-description">View your awarded projects</p>
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Active Tenders</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">8</div>
          <div className="stat-label">My Bids</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">3</div>
          <div className="stat-label">Awarded Works</div>
        </div>
      </div>
    </div>
  );
};

export default ContractorDashboard;

