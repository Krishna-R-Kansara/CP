import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import '../styles/Navbar.css';

function Navbar() {
    const { user, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <span style={{ color: '#0B5ED7' }}>Edu</span>
                    <span style={{ color: '#F97316' }}>Track</span>
                </div>

                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
                    <li>
                        <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
                            🏠 Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                            ℹ️ About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
                            📧 Contact
                        </NavLink>
                    </li>
                </ul>

                <div className="navbar-user">
                    <button className="theme-toggle" onClick={toggleDarkMode} title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
