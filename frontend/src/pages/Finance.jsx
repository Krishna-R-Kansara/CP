import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { financeAPI } from '../utils/api';
import '../styles/Module.css';

function Finance() {
    const [finances, setFinances] = useState([]);
    const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        type: 'Income',
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        loadFinances();
        loadSummary();
    }, []);

    const loadFinances = async () => {
        try {
            const response = await financeAPI.getAll();
            if (response.success) {
                setFinances(response.data);
            }
        } catch (error) {
            console.error('Error loading finances:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadSummary = async () => {
        try {
            const response = await financeAPI.getSummary();
            if (response.success) {
                setSummary(response.data);
            }
        } catch (error) {
            console.error('Error loading summary:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await financeAPI.update(editingId, formData);
            } else {
                await financeAPI.create(formData);
            }
            loadFinances();
            loadSummary();
            closeModal();
        } catch (error) {
            console.error('Error saving finance:', error);
        }
    };

    const handleEdit = (finance) => {
        setEditingId(finance._id);
        setFormData({
            type: finance.type,
            category: finance.category,
            amount: finance.amount,
            description: finance.description || '',
            date: new Date(finance.date).toISOString().split('T')[0]
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await financeAPI.delete(id);
                loadFinances();
                loadSummary();
            } catch (error) {
                console.error('Error deleting finance:', error);
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({
            type: 'Income',
            category: '',
            amount: '',
            description: '',
            date: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <div className="module-page">
            <Navbar />

            <div className="module-content">
                <div className="module-header">
                    <h1>💰 Financial Management</h1>
                    <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
                        + Add Transaction
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="stats-grid" style={{ marginBottom: '32px' }}>
                    <div className="stat-card">
                        <div className="stat-icon green">💵</div>
                        <div className="stat-info">
                            <h3>Total Income</h3>
                            <div className="stat-value text-success">₹{summary.totalIncome}</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon orange">💸</div>
                        <div className="stat-info">
                            <h3>Total Expenses</h3>
                            <div className="stat-value text-orange">₹{summary.totalExpense}</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon blue">💰</div>
                        <div className="stat-info">
                            <h3>Balance</h3>
                            <div className="stat-value text-blue">₹{summary.balance}</div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                    </div>
                ) : finances.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">💰</div>
                        <h3>No Financial Records Yet</h3>
                        <p>Start tracking your finances by adding your first transaction.</p>
                        <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
                            Add Your First Transaction
                        </button>
                    </div>
                ) : (
                    <div className="data-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {finances.map((finance) => (
                                    <tr key={finance._id}>
                                        <td>
                                            <span className={`badge ${finance.type === 'Income' ? 'badge-success' : 'badge-orange'}`}>
                                                {finance.type}
                                            </span>
                                        </td>
                                        <td>{finance.category}</td>
                                        <td className={finance.type === 'Income' ? 'text-success' : 'text-orange'}>
                                            <strong>₹{finance.amount}</strong>
                                        </td>
                                        <td>{finance.description || '-'}</td>
                                        <td>{new Date(finance.date).toLocaleDateString()}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button className="btn btn-sm btn-primary" onClick={() => handleEdit(finance)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(finance._id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <h2>{editingId ? 'Edit Transaction' : 'Add New Transaction'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="Income">Income</option>
                                        <option value="Expense">Expense</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="e.g., Salary, Food, Transport"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Amount (₹)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description (Optional)</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="3"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="modal-buttons">
                                    <button type="button" className="btn btn-outline" onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-secondary">
                                        {editingId ? 'Update' : 'Add'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Finance;
