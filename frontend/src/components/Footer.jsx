import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-logo">
                        <span style={{ color: '#0B5ED7' }}>Edu</span>
                        <span style={{ color: '#F97316' }}>Track</span>
                    </h3>
                    <p className="footer-description">
                        Your Complete Integrated Student Management System
                    </p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/academic">Academic</Link></li>
                        <li><Link to="/finance">Finance</Link></li>
                        <li><Link to="/tasks">Tasks</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Resources</h4>
                    <ul className="footer-links">
                        <li><Link to="/notes">Notes</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Connect</h4>
                    <p>📧 support@edutrack.com</p>
                    <p>📞 +91 1234567890</p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Twitter">🐦</a>
                        <a href="#" aria-label="Instagram">📷</a>
                        <a href="#" aria-label="LinkedIn">💼</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 EduTrack. Built for students, by students. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
