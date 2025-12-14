import React from 'react';
import { Link } from 'react-router-dom';
import './MyDrafts.css';

const MyDrafts = () => {
  const drafts = [
    { id: '1', title: 'Water Supply Infrastructure - Phase 2', date: '2024-01-15', status: 'Draft' },
    { id: '2', title: 'Road Construction - Village Connectivity', date: '2024-01-10', status: 'Draft' },
    { id: '3', title: 'School Building Renovation', date: '2024-01-08', status: 'Draft' },
  ];

  return (
    <div className="drafts-container">
      <div className="drafts-header">
        <h1 className="page-title">My Draft DPRs</h1>
        <Link to="/je/create-dpr" className="btn-primary">
          + Create New DPR
        </Link>
      </div>

      <div className="drafts-list">
        {drafts.map((draft) => (
          <div key={draft.id} className="draft-card">
            <div className="draft-info">
              <h3 className="draft-title">{draft.title}</h3>
              <p className="draft-date">Created: {draft.date}</p>
              <span className="draft-status draft">Draft</span>
            </div>
            <div className="draft-actions">
              <Link to={`/je/dpr-preview/${draft.id}`} className="btn-secondary">
                View
              </Link>
              <Link to={`/je/dpr-preview/${draft.id}`} className="btn-primary">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDrafts;

