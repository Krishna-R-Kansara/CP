import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { academicAPI } from '../utils/api';
import '../styles/Module.css';

function Academic() {
    const [academics, setAcademics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        semester: '',
        subject: '',
        grade: '',
        credits: '',
        score: '',
        status: 'Average'
    });

    useEffect(() => {
        loadAcademics();
    }, []);

    const loadAcademics = async () => {
        try {
            const response = await academicAPI.getAll();
            if (response.success) {
                setAcademics(response.data);
            }
        } catch (error) {
            console.error('Error loading academics:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await academicAPI.update(editingId, formData);
            } else {
                await academicAPI.create(formData);
            }
            loadAcademics();
            closeModal();
        } catch (error) {
            console.error('Error saving academic:', error);
        }
    };

    const handleEdit = (academic) => {
        setEditingId(academic._id);
        setFormData({
            semester: academic.semester,
            subject: academic.subject,
            grade: academic.grade,
            credits: academic.credits,
            score: academic.score,
            status: academic.status
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await academicAPI.delete(id);
                loadAcademics();
            } catch (error) {
                console.error('Error deleting academic:', error);
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({
            semester: '',
            subject: '',
            grade: '',
            credits: '',
            score: '',
            status: 'Average'
        });
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Excellent': return 'badge-success';
            case 'Good': return 'badge-info';
            case 'Average': return 'badge-warning';
            case 'Poor': return 'badge-error';
            default: return 'badge-info';
        }
    };

    return (
        <div className="module-page">
            <Navbar />

            <div className="module-content">
                <div className="module-header">
                    <h1>📚 Academic Tracking</h1>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        + Add Record
                    </button>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                    </div>
                ) : academics.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📚</div>
                        <h3>No Academic Records Yet</h3>
                        <p>Start tracking your academic performance by adding your first record.</p>
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            Add Your First Record
                        </button>
                    </div>
                ) : (
                    <div className="data-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Semester</th>
                                    <th>Subject</th>
                                    <th>Grade</th>
                                    <th>Credits</th>
                                    <th>Score</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {academics.map((academic) => (
                                    <tr key={academic._id}>
                                        <td>{academic.semester}</td>
                                        <td>{academic.subject}</td>
                                        <td><strong>{academic.grade}</strong></td>
                                        <td>{academic.credits}</td>
                                        <td>{academic.score}%</td>
                                        <td>
                                            <span className={`badge ${getStatusBadgeClass(academic.status)}`}>
                                                {academic.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                <button className="btn btn-sm btn-primary" onClick={() => handleEdit(academic)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(academic._id)}>
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
                            <h2>{editingId ? 'Edit Record' : 'Add New Record'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Semester</label>
                                    <input
                                        type="text"
                                        value={formData.semester}
                                        onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Grade</label>
                                    <input
                                        type="text"
                                        value={formData.grade}
                                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Credits</label>
                                    <input
                                        type="number"
                                        value={formData.credits}
                                        onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Score (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.score}
                                        onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Average">Average</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                                <div className="modal-buttons">
                                    <button type="button" className="btn btn-outline" onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
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

export default Academic;
