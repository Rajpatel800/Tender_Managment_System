import React from 'react';
import './AuditLogs.css';

const AuditLogs = () => {
  const logs = [
    { id: 1, user: 'Rajesh Kumar', action: 'Created DPR', entity: 'DPR-2024-001', timestamp: '2024-01-20 10:30:00' },
    { id: 2, user: 'Priya Sharma', action: 'Approved DPR', entity: 'DPR-2024-001', timestamp: '2024-01-20 14:15:00' },
    { id: 3, user: 'Priya Sharma', action: 'Created Tender', entity: 'TENDER-2024-005', timestamp: '2024-01-21 09:00:00' },
    { id: 4, user: 'Amit Singh', action: 'Submitted Bid', entity: 'TENDER-2024-005', timestamp: '2024-01-22 11:20:00' },
    { id: 5, user: 'Admin', action: 'Updated Rate Master', entity: 'PVC Pipe 100mm', timestamp: '2024-01-19 16:45:00' },
  ];

  return (
    <div className="audit-logs-container">
      <div className="page-header">
        <h1 className="page-title">Audit Logs</h1>
        <button className="btn-secondary">Export Logs</button>
      </div>

      <div className="logs-table-card">
        <table className="logs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Action</th>
              <th>Entity</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.user}</td>
                <td>
                  <span className={`action-badge ${log.action.toLowerCase().replace(' ', '-')}`}>
                    {log.action}
                  </span>
                </td>
                <td>{log.entity}</td>
                <td>{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;

