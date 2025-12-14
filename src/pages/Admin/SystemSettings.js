import React, { useState } from 'react';
import './SystemSettings.css';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    systemName: 'DPR Generator',
    organizationName: 'Government of Rajasthan',
    maxFileSize: '10',
    sessionTimeout: '30',
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <div className="page-header">
        <h1 className="page-title">System Settings</h1>
      </div>

      <div className="settings-card">
        <div className="settings-section">
          <h3 className="section-title">General Settings</h3>
          <div className="settings-grid">
            <div className="form-group">
              <label>System Name</label>
              <input
                type="text"
                name="systemName"
                value={settings.systemName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Organization Name</label>
              <input
                type="text"
                name="organizationName"
                value={settings.organizationName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Max File Size (MB)</label>
              <input
                type="number"
                name="maxFileSize"
                value={settings.maxFileSize}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Session Timeout (Minutes)</label>
              <input
                type="number"
                name="sessionTimeout"
                value={settings.sessionTimeout}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="section-title">Notification Settings</h3>
          <div className="settings-checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleInputChange}
              />
              <span>Enable Email Notifications</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={settings.smsNotifications}
                onChange={handleInputChange}
              />
              <span>Enable SMS Notifications</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="autoBackup"
                checked={settings.autoBackup}
                onChange={handleInputChange}
              />
              <span>Enable Auto Backup</span>
            </label>
          </div>
        </div>

        <div className="settings-actions">
          <button className="btn-secondary">Reset to Default</button>
          <button className="btn-primary" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;

