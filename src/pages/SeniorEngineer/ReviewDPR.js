import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ReviewDPR.css';

const ReviewDPR = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState('');

  const handleApprove = () => {
    alert('DPR approved successfully!');
    navigate('/se/approved');
  };

  const handleSendBack = () => {
    if (!comments.trim()) {
      alert('Please provide comments before sending back.');
      return;
    }
    alert('DPR sent back for correction.');
    navigate('/se/dashboard');
  };

  return (
    <div className="review-dpr-container">
      <div className="review-dpr-header">
        <h1 className="page-title">Review DPR</h1>
        <p className="page-subtitle">DPR ID: {id}</p>
      </div>

      <div className="dpr-review-card">
        <div className="dpr-preview-section">
          <h2 className="section-title">DPR Details</h2>
          
          <div className="dpr-info-section">
            <div className="info-row">
              <span className="info-label">Project Title:</span>
              <span className="info-value">Water Supply Infrastructure - Phase 2</span>
            </div>
            <div className="info-row">
              <span className="info-label">Project Code:</span>
              <span className="info-value">DPR-2024-001</span>
            </div>
            <div className="info-row">
              <span className="info-label">Department:</span>
              <span className="info-value">Public Health Engineering</span>
            </div>
            <div className="info-row">
              <span className="info-label">Location:</span>
              <span className="info-value">Jaipur District, Rajasthan</span>
            </div>
            <div className="info-row">
              <span className="info-label">Estimated Cost:</span>
              <span className="info-value">₹ 4,625,000</span>
            </div>
            <div className="info-row">
              <span className="info-label">Timeline:</span>
              <span className="info-value">12 Months</span>
            </div>
          </div>

          <div className="dpr-description-section">
            <h3 className="subsection-title">Project Description</h3>
            <div className="description-text">
              This project involves the construction of water supply infrastructure in rural areas of Rajasthan. 
              The project aims to provide clean drinking water to 50 villages in Jaipur district through a 
              comprehensive pipeline network and water treatment facilities.
            </div>
          </div>

          <div className="dpr-cost-section">
            <h3 className="subsection-title">Cost Summary</h3>
            <div className="cost-summary">
              <div className="cost-item">
                <span>Total Estimated Cost:</span>
                <span className="cost-amount">₹ 4,625,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="review-section">
          <h2 className="section-title">Review & Comments</h2>
          <div className="comment-box">
            <label htmlFor="comments">Remarks / Comments</label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter your review comments here..."
              rows="6"
            />
          </div>

          <div className="review-actions">
            <button className="btn-danger" onClick={handleSendBack}>
              Send Back for Correction
            </button>
            <button className="btn-success" onClick={handleApprove}>
              Approve DPR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDPR;

