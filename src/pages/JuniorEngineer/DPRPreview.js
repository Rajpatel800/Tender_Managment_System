import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DPRPreview.css';

const DPRPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dprData, setDprData] = useState(null);
  const [status, setStatus] = useState('Draft');

  useEffect(() => {
    // Load DPR data from localStorage
    const storedDPR = localStorage.getItem('current_dpr');
    if (storedDPR) {
      try {
        const parsed = JSON.parse(storedDPR);
        setDprData(parsed);
        setStatus(parsed.status || 'Draft');
      } catch (error) {
        console.error('Error parsing DPR data:', error);
      }
    }
  }, [id]);

  // Get form data or use defaults
  const formData = dprData?.formData || {};
  const generatedDPR = dprData?.generatedDPR || {};

  // Helper function to safely extract string value from AI-generated content
  // Handles cases where AI returns objects instead of strings
  const getStringValue = (value) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      // If it's an array, join it
      if (Array.isArray(value)) {
        return value.map(item => typeof item === 'string' ? item : JSON.stringify(item)).join('\n');
      }
      // If it's an object, try to extract meaningful text
      // Check for common keys that might contain the actual text
      if (value.text) return value.text;
      if (value.description) return value.description;
      if (value.content) return value.content;
      if (value.summary) return value.summary;
      // Otherwise, stringify the object values
      return Object.values(value)
        .filter(v => v !== null && v !== undefined)
        .map(v => typeof v === 'string' ? v : JSON.stringify(v))
        .join('\n');
    }
    return String(value);
  };

  // Format date for display (DD-MMM-YYYY HH:MM AM/PM format)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hoursStr = String(hours).padStart(2, '0');
    return `${day}-${month}-${year} ${hoursStr}:${minutes} ${ampm}`;
  };

  // Calculate document size (mock for now)
  const getDocumentSize = (type) => {
    const sizes = {
      'DPR': '15234.56',
      'BOQ': '987.45',
      'Technical': '2341.23'
    };
    return sizes[type] || '0.00';
  };

  return (
    <div className="dpr-preview-container">
      <div className="dpr-preview-header">
        <div>
          <h1 className="page-title">DPR Preview</h1>
          <p className="page-subtitle">DPR ID: {id}</p>
        </div>
        <div className="status-badge" data-status={status.toLowerCase()}>
          {status}
        </div>
      </div>

      <div className="govt-report-document">
        {/* General Information Section */}
        <table className="govt-table general-info-table">
          <tbody>
            <tr>
              <td className="govt-label">Location:</td>
              <td className="govt-value">{formData.district ? `${formData.district}, ${formData.tehsil || ''}, ${formData.village || ''}` : 'N/A'}</td>
              <td className="govt-label">Pincode:</td>
              <td className="govt-value">{formData.coordinates || '302001'}</td>
            </tr>
            <tr>
              <td className="govt-label">Department:</td>
              <td className="govt-value">{formData.department || 'N/A'}</td>
              <td className="govt-label">Project Code:</td>
              <td className="govt-value">{formData.projectCode || 'N/A'}</td>
            </tr>
            <tr>
              <td className="govt-label">Project Type:</td>
              <td className="govt-value">{formData.projectType || 'N/A'}</td>
              <td className="govt-label">Funding Source:</td>
              <td className="govt-value">{formData.fundingSource || 'N/A'}</td>
            </tr>
            <tr>
              <td className="govt-label">Estimated Budget:</td>
              <td className="govt-value">₹{formData.budget ? Number(formData.budget).toLocaleString('en-IN') : 'N/A'}</td>
              <td className="govt-label">Timeline:</td>
              <td className="govt-value">{formData.timeline || 'N/A'} months</td>
            </tr>
          </tbody>
        </table>

        {/* Critical Dates Section */}
        <div className="govt-section-header">
          <h3>Critical Dates</h3>
        </div>
        <table className="govt-table critical-dates-table">
          <tbody>
            <tr>
              <td className="govt-label">Publish Date:</td>
              <td className="govt-value">{formatDate(dprData?.generatedAt) || formatDate(new Date().toISOString())}</td>
            </tr>
            <tr>
              <td className="govt-label">Project Start Date:</td>
              <td className="govt-value">{formatDate(new Date().toISOString())}</td>
            </tr>
            <tr>
              <td className="govt-label">Expected Completion Date:</td>
              <td className="govt-value">
                {formData.timeline ? (() => {
                  const endDate = new Date();
                  endDate.setMonth(endDate.getMonth() + parseInt(formData.timeline));
                  return formatDate(endDate.toISOString());
                })() : 'N/A'}
              </td>
            </tr>
            <tr>
              <td className="govt-label">Document Generation Date:</td>
              <td className="govt-value">{formatDate(dprData?.generatedAt) || formatDate(new Date().toISOString())}</td>
            </tr>
          </tbody>
        </table>

        {/* Project Documents Section */}
        <div className="govt-section-header">
          <h3>Project Documents</h3>
        </div>
        
        <div className="govt-subsection">
          <h4 className="govt-subsection-title">DPR Document</h4>
          <table className="govt-table documents-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Document Name</th>
                <th>Description</th>
                <th>Document Size (in KB)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>DPR_{formData.projectCode || 'DOC'}.pdf</td>
                <td>Detailed Project Report for {formData.projectTitle || 'Project'}</td>
                <td>{getDocumentSize('DPR')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="govt-subsection">
          <h4 className="govt-subsection-title">Work Item Documents</h4>
          <table className="govt-table documents-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Document Type</th>
                <th>Document Name</th>
                <th>Description</th>
                <th>Document Size (in KB)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Technical Specifications</td>
                <td>Technical_{formData.projectCode || 'DOC'}.pdf</td>
                <td>{formData.technicalSpecs || 'Technical specifications and details'}</td>
                <td>{getDocumentSize('Technical')}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>BOQ</td>
                <td>BOQ_{formData.projectCode || 'DOC'}.xls</td>
                <td>Bill of Quantities - Financial Bid Format</td>
                <td>{getDocumentSize('BOQ')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Project Details Section */}
        <div className="govt-section-header">
          <h3>Project Details</h3>
        </div>
        <table className="govt-table project-details-table">
          <tbody>
            <tr>
              <td className="govt-label">Project Title:</td>
              <td className="govt-value" colSpan="3">{getStringValue(generatedDPR.projectTitle) || formData.projectTitle || 'N/A'}</td>
            </tr>
            <tr>
              <td className="govt-label">Executive Summary:</td>
              <td className="govt-value" colSpan="3" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {getStringValue(generatedDPR.executiveSummary) || 'Executive summary of the project will be displayed here.'}
              </td>
            </tr>
            <tr>
              <td className="govt-label">Project Background:</td>
              <td className="govt-value" colSpan="3" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {getStringValue(generatedDPR.projectBackground) || formData.currentStatus || 'N/A'}
              </td>
            </tr>
            <tr>
              <td className="govt-label">Existing Infrastructure:</td>
              <td className="govt-value" colSpan="3" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {getStringValue(generatedDPR.existingInfrastructure) || formData.existingInfrastructure || 'N/A'}
              </td>
            </tr>
            <tr>
              <td className="govt-label">Technical Specifications:</td>
              <td className="govt-value" colSpan="3" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {getStringValue(generatedDPR.technicalSpecifications) || formData.technicalSpecs || 'N/A'}
              </td>
            </tr>
            <tr>
              <td className="govt-label">Materials Required:</td>
              <td className="govt-value" colSpan="3" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {getStringValue(generatedDPR.materialsRequired) || formData.materials || 'N/A'}
              </td>
            </tr>
            <tr>
              <td className="govt-label">Equipment Required:</td>
              <td className="govt-value" colSpan="3" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {getStringValue(generatedDPR.equipmentRequired) || formData.equipment || 'N/A'}
              </td>
            </tr>
            <tr>
              <td className="govt-label">Scope of Work:</td>
              <td className="govt-value" colSpan="3" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {getStringValue(generatedDPR.scopeOfWork) || 'N/A'}
              </td>
            </tr>
            <tr>
              <td className="govt-label">Implementation Plan:</td>
              <td className="govt-value" colSpan="3" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {getStringValue(generatedDPR.implementationPlan) || 'N/A'}
              </td>
            </tr>
            <tr>
              <td className="govt-label">Risk Assessment:</td>
              <td className="govt-value" colSpan="3" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {getStringValue(generatedDPR.riskAssessment) || 'N/A'}
              </td>
            </tr>
            <tr>
              <td className="govt-label">Expected Outcomes:</td>
              <td className="govt-value" colSpan="3" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {getStringValue(generatedDPR.expectedOutcomes) || 'N/A'}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Bill of Quantities Section */}
        {(formData.budget || generatedDPR.budgetBreakdown) && (
          <>
            <div className="govt-section-header">
              <h3>Bill of Quantities (BOQ)</h3>
            </div>
            <table className="govt-table boq-table">
              <thead>
                <tr>
                  <th>S.No</th>
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
                <tr className="total-row">
                  <td colSpan="5" className="govt-label"><strong>Total Estimated Cost</strong></td>
                  <td className="govt-value"><strong>₹{formData.budget ? Number(formData.budget).toLocaleString('en-IN') : '4,625,000'}</strong></td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {/* Project Authority Section */}
        <div className="govt-section-header">
          <h3>Project Inviting Authority</h3>
        </div>
        <table className="govt-table authority-table">
          <tbody>
            <tr>
              <td className="govt-label">Name:</td>
              <td className="govt-value">Joint Director, {formData.department || 'Department'}</td>
            </tr>
            <tr>
              <td className="govt-label">Address:</td>
              <td className="govt-value">
                {formData.district ? 
                  `Department of ${formData.department || 'Infrastructure'}, ${formData.district}, Rajasthan` : 
                  'Department Office, Rajasthan'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="dpr-actions">
        <button className="btn-secondary" onClick={() => navigate('/je/my-drafts')}>
          Back to Drafts
        </button>
        <button className="btn-primary" onClick={() => navigate('/je/create-dpr')}>
          Edit DPR
        </button>
        {status === 'Draft' && (
          <button className="btn-success" onClick={() => {
            alert('DPR submitted for approval!');
            navigate('/je/submitted');
          }}>
            Submit for Approval
          </button>
        )}
      </div>
    </div>
  );
};

export default DPRPreview;

