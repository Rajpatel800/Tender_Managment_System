import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './TenderDetails.css';

const TenderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="tender-details-container">
      <div className="tender-details-header">
        <div>
          <h1 className="page-title">Tender Details</h1>
          <p className="page-subtitle">Tender ID: TENDER-2024-{id}</p>
        </div>
        <Link to="/contractor/dashboard" className="btn-secondary">
          Back to Dashboard
        </Link>
      </div>

      <div className="tender-summary-card">
        <h2 className="card-title">Tender Summary</h2>
        <div className="tender-info-grid">
          <div className="info-item">
            <span className="info-label">Project Title:</span>
            <span className="info-value">Water Supply Infrastructure - Phase 2</span>
          </div>
          <div className="info-item">
            <span className="info-label">Tender Number:</span>
            <span className="info-value">TENDER-2024-{id}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Estimated Cost:</span>
            <span className="info-value">₹ 4,625,000</span>
          </div>
          <div className="info-item">
            <span className="info-label">Tender Fee:</span>
            <span className="info-value">₹ 5,000</span>
          </div>
          <div className="info-item">
            <span className="info-label">EMD Amount:</span>
            <span className="info-value">₹ 92,500</span>
          </div>
          <div className="info-item">
            <span className="info-label">Submission Deadline:</span>
            <span className="info-value">2024-02-15</span>
          </div>
          <div className="info-item">
            <span className="info-label">Tender Opening Date:</span>
            <span className="info-value">2024-02-16</span>
          </div>
          <div className="info-item">
            <span className="info-label">Expected Completion:</span>
            <span className="info-value">12 Months</span>
          </div>
        </div>
      </div>

      <div className="tender-documents-card">
        <h2 className="card-title">Documents</h2>
        <div className="documents-list">
          <div className="document-item">
            <span className="document-icon">📄</span>
            <div className="document-info">
              <span className="document-name">Tender Notice</span>
              <span className="document-size">PDF, 2.5 MB</span>
            </div>
            <button className="btn-download">Download</button>
          </div>
          <div className="document-item">
            <span className="document-icon">📋</span>
            <div className="document-info">
              <span className="document-name">BOQ Document</span>
              <span className="document-size">PDF, 1.8 MB</span>
            </div>
            <button className="btn-download">Download</button>
          </div>
          <div className="document-item">
            <span className="document-icon">📐</span>
            <div className="document-info">
              <span className="document-name">Technical Specifications</span>
              <span className="document-size">PDF, 3.2 MB</span>
            </div>
            <button className="btn-download">Download</button>
          </div>
        </div>
      </div>

      <div className="tender-boq-card">
        <h2 className="card-title">Bill of Quantities (BOQ)</h2>
        <div className="boq-table">
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Description</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Rate (₹)</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Earthwork in excavation</td>
                <td>cu.m</td>
                <td>500</td>
                <td>250</td>
                <td>125,000</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Plain cement concrete (1:4:8)</td>
                <td>cu.m</td>
                <td>150</td>
                <td>4,500</td>
                <td>675,000</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Reinforced cement concrete</td>
                <td>cu.m</td>
                <td>200</td>
                <td>5,000</td>
                <td>1,000,000</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Steel reinforcement</td>
                <td>MT</td>
                <td>50</td>
                <td>60,000</td>
                <td>3,000,000</td>
              </tr>
              <tr>
                <td>5</td>
                <td>PVC pipes (100mm)</td>
                <td>Meter</td>
                <td>1000</td>
                <td>500</td>
                <td>500,000</td>
              </tr>
              <tr className="total-row">
                <td colSpan="5"><strong>Total Estimated Cost</strong></td>
                <td><strong>₹ 4,625,000</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="tender-actions">
        <button className="btn-primary" onClick={() => navigate(`/contractor/submit-bid/${id}`)}>
          Submit Bid
        </button>
      </div>
    </div>
  );
};

export default TenderDetails;

