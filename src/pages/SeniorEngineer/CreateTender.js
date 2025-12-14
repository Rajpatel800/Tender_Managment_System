import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './CreateTender.css';

const CreateTender = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedDPR, setSelectedDPR] = useState(searchParams.get('dpr') || '');
  const [formData, setFormData] = useState({
    tenderTitle: '',
    estimatedCost: '',
    tenderFee: '',
    emd: '',
    submissionDate: '',
    openingDate: '',
    completionDate: ''
  });

  const approvedDPRs = [
    { id: '1', title: 'Water Supply Infrastructure - Phase 2', cost: '₹ 4,625,000' },
    { id: '2', title: 'Road Construction - Village Connectivity', cost: '₹ 8,500,000' },
    { id: '3', title: 'School Building Renovation', cost: '₹ 2,300,000' },
  ];

  useEffect(() => {
    if (selectedDPR) {
      const dpr = approvedDPRs.find(d => d.id === selectedDPR);
      if (dpr) {
        setFormData(prev => ({
          ...prev,
          tenderTitle: dpr.title,
          estimatedCost: dpr.cost
        }));
      }
    }
  }, [selectedDPR]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePublish = () => {
    if (!selectedDPR || !formData.tenderFee || !formData.emd || !formData.submissionDate) {
      alert('Please fill all required fields.');
      return;
    }
    alert('Tender published successfully!');
    navigate('/se/dashboard');
  };

  return (
    <div className="create-tender-container">
      <div className="create-tender-header">
        <h1 className="page-title">Create New Tender</h1>
        <p className="page-subtitle">Create a tender from an approved DPR</p>
      </div>

      <div className="tender-form-card">
        <div className="form-section">
          <h3 className="section-title">Select Approved DPR</h3>
          <div className="form-group">
            <label>Select DPR *</label>
            <select
              name="selectedDPR"
              value={selectedDPR}
              onChange={(e) => setSelectedDPR(e.target.value)}
              required
            >
              <option value="">-- Select DPR --</option>
              {approvedDPRs.map((dpr) => (
                <option key={dpr.id} value={dpr.id}>
                  {dpr.title} - {dpr.cost}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Tender Details</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Project Title *</label>
              <input
                type="text"
                name="tenderTitle"
                value={formData.tenderTitle}
                onChange={handleInputChange}
                placeholder="Auto-filled from DPR"
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Estimated Cost *</label>
              <input
                type="text"
                name="estimatedCost"
                value={formData.estimatedCost}
                onChange={handleInputChange}
                placeholder="Auto-filled from DPR"
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Tender Number</label>
              <input
                type="text"
                name="tenderNumber"
                value={`TENDER-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Fee & EMD</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Tender Fee (₹) *</label>
              <input
                type="number"
                name="tenderFee"
                value={formData.tenderFee}
                onChange={handleInputChange}
                placeholder="Enter tender fee"
                required
              />
            </div>
            <div className="form-group">
              <label>EMD Amount (₹) *</label>
              <input
                type="number"
                name="emd"
                value={formData.emd}
                onChange={handleInputChange}
                placeholder="Enter EMD amount"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Important Dates</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Submission Deadline *</label>
              <input
                type="date"
                name="submissionDate"
                value={formData.submissionDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Tender Opening Date *</label>
              <input
                type="date"
                name="openingDate"
                value={formData.openingDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Expected Completion Date</label>
              <input
                type="date"
                name="completionDate"
                value={formData.completionDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">BOQ Preview</h3>
          <div className="boq-preview">
            <p className="boq-note">BOQ will be auto-filled from the selected DPR</p>
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
                    <td>Plain cement concrete</td>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-secondary" onClick={() => navigate('/se/dashboard')}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handlePublish}>
            Publish Tender
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTender;

