import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="app">
      <Header />
      <div className="landing-content">
        <div className="hero-section">
          <div className="hero-left">
            <div className="hero-badge">+ Digitalized Infrastructure Development</div>
            <h1 className="hero-title">
              Tender Live Cycle Management <span className="hero-title-blue"></span>
            </h1>
            <p className="hero-description">
              Streamline infrastructure development for the Government of Rajasthan. Generate accurate, compliant, and comprehensive DPRs instantly using digitalized systems tailored for state engineering standards.
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="btn-hero-primary">
                <span>+</span>
                Start New DPR
              </Link>
              <Link to="/login" className="btn-hero-secondary">
                <span>📁</span>
                View Existing Projects
              </Link>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-image">
              <div className="hero-image-overlay">
                <div className="dpr-status">
                  <div className="dpr-status-icon">✓</div>
                  <div className="dpr-status-text">DPR Generation Complete</div>
                  <div className="dpr-progress-bar">
                    <div className="dpr-progress-fill"></div>
                  </div>
                  <div className="dpr-project-name">Jaipur Metro Phase 2 Extension</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="benefits-section">
          <h2 className="benefits-title">Key Benefits</h2>
          <p className="benefits-subtitle">
            Empowering officials with next-gen tools for faster governance. Moving from paper-based delays to digital efficiency.
          </p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon blue">⚙️</div>
              <h3 className="benefit-title">Digitalized Generation</h3>
              <p className="benefit-description">
                Reduce drafting time by 70% with automated content generation tailored to specific project parameters and historical data.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon purple">🛡️</div>
              <h3 className="benefit-title">Standardized Compliance</h3>
              <p className="benefit-description">
                Automatically validate reports against Rajasthan state engineering and financial standards to ensure zero compliance errors.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon orange">💰</div>
              <h3 className="benefit-title">Secure Digitalization</h3>
              <p className="benefit-description">
                Maintain a centralized, searchable, and secure digital archive of all infrastructure projects accessible anytime.
              </p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2 className="cta-title">Ready to digitize your workflow?</h2>
          <Link to="/login" className="btn-cta">
            Create New Report <span>→</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;

