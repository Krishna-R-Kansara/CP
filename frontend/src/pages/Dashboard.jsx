import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { academicAPI, financeAPI, taskAPI, noteAPI } from '../utils/api';
import '../styles/Dashboard.css';

function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        academics: 0,
        finances: 0,
        tasks: 0,
        notes: 0
    });
    const [quote, setQuote] = useState({
        text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
        author: 'Winston Churchill'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
        fetchQuote();
    }, []);

    const loadStats = async () => {
        try {
            const [academicRes, financeRes, taskRes, noteRes] = await Promise.all([
                academicAPI.getAll(),
                financeAPI.getAll(),
                taskAPI.getAll(),
                noteAPI.getAll()
            ]);

            setStats({
                academics: academicRes.data?.length || 0,
                finances: financeRes.data?.length || 0,
                tasks: taskRes.data?.filter(t => t.status !== 'Completed').length || 0,
                notes: noteRes.data?.length || 0
            });
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchQuote = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random?tags=inspirational,success,education');
            const data = await response.json();
            setQuote({ text: data.content, author: data.author });
        } catch (error) {
            console.error('Error fetching quote:', error);
            // Keep the default quote if API fails
        }
    };

    const getCurrentDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    };

    return (
        <div className="dashboard">
            <Navbar />

            <div className="dashboard-content">
                {/* Hero Section */}
                <div className="dashboard-hero">
                    <div className="hero-text">
                        <h1>Welcome back, <span style={{ color: '#0B5ED7' }}>{user?.name || 'Student'}</span>! 👋</h1>
                        <p className="hero-date">📅 {getCurrentDate()}</p>
                    </div>
                    <div className="hero-quote">
                        <p className="quote-text">"{quote.text}"</p>
                        <p className="quote-author">— {quote.author}</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon blue">📚</div>
                        <div className="stat-info">
                            <h3>Academic Records</h3>
                            <div className="stat-value">{loading ? '...' : stats.academics}</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon orange">💰</div>
                        <div className="stat-info">
                            <h3>Finance Entries</h3>
                            <div className="stat-value">{loading ? '...' : stats.finances}</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon green">✅</div>
                        <div className="stat-info">
                            <h3>Active Tasks</h3>
                            <div className="stat-value">{loading ? '...' : stats.tasks}</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon purple">📝</div>
                        <div className="stat-info">
                            <h3>Total Notes</h3>
                            <div className="stat-value">{loading ? '...' : stats.notes}</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="actions-grid">
                        <Link to="/academic" className="action-card">
                            <div className="action-icon">📚</div>
                            <h3>View Academics</h3>
                            <p>Track your grades & performance</p>
                        </Link>

                        <Link to="/finance" className="action-card">
                            <div className="action-icon">💰</div>
                            <h3>Manage Finance</h3>
                            <p>Monitor income & expenses</p>
                        </Link>

                        <Link to="/tasks" className="action-card">
                            <div className="action-icon">✅</div>
                            <h3>Manage Tasks</h3>
                            <p>Organize your to-dos</p>
                        </Link>

                        <Link to="/notes" className="action-card">
                            <div className="action-icon">📝</div>
                            <h3>View Notes</h3>
                            <p>Access your study notes</p>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
