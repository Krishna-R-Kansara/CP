import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Module.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Navbar />
            <div className="module-page">
                <div className="module-content">
                    <div className="module-header">
                        <h1>Contact Us</h1>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
                        {/* Contact Form */}
                        <div className="card">
                            <h2 style={{ color: '#0B5ED7', marginBottom: '20px' }}>Get in Touch 📧</h2>

                            {submitted && (
                                <div className="alert alert-success" style={{ marginBottom: '20px' }}>
                                    Thank you! We'll get back to you soon! 🎉
                                </div>
                            )}

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#334155' }}>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#334155' }}>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#334155' }}>Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What's this about?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#334155' }}>Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more..."
                                        rows="6"
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="card">
                            <h2 style={{ color: '#F97316', marginBottom: '20px' }}>Contact Information</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div>
                                    <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#0B5ED7' }}>📍 Address</h3>
                                    <p style={{ color: '#64748B', margin: 0 }}>
                                        123 Education Street<br />
                                        Student Hub, SH 12345<br />
                                        India
                                    </p>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#10B981' }}>📧 Email</h3>
                                    <p style={{ color: '#64748B', margin: 0 }}>
                                        support@edutrack.com<br />
                                        info@edutrack.com
                                    </p>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#F59E0B' }}>📞 Phone</h3>
                                    <p style={{ color: '#64748B', margin: 0 }}>
                                        +91 1234567890<br />
                                        +91 0987654321
                                    </p>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#0B5ED7' }}>🕐 Working Hours</h3>
                                    <p style={{ color: '#64748B', margin: 0 }}>
                                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                                        Saturday: 10:00 AM - 4:00 PM<br />
                                        Sunday: Closed
                                    </p>
                                </div>

                                <div style={{
                                    background: '#0B5ED7',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    marginTop: '16px',
                                    textAlign: 'center'
                                }}>
                                    <p style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: 0 }}>
                                        We usually respond within 24 hours! ⚡
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Contact;
