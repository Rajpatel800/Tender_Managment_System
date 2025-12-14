import React from 'react';
import './AwardedWorks.css';

const AwardedWorks = () => {
  const awarded = [
    { id: '1', tenderId: 'TENDER-2024-010', title: 'Water Supply Infrastructure - Phase 1', amount: '₹ 3,800,000', date: '2024-01-10', status: 'In Progress' },
    { id: '2', tenderId: 'TENDER-2024-008', title: 'Community Center Construction', amount: '₹ 5,200,000', date: '2023-12-15', status: 'Completed' },
    { id: '3', tenderId: 'TENDER-2024-005', title: 'Road Repair Works', amount: '₹ 1,500,000', date: '2023-11-20', status: 'Completed' },
  ];

  const getStatusClass = (status) => {
    if (status === 'In Progress') return 'in-progress';
    if (status === 'Completed') return 'completed';
    return 'in-progress';
  };

  return (
    <div className="awarded-works-container">
      <div className="awarded-works-header">
        <h1 className="page-title">Awarded Works</h1>
      </div>

      <div className="awarded-list">
        {awarded.map((work) => (
          <div key={work.id} className="awarded-card">
            <div className="awarded-info">
              <h3 className="awarded-title">{work.title}</h3>
              <div className="awarded-details">
                <span className="awarded-tender-id">Tender: {work.tenderId}</span>
                <span className="awarded-amount">Awarded Amount: {work.amount}</span>
                <span className="awarded-date">Awarded: {work.date}</span>
              </div>
              <span className={`awarded-status ${getStatusClass(work.status)}`}>
                {work.status}
              </span>
            </div>
            <div className="awarded-actions">
              <button className="btn-primary">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardedWorks;

