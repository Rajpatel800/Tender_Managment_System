import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SubmitBid.css';

const SubmitBid = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bidAmount: '',
    technicalProposal: null,
    financialProposal: null,
    compliance: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0] || null
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.bidAmount || !formData.technicalProposal || !formData.financialProposal) {
      alert('Please fill all required fields and upload documents.');
      return;
    }

    if (!formData.compliance) {
      alert('Please confirm compliance with all terms and conditions.');
      return;
    }

    alert('Bid submitted successfully!');
    navigate('/contractor/my-bids');
  };

  return (
    <div className="submit-bid-container">
      <div className="submit-bid-header">
        <h1 className="page-title">Submit Bid</h1>
        <p className="page-subtitle">Tender ID: TENDER-2024-{id}</p>
      </div>

      <div className="bid-form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="section-title">Bid Information</h3>
            <div className="form-group">
              <label htmlFor="bidAmount">Bid Amount (₹) *</label>
              <input
                type="number"
                id="bidAmount"
                name="bidAmount"
                value={formData.bidAmount}
                onChange={handleInputChange}
                placeholder="Enter your bid amount"
                required
              />
              <p className="form-hint">Estimated Cost: ₹ 4,625,000</p>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Documents</h3>
            <div className="form-group">
              <label htmlFor="technicalProposal">Technical Proposal (PDF) *</label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="technicalProposal"
                  name="technicalProposal"
                  accept=".pdf"
                  onChange={handleInputChange}
                  required
                />
                {formData.technicalProposal && (
                  <span className="file-name">{formData.technicalProposal.name}</span>
                )}
              </div>
              <p className="form-hint">Upload your technical proposal document (PDF format, max 10MB)</p>
            </div>

            <div className="form-group">
              <label htmlFor="financialProposal">Financial Proposal (PDF/XLS) *</label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="financialProposal"
                  name="financialProposal"
                  accept=".pdf,.xls,.xlsx"
                  onChange={handleInputChange}
                  required
                />
                {formData.financialProposal && (
                  <span className="file-name">{formData.financialProposal.name}</span>
                )}
              </div>
              <p className="form-hint">Upload your financial proposal (PDF or Excel format, max 10MB)</p>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Compliance</h3>
            <div className="compliance-box">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="compliance"
                  checked={formData.compliance}
                  onChange={handleInputChange}
                  required
                />
                <span>
                  I confirm that I have read and understood all the terms and conditions of this tender. 
                  I comply with all requirements and agree to abide by the tender conditions.
                </span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate(`/contractor/tender/${id}`)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Submit Bid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitBid;

