import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [users] = useState([
    { id: 1, name: 'Rajesh Kumar', role: 'Junior Engineer', email: 'rajesh@rajasthan.gov.in', status: 'Active' },
    { id: 2, name: 'Priya Sharma', role: 'Senior Engineer', email: 'priya@rajasthan.gov.in', status: 'Active' },
    { id: 3, name: 'Amit Singh', role: 'Contractor', email: 'amit@contractor.com', status: 'Active' },
    { id: 4, name: 'Suresh Patel', role: 'Junior Engineer', email: 'suresh@rajasthan.gov.in', status: 'Inactive' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    role: 'junior_engineer',
    email: '',
    password: ''
  });

  const handleAddUser = () => {
    alert('User added successfully!');
    setShowAddModal(false);
    setNewUser({ name: '', role: 'junior_engineer', email: '', password: '' });
  };

  return (
    <div className="user-management-container">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          + Add New User
        </button>
      </div>

      <div className="users-table-card">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase().replace(' ', '-')}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
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
            <h2 className="modal-title">Add New User</h2>
            <div className="modal-form">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <label>Role *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="junior_engineer">Junior Engineer</option>
                  <option value="senior_engineer">Senior Engineer</option>
                  <option value="contractor">Contractor</option>
                </select>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Enter password"
                />
              </div>
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleAddUser}>
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

