import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateDPR.css';
import { generateDPRWithGroq } from '../../services/groqApi';
import { extractTextFromPDF } from '../../services/pdfExtractor';
import {
  RAJASTHAN_DISTRICTS,
  COMMON_TEHSILS,
  DEPARTMENTS,
  PROJECT_TYPES,
  FUNDING_SOURCES,
  AUTO_FILL_DATA,
  generateProjectCode
} from '../../constants/dprConstants';

const CreateDPR = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputMode, setInputMode] = useState('manual'); // 'manual' or 'pdf'
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfText, setPdfText] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState(null);
  const [formData, setFormData] = useState({
    // Project Details
    projectTitle: '',
    projectType: '',
    department: AUTO_FILL_DATA.defaultDepartment, // Auto-fill
    projectCode: '',
    
    // Site & Location
    district: '',
    tehsil: '',
    tehsilCustom: '', // For custom tehsil input
    village: '',
    coordinates: '',
    
    // Existing Infrastructure
    existingInfrastructure: '',
    currentStatus: '',
    
    // Proposed Technical Details
    technicalSpecs: '',
    materials: '',
    equipment: '',
    
    // Implementation Details
    timeline: AUTO_FILL_DATA.defaultTimeline, // Auto-fill
    budget: '',
    fundingSource: ''
  });

  // Auto-fill static data on component mount
  useEffect(() => {
    // Auto-generate project code when department or project type changes
    if (formData.department && formData.projectType) {
      const newCode = generateProjectCode(formData.department, formData.projectType);
      setFormData(prev => ({ ...prev, projectCode: newCode }));
    }
  }, [formData.department, formData.projectType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    // Save draft logic
    const draftData = {
      ...formData,
      savedAt: new Date().toISOString(),
      status: 'draft'
    };
    localStorage.setItem('dpr_draft', JSON.stringify(draftData));
    alert('Draft saved successfully!');
    navigate('/je/my-drafts');
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size should be less than 10MB');
      return;
    }

    setPdfFile(file);
    setExtractionError(null);
    setIsExtracting(true);

    try {
      const extractedText = await extractTextFromPDF(file);
      setPdfText(extractedText);
      
      // Try to auto-fill some basic fields from PDF text
      // This is a simple extraction - AI will do better analysis
      const titleMatch = extractedText.match(/(?:project|title|name)[\s:]+([A-Z][^\n]{10,50})/i);
      if (titleMatch && !formData.projectTitle) {
        setFormData(prev => ({ ...prev, projectTitle: titleMatch[1].trim() }));
      }
    } catch (error) {
      console.error('Error extracting PDF:', error);
      setExtractionError(error.message);
      setPdfFile(null);
      setPdfText(null);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
    setPdfText(null);
    setExtractionError(null);
  };

  const handleGenerateDPR = async () => {
    // If PDF mode, validate PDF is uploaded
    if (inputMode === 'pdf' && !pdfText) {
      alert('Please upload and extract text from a PDF document first');
      return;
    }

    // For manual mode, validate required fields
    if (inputMode === 'manual') {
      if (!formData.projectTitle || !formData.projectType || !formData.department) {
        alert('Please fill in all required fields in Step 1');
        setCurrentStep(1);
        return;
      }
      const tehsilValue = formData.tehsil === 'other' ? formData.tehsilCustom : formData.tehsil;
      if (!formData.district || !tehsilValue || !formData.village) {
        alert('Please fill in all required location fields in Step 2');
        setCurrentStep(2);
        return;
      }
      if (!formData.technicalSpecs) {
        alert('Please fill in technical specifications in Step 4');
        setCurrentStep(4);
        return;
      }
      if (!formData.timeline || !formData.budget || !formData.fundingSource) {
        alert('Please fill in all required implementation details in Step 5');
        setCurrentStep(5);
        return;
      }
    }

    setIsGenerating(true);
    try {
      // Prepare form data with correct tehsil value
      const dprFormData = {
        ...formData,
        tehsil: formData.tehsil === 'other' ? formData.tehsilCustom : formData.tehsil
      };
      // Pass PDF text if available
      const result = await generateDPRWithGroq(dprFormData, pdfText);
      
      if (result.success) {
        // Store generated DPR data
        const dprData = {
          id: Math.random().toString(36).substr(2, 9),
          formData: dprFormData,
          generatedDPR: result.dpr,
          rawContent: result.rawContent,
          generatedAt: new Date().toISOString(),
          status: 'generated'
        };
        
        // Store in localStorage for preview
        localStorage.setItem('current_dpr', JSON.stringify(dprData));
        
        // Navigate to preview
        navigate(`/je/dpr-preview/${dprData.id}`);
      } else {
        alert(`Failed to generate DPR: ${result.error}`);
      }
    } catch (error) {
      console.error('Error generating DPR:', error);
      alert('An error occurred while generating the DPR. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = () => {
    // Submit for approval logic
    alert('DPR submitted for approval!');
    navigate('/je/submitted');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-section">
            <h3 className="section-title">Project Details</h3>
            <div className="auto-fill-notice">
              <span className="auto-fill-badge">Auto-filled</span>
              <span>Department and Project Code are auto-filled</span>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  placeholder="Enter project title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Project Type *</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select type</option>
                  {PROJECT_TYPES.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select department</option>
                  {DEPARTMENTS.map((dept, index) => (
                    <option key={index} value={dept}>{dept}</option>
                  ))}
                </select>
                <small className="auto-fill-hint">Pre-filled with default department</small>
              </div>
              <div className="form-group">
                <label>Project Code</label>
                <input
                  type="text"
                  name="projectCode"
                  value={formData.projectCode}
                  readOnly
                  className="readonly-field"
                  placeholder="Auto-generated"
                />
                <small className="auto-fill-hint">Auto-generated based on department and type</small>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-section">
            <h3 className="section-title">Site & Location</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>District *</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select district</option>
                  {RAJASTHAN_DISTRICTS.map((district, index) => (
                    <option key={index} value={district}>{district}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Tehsil *</label>
                {formData.tehsil === 'other' ? (
                  <>
                    <input
                      type="text"
                      name="tehsilCustom"
                      value={formData.tehsilCustom || ''}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, tehsilCustom: e.target.value }));
                      }}
                      placeholder="Enter tehsil name"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, tehsil: '', tehsilCustom: '' }))}
                      style={{ marginTop: '8px', fontSize: '12px', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Select from list instead
                    </button>
                  </>
                ) : (
                  <select
                    name="tehsil"
                    value={formData.tehsil}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select tehsil</option>
                    {COMMON_TEHSILS.map((tehsil, index) => (
                      <option key={index} value={tehsil}>{tehsil}</option>
                    ))}
                    <option value="other">Other (Enter manually)</option>
                  </select>
                )}
              </div>
              <div className="form-group">
                <label>Village *</label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleInputChange}
                  placeholder="Enter village name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Coordinates</label>
                <input
                  type="text"
                  name="coordinates"
                  value={formData.coordinates}
                  onChange={handleInputChange}
                  placeholder="Lat, Long (e.g., 26.9124, 75.7873)"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-section">
            <h3 className="section-title">Existing Infrastructure</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Existing Infrastructure Details</label>
                <textarea
                  name="existingInfrastructure"
                  value={formData.existingInfrastructure}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Describe existing infrastructure..."
                />
              </div>
              <div className="form-group full-width">
                <label>Current Status</label>
                <textarea
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Describe current status..."
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-section">
            <h3 className="section-title">Proposed Technical Details</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Technical Specifications *</label>
                <textarea
                  name="technicalSpecs"
                  value={formData.technicalSpecs}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Enter technical specifications..."
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Materials Required</label>
                <textarea
                  name="materials"
                  value={formData.materials}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="List materials required..."
                />
              </div>
              <div className="form-group full-width">
                <label>Equipment Required</label>
                <textarea
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="List equipment required..."
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="form-section">
            <h3 className="section-title">Implementation Details</h3>
            <div className="auto-fill-notice">
              <span className="auto-fill-badge">Auto-filled</span>
              <span>Default timeline is pre-filled</span>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Timeline (Months) *</label>
                <input
                  type="number"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  placeholder="Enter timeline"
                  required
                />
                <small className="auto-fill-hint">Pre-filled with default: {AUTO_FILL_DATA.defaultTimeline} months</small>
              </div>
              <div className="form-group">
                <label>Estimated Budget (₹) *</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="Enter budget"
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Funding Source *</label>
                <select
                  name="fundingSource"
                  value={formData.fundingSource}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select funding source</option>
                  {FUNDING_SOURCES.map((source, index) => (
                    <option key={index} value={source}>{source}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-dpr-container">
      <div className="create-dpr-header">
        <h1 className="page-title">Create New DPR</h1>
        <p className="page-subtitle">Fill in the details to generate a Detailed Project Report using AI</p>
      </div>

      {/* Input Mode Toggle */}
      <div className="input-mode-toggle">
        <div className="mode-toggle-buttons">
          <button
            type="button"
            className={`mode-toggle-btn ${inputMode === 'manual' ? 'active' : ''}`}
            onClick={() => {
              setInputMode('manual');
              setPdfFile(null);
              setPdfText(null);
            }}
          >
            📝 Manual Entry
          </button>
          <button
            type="button"
            className={`mode-toggle-btn ${inputMode === 'pdf' ? 'active' : ''}`}
            onClick={() => setInputMode('pdf')}
          >
            📄 Upload PDF Document
          </button>
        </div>
        <p className="mode-description">
          {inputMode === 'manual' 
            ? 'Fill in the form step by step to create your DPR'
            : 'Upload a project planning document (PDF) and AI will extract information to generate your DPR'}
        </p>
      </div>

      {/* PDF Upload Section */}
      {inputMode === 'pdf' && (
        <div className="pdf-upload-section">
          <div className="form-section">
            <h3 className="section-title">Upload Project Planning Document</h3>
            <div className="pdf-upload-area">
              {!pdfFile ? (
                <div className="file-upload-wrapper">
                  <input
                    type="file"
                    id="pdfUpload"
                    accept=".pdf"
                    onChange={handlePdfUpload}
                    disabled={isExtracting}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="pdfUpload" className="file-upload-label">
                    <div className="upload-icon">📄</div>
                    <div className="upload-text">
                      <strong>Click to upload PDF</strong>
                      <span>or drag and drop</span>
                    </div>
                    <div className="upload-hint">PDF format, max 10MB</div>
                  </label>
                </div>
              ) : (
                <div className="pdf-file-preview">
                  <div className="pdf-file-info">
                    <span className="pdf-icon">📄</span>
                    <div className="pdf-file-details">
                      <div className="pdf-file-name">{pdfFile.name}</div>
                      <div className="pdf-file-size">
                        {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                    <button
                      type="button"
                      className="remove-pdf-btn"
                      onClick={handleRemovePdf}
                      disabled={isExtracting}
                    >
                      ✕
                    </button>
                  </div>
                  {isExtracting && (
                    <div className="extraction-status">
                      <div className="loading-spinner"></div>
                      <span>Extracting text from PDF...</span>
                    </div>
                  )}
                  {pdfText && !isExtracting && (
                    <div className="extraction-success">
                      <span className="success-icon">✓</span>
                      <span>Text extracted successfully! ({pdfText.length} characters)</span>
                    </div>
                  )}
                  {extractionError && (
                    <div className="extraction-error">
                      <span className="error-icon">✕</span>
                      <span>Error: {extractionError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            {pdfText && (
              <div className="pdf-extracted-preview">
                <h4>Extracted Content Preview:</h4>
                <div className="extracted-text-preview">
                  {pdfText.substring(0, 500)}...
                </div>
                <p className="preview-note">AI will analyze the full document to generate your DPR</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Manual Entry Steps - Only show if manual mode */}
      {inputMode === 'manual' && (
        <div className="step-indicator">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className={`step ${currentStep >= step ? 'active' : ''}`}>
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 && 'Project Details'}
                {step === 2 && 'Site & Location'}
                {step === 3 && 'Existing Infrastructure'}
                {step === 4 && 'Technical Details'}
                {step === 5 && 'Implementation'}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="form-card">
        {inputMode === 'manual' && renderStepContent()}
        
        <div className="form-actions">
          {inputMode === 'manual' && currentStep > 1 && (
            <button className="btn-secondary" onClick={handlePrevious} disabled={isGenerating}>
              Previous
            </button>
          )}
          <div className="action-buttons-right">
            {inputMode === 'manual' && (
              <button className="btn-secondary" onClick={handleSaveDraft} disabled={isGenerating}>
                Save as Draft
              </button>
            )}
            {inputMode === 'manual' && currentStep < 5 ? (
              <button className="btn-primary" onClick={handleNext} disabled={isGenerating}>
                Next
              </button>
            ) : (
              <>
                <button 
                  className="btn-primary" 
                  onClick={handleGenerateDPR}
                  disabled={isGenerating || (inputMode === 'pdf' && !pdfText)}
                >
                  {isGenerating ? 'Generating DPR...' : 'Generate DPR with AI'}
                </button>
                {inputMode === 'manual' && (
                  <button className="btn-success" onClick={handleSubmit} disabled={isGenerating}>
                    Submit for Approval
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDPR;
