import React from 'react';
import { Link } from 'react-router-dom';
import './MyBids.css';

const MyBids = () => {
  const bids = [
    { id: '1', tenderId: 'TENDER-2024-001', title: 'Water Supply Infrastructure - Phase 2', amount: '₹ 4,500,000', date: '2024-01-22', status: 'Submitted' },
    { id: '2', tenderId: 'TENDER-2024-002', title: 'Road Construction - Village Connectivity', amount: '₹ 8,200,000', date: '2024-01-18', status: 'Under Review' },
    { id: '3', tenderId: 'TENDER-2024-003', title: 'School Building Renovation', amount: '₹ 2,100,000', date: '2024-01-15', status: 'Rejected' },
  ];

  const getStatusClass = (status) => {
    if (status === 'Submitted') return 'submitted';
    if (status === 'Under Review') return 'under-review';
    if (status === 'Accepted') return 'accepted';
    if (status === 'Rejected') return 'rejected';
    return 'submitted';
  };

  return (
    <div className="my-bids-container">
      <div className="my-bids-header">
        <h1 className="page-title">My Bids</h1>
        <Link to="/contractor/dashboard" className="btn-secondary">
          Back to Dashboard
        </Link>
      </div>

      <div className="bids-list">
        {bids.map((bid) => (
          <div key={bid.id} className="bid-card">
            <div className="bid-info">
              <h3 className="bid-title">{bid.title}</h3>
              <div className="bid-details">
                <span className="bid-tender-id">Tender: {bid.tenderId}</span>
                <span className="bid-amount">Bid Amount: {bid.amount}</span>
                <span className="bid-date">Submitted: {bid.date}</span>
              </div>
              <span className={`bid-status ${getStatusClass(bid.status)}`}>
                {bid.status}
              </span>
            </div>
            <div className="bid-actions">
              <Link to={`/contractor/tender/${bid.id}`} className="btn-secondary">
                View Tender
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBids;

