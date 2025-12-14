import React, { useState } from 'react';
import './RateMaster.css';

const RateMaster = () => {
  const [rates, setRates] = useState([
    { id: 1, category: 'Pipe', item: 'PVC Pipe 100mm', unit: 'Meter', rate: 500 },
    { id: 2, category: 'Pipe', item: 'PVC Pipe 150mm', unit: 'Meter', rate: 750 },
    { id: 3, category: 'Pump', item: 'Submersible Pump 5HP', unit: 'Unit', rate: 25000 },
    { id: 4, category: 'Pump', item: 'Submersible Pump 10HP', unit: 'Unit', rate: 45000 },
    { id: 5, category: 'Material', item: 'Cement (OPC)', unit: 'Bag', rate: 350 },
    { id: 6, category: 'Material', item: 'Steel Reinforcement', unit: 'MT', rate: 60000 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newRate, setNewRate] = useState({
    category: 'Pipe',
    item: '',
    unit: '',
    rate: ''
  });

  const handleAddRate = () => {
    if (!newRate.item || !newRate.unit || !newRate.rate) {
      alert('Please fill all fields');
      return;
    }
    alert('Rate added successfully!');
    setShowAddModal(false);
    setNewRate({ category: 'Pipe', item: '', unit: '', rate: '' });
  };

  return (
    <div className="rate-master-container">
      <div className="page-header">
        <h1 className="page-title">Rate Master</h1>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          + Add New Rate
        </button>
      </div>

      <div className="rates-table-card">
        <table className="rates-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Item</th>
              <th>Unit</th>
              <th>Rate (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.id}>
                <td>{rate.id}</td>
                <td>
                  <span className={`category-badge ${rate.category.toLowerCase()}`}>
                    {rate.category}
                  </span>
                </td>
                <td>{rate.item}</td>
                <td>{rate.unit}</td>
                <td>₹ {rate.rate.toLocaleString('en-IN')}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit">Edit</button>
                    <button className="btn-delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Add New Rate</h2>
            <div className="modal-form">
              <div className="form-group">
                <label>Category *</label>
                <select
                  value={newRate.category}
                  onChange={(e) => setNewRate({ ...newRate, category: e.target.value })}
                >
                  <option value="Pipe">Pipe</option>
                  <option value="Pump">Pump</option>
                  <option value="Material">Material</option>
                </select>
              </div>
              <div className="form-group">
                <label>Item *</label>
                <input
                  type="text"
                  value={newRate.item}
                  onChange={(e) => setNewRate({ ...newRate, item: e.target.value })}
                  placeholder="Enter item name"
                />
              </div>
              <div className="form-group">
                <label>Unit *</label>
                <input
                  type="text"
                  value={newRate.unit}
                  onChange={(e) => setNewRate({ ...newRate, unit: e.target.value })}
                  placeholder="e.g., Meter, Unit, Bag"
                />
              </div>
              <div className="form-group">
                <label>Rate (₹) *</label>
                <input
                  type="number"
                  value={newRate.rate}
                  onChange={(e) => setNewRate({ ...newRate, rate: e.target.value })}
                  placeholder="Enter rate"
                />
              </div>
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleAddRate}>
                  Add Rate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RateMaster;

