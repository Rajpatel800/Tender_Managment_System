import React from 'react';
import { Link } from 'react-router-dom';
import './ApprovedDPRs.css';

const ApprovedDPRs = () => {
  const approved = [
    { id: '1', title: 'Water Supply Infrastructure - Phase 2', date: '2024-01-20', cost: '₹ 4,625,000' },
    { id: '2', title: 'Road Construction - Village Connectivity', date: '2024-01-18', cost: '₹ 8,500,000' },
    { id: '3', title: 'School Building Renovation', date: '2024-01-15', cost: '₹ 2,300,000' },
  ];

  return (
    <div className="approved-container">
      <div className="approved-header">
        <h1 className="page-title">Approved DPRs</h1>
        <Link to="/se/create-tender" className="btn-primary">
          + Create Tender
        </Link>
      </div>

      <div className="approved-list">
        {approved.map((item) => (
          <div key={item.id} className="approved-card">
            <div className="approved-info">
              <h3 className="approved-title">{item.title}</h3>
              <div className="approved-details">
                <span className="approved-date">Approved: {item.date}</span>
                <span className="approved-cost">Cost: {item.cost}</span>
              </div>
              <span className="approved-status">Approved</span>
            </div>
            <div className="approved-actions">
              <Link to={`/se/review-dpr/${item.id}`} className="btn-secondary">
                View Details
              </Link>
              <Link to={`/se/create-tender?dpr=${item.id}`} className="btn-primary">
                Create Tender
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovedDPRs;

