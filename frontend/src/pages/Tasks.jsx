import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { taskAPI } from '../utils/api';
import '../styles/Module.css';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        dueDate: ''
    });

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await taskAPI.getAll();
            if (response.success) {
                setTasks(response.data);
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await taskAPI.update(editingId, formData);
            } else {
                await taskAPI.create(formData);
            }
            loadTasks();
            closeModal();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleEdit = (task) => {
        setEditingId(task._id);
        setFormData({
            title: task.title,
            description: task.description || '',
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
        });
        setShowModal(true);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await taskAPI.update(id, { status: newStatus });
            loadTasks();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskAPI.delete(id);
                loadTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({
            title: '',
            description: '',
            status: 'Pending',
            priority: 'Medium',
            dueDate: ''
        });
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Completed': return 'badge-success';
            case 'In Progress': return 'badge-info';
            case 'Pending': return 'badge-warning';
            case 'Overdue': return 'badge-error';
            default: return 'badge-info';
        }
    };

    const getPriorityBadgeClass = (priority) => {
        switch (priority) {
            case 'High': return 'badge-error';
            case 'Medium': return 'badge-warning';
            case 'Low': return 'badge-info';
            default: return 'badge-info';
        }
    };

    return (
        <div className="module-page">
            <Navbar />

            <div className="module-content">
                <div className="module-header">
                    <h1>✅ Task Management</h1>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        + Add Task
                    </button>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">✅</div>
                        <h3>No Tasks Yet</h3>
                        <p>Start organizing your work by adding your first task.</p>
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            Add Your First Task
                        </button>
                    </div>
                ) : (
                    <div className="data-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Due Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task._id}>
                                        <td><strong>{task.title}</strong></td>
                                        <td>{task.description || '-'}</td>
                                        <td>
                                            <select
                                                value={task.status}
                                                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                                className={`badge ${getStatusBadgeClass(task.status)}`}
                                                style={{ border: 'none', cursor: 'pointer' }}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Overdue">Overdue</option>
                                            </select>
                                        </td>
                                        <td>
                                            <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td>
                                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                <button className="btn btn-sm btn-primary" onClick={() => handleEdit(task)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task._id)}>
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
                            <h2>{editingId ? 'Edit Task' : 'Add New Task'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                                    <label>Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Overdue">Overdue</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Priority</label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Due Date (Optional)</label>
                                    <input
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    />
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

export default Tasks;
