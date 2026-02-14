import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Error.css';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <div className="error-container">
                <div className="error-icon">🔍</div>
                <div className="error-code">404</div>
                <h1 className="error-title">Page Not Found</h1>
                <p className="error-message">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>
                <div className="error-actions">
                    <button className="btn btn-primary" onClick={() => navigate('/')}>
                        Go Home
                    </button>
                    <button className="btn btn-outline" onClick={() => navigate(-1)}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
