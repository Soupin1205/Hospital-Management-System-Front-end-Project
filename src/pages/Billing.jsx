import React, { useState } from 'react';

const Billing = () => {
  const [billingRecords] = useState([
    { id: 1, patient: 'Sophie Bennett', service: 'Consultation', amount: '$250', date: 'Dec 20, 2024', status: 'Paid' },
    { id: 2, patient: 'Liam Parker', service: 'Surgery', amount: '$5,000', date: 'Dec 19, 2024', status: 'Pending' },
    { id: 3, patient: 'Jackson Mitchell', service: 'Lab Tests', amount: '$180', date: 'Dec 18, 2024', status: 'Paid' },
    { id: 4, patient: 'Emma Wilson', service: 'Emergency', amount: '$850', date: 'Dec 17, 2024', status: 'Pending' },
  ]);

  const totals = {
    totalBilled: billingRecords.reduce((sum, record) => sum + parseInt(record.amount.replace('$', '').replace(',', '')), 0),
    totalPaid: billingRecords.filter(r => r.status === 'Paid').reduce((sum, record) => sum + parseInt(record.amount.replace('$', '').replace(',', '')), 0),
    totalPending: billingRecords.filter(r => r.status === 'Pending').reduce((sum, record) => sum + parseInt(record.amount.replace('$', '').replace(',', '')), 0),
  };

  return (
    <>
      <div className="metrics-grid">
        <div className="metric-card gradient-green">
          <div className="metric-icon">
            <span className="material-symbols-outlined">attach_money</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">${totals.totalBilled.toLocaleString()}</span>
            <span className="metric-label">Total Billed</span>
          </div>
        </div>
        <div className="metric-card gradient-blue">
          <div className="metric-icon">
            <span className="material-symbols-outlined">paid</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">${totals.totalPaid.toLocaleString()}</span>
            <span className="metric-label">Total Collected</span>
          </div>
        </div>
        <div className="metric-card gradient-orange">
          <div className="metric-icon">
            <span className="material-symbols-outlined">hourglass_empty</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">${totals.totalPending.toLocaleString()}</span>
            <span className="metric-label">Pending Payment</span>
          </div>
        </div>
        <div className="metric-card gradient-purple">
          <div className="metric-icon">
            <span className="material-symbols-outlined">receipt</span>
          </div>
          <div className="metric-info">
            <span className="metric-value">{billingRecords.length}</span>
            <span className="metric-label">Total Invoices</span>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div>
            <h3>Billing History</h3>
            <p>View and manage all patient invoices</p>
          </div>
          <button className="add-btn">
            <span className="material-symbols-outlined">receipt_long</span>
            Create Invoice
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Patient</th>
              <th>Service</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {billingRecords.map((record) => (
              <tr key={record.id}>
                <td>#INV-{String(record.id).padStart(4, '0')}</td>
                <td>{record.patient}</td>
                <td>{record.service}</td>
                <td>{record.date}</td>
                <td className="amount-cell">{record.amount}</td>
                <td>
                  <span className={`status-badge status-${record.status.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {record.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="action-btn view">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                  <button className="action-btn edit">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Billing;