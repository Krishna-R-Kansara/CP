import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

function Landing() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleNewsletter = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <div className="landing">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1><span style={{ color: '#0B5ED7' }}>Edu</span>
                        <span style={{ color: '#F97316' }}>Track</span>
                    </h1>
                    <p>Where Academic Excellence Meets Smart Organization 🚀</p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary" onClick={() => navigate('/login')}>
                            Login
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/signup')}>
                            Start Your Journey
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services">
                <h2>Everything You Need, All In One Place</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon">📚</div>
                        <h3>Academic Mastery</h3>
                        <p>Track grades, visualize your progress, and stay ahead of the curve with intelligent academic insights.</p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">💰</div>
                        <h3>Smart Money Moves</h3>
                        <p>Master your finances like a pro. Track every rupee, budget smarter, and achieve financial freedom.</p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">✅</div>
                        <h3>Task Domination</h3>
                        <p>Never miss a deadline again. Organize, prioritize, and conquer your tasks with military precision.</p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">📝</div>
                        <h3>Digital Brain</h3>
                        <p>Your second brain in the cloud. Create, organize, and access your notes anytime, anywhere.</p>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter">
                <h2>Join The Smart Students Club</h2>
                <p>Be the first to know about new features, productivity tips, and exclusive updates!</p>

                {subscribed && (
                    <div className="alert alert-success" style={{ maxWidth: '500px', margin: '0 auto 20px' }}>
                        Welcome aboard! 🎉 Check your inbox for goodies
                    </div>
                )}

                <form className="newsletter-form" onSubmit={handleNewsletter}>
                    <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Count Me In!</button>
                </form>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <p>&copy; 2026 EduTrack. Built for students, by students. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Landing;
