import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-welcome">Welcome, {user?.name || 'Administrator'}</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div className="stat-value">156</div>
          <div className="stat-label">Total DPRs</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-value">42</div>
          <div className="stat-label">Total Tenders</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏗️</div>
          <div className="stat-value">28</div>
          <div className="stat-label">Active Works</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">125</div>
          <div className="stat-label">Contractors Registered</div>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/admin/users" className="action-card">
          <div className="action-icon">👤</div>
          <h3 className="action-title">User Management</h3>
          <p className="action-description">Manage Junior Engineers, Senior Engineers, and Contractors</p>
        </Link>

        <Link to="/admin/rate-master" className="action-card">
          <div className="action-icon">💰</div>
          <h3 className="action-title">Rate Master</h3>
          <p className="action-description">Manage pipe rates, pump rates, and material costs</p>
        </Link>

        <Link to="/admin/settings" className="action-card">
          <div className="action-icon">⚙️</div>
          <h3 className="action-title">System Settings</h3>
          <p className="action-description">Configure system parameters and preferences</p>
        </Link>

        <Link to="/admin/audit-logs" className="action-card">
          <div className="action-icon">📊</div>
          <h3 className="action-title">Audit Logs</h3>
          <p className="action-description">View system activity and audit trails</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

