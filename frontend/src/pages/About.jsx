import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Module.css';

function About() {
    return (
        <>
            <Navbar />
            <div className="module-page">
                <div className="module-content">
                    <div className="module-header">
                        <h1>About EduTrack</h1>
                    </div>

                    <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h2 style={{ color: '#0B5ED7', marginBottom: '20px' }}>Welcome to EduTrack! 🎓</h2>

                        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#475569', marginBottom: '20px' }}>
                            EduTrack is your all-in-one integrated student management system designed to help students
                            organize their academic life, manage finances, track tasks, and keep notes all in one place.
                        </p>

                        <h3 style={{ color: '#F97316', marginTop: '32px', marginBottom: '16px' }}>Our Mission</h3>
                        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#475569', marginBottom: '20px' }}>
                            We believe that students deserve powerful yet simple tools to excel in their academic journey.
                            EduTrack was built by students, for students, to make academic life more organized and stress-free.
                        </p>

                        <h3 style={{ color: '#10B981', marginTop: '32px', marginBottom: '16px' }}>Key Features</h3>
                        <ul style={{ fontSize: '16px', lineHeight: '2', color: '#475569', paddingLeft: '24px' }}>
                            <li><strong>📚 Academic Tracking:</strong> Monitor grades, track performance, and visualize your academic progress</li>
                            <li><strong>💰 Financial Management:</strong> Keep track of income and expenses with smart budgeting tools</li>
                            <li><strong>✅ Task Management:</strong> Organize tasks, set priorities, and never miss a deadline</li>
                            <li><strong>📝 Notes App:</strong> Create, organize, and access your study notes from anywhere</li>
                        </ul>

                        <h3 style={{ color: '#0B5ED7', marginTop: '32px', marginBottom: '16px' }}>Built with Modern Technology</h3>
                        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#475569', marginBottom: '20px' }}>
                            EduTrack is built using the MERN stack (MongoDB, Express.js, React, Node.js) ensuring a
                            fast, secure, and reliable experience. Your data is encrypted and stored securely.
                        </p>

                        <div style={{
                            background: '#F97316',
                            padding: '24px',
                            borderRadius: '12px',
                            marginTop: '32px',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: 0 }}>
                                Join thousands of students organizing their success with EduTrack! 🚀
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
