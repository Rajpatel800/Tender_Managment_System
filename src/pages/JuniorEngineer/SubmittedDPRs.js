import React from 'react';
import { Link } from 'react-router-dom';
import './SubmittedDPRs.css';

const SubmittedDPRs = () => {
  const submitted = [
    { id: '1', title: 'Water Supply Infrastructure - Phase 2', date: '2024-01-12', status: 'Under Review' },
    { id: '2', title: 'Road Construction - Village Connectivity', date: '2024-01-05', status: 'Approved' },
    { id: '3', title: 'School Building Renovation', date: '2024-01-03', status: 'Sent Back' },
  ];

  const getStatusClass = (status) => {
    if (status === 'Approved') return 'approved';
    if (status === 'Sent Back') return 'sent-back';
    return 'under-review';
  };

  return (
    <div className="submitted-container">
      <div className="submitted-header">
        <h1 className="page-title">Submitted DPRs</h1>
        <Link to="/je/create-dpr" className="btn-primary">
          + Create New DPR
        </Link>
      </div>

      <div className="submitted-list">
        {submitted.map((item) => (
          <div key={item.id} className="submitted-card">
            <div className="submitted-info">
              <h3 className="submitted-title">{item.title}</h3>
              <p className="submitted-date">Submitted: {item.date}</p>
              <span className={`submitted-status ${getStatusClass(item.status)}`}>
                {item.status}
              </span>
            </div>
            <div className="submitted-actions">
              <Link to={`/je/dpr-preview/${item.id}`} className="btn-secondary">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmittedDPRs;

