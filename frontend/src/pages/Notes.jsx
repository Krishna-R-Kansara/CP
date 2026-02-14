import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { noteAPI } from '../utils/api';
import '../styles/Module.css';
import '../styles/Notes.css';

function Notes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        subject: '',
        tags: [],
        color: '#FFFFFF'
    });
    const [tagInput, setTagInput] = useState('');

    const colorOptions = ['#FFFFFF', '#FEE2E2', '#DBEAFE', '#D1FAE5', '#FEF3C7', '#E9D5FF'];

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        try {
            const response = await noteAPI.getAll();
            if (response.success) {
                setNotes(response.data);
            }
        } catch (error) {
            console.error('Error loading notes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await noteAPI.update(editingId, formData);
            } else {
                await noteAPI.create(formData);
            }
            loadNotes();
            closeModal();
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const handleEdit = (note) => {
        setEditingId(note._id);
        setFormData({
            title: note.title,
            content: note.content,
            subject: note.subject || '',
            tags: note.tags || [],
            color: note.color || '#FFFFFF'
        });
        setShowModal(true);
    };

    const handlePin = async (id) => {
        try {
            await noteAPI.togglePin(id);
            loadNotes();
        } catch (error) {
            console.error('Error toggling pin:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await noteAPI.delete(id);
                loadNotes();
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({
            title: '',
            content: '',
            subject: '',
            tags: [],
            color: '#FFFFFF'
        });
        setTagInput('');
    };

    const handleTagInput = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData({
                    ...formData,
                    tags: [...formData.tags, tagInput.trim()]
                });
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    return (
        <div className="module-page">
            <Navbar />

            <div className="module-content">
                <div className="module-header">
                    <h1>📝 Notes App</h1>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        + New Note
                    </button>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                    </div>
                ) : notes.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📝</div>
                        <h3>No Notes Yet</h3>
                        <p>Start organizing your thoughts by creating your first note.</p>
                        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                            Create Your First Note
                        </button>
                    </div>
                ) : (
                    <div className="notes-grid">
                        {notes.map((note) => (
                            <div
                                key={note._id}
                                className={`note-card ${note.isPinned ? 'pinned' : ''}`}
                                style={{ backgroundColor: note.color }}
                            >
                                <div className="note-header">
                                    <h3 className="note-title">{note.title}</h3>
                                    <span
                                        className="pin-icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePin(note._id);
                                        }}
                                    >
                                        {note.isPinned ? '📌' : '📍'}
                                    </span>
                                </div>

                                {note.subject && (
                                    <div className="note-subject">{note.subject}</div>
                                )}

                                <div className="note-content">
                                    {note.content}
                                </div>

                                {note.tags && note.tags.length > 0 && (
                                    <div className="note-tags">
                                        {note.tags.map((tag, index) => (
                                            <span key={index} className="note-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="note-footer">
                                    <span className="note-date">
                                        {new Date(note.updatedAt).toLocaleDateString()}
                                    </span>
                                    <div className="note-actions">
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleEdit(note)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(note._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay note-modal" onClick={closeModal}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <h2>{editingId ? 'Edit Note' : 'Create New Note'}</h2>
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
                                    <label>Content</label>
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Subject (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="e.g., Mathematics, Physics"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Tags (Press Enter to add)</label>
                                    <div className="tag-input-container">
                                        {formData.tags.map((tag, index) => (
                                            <span key={index} className="tag-item">
                                                {tag}
                                                <span className="tag-remove" onClick={() => removeTag(tag)}>×</span>
                                            </span>
                                        ))}
                                        <input
                                            type="text"
                                            className="tag-input"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={handleTagInput}
                                            placeholder="Add a tag"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Color</label>
                                    <div className="color-picker">
                                        {colorOptions.map((color) => (
                                            <div
                                                key={color}
                                                className={`color-option ${formData.color === color ? 'selected' : ''}`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => setFormData({ ...formData, color })}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="modal-buttons">
                                    <button type="button" className="btn btn-outline" onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {editingId ? 'Update' : 'Create'}
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

export default Notes;
