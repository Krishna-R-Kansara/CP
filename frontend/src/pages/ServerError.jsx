import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Error.css';

function ServerError() {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <div className="error-container">
                <div className="error-icon">⚠️</div>
                <div className="error-code">500</div>
                <h1 className="error-title">Server Error</h1>
                <p className="error-message">
                    Something went wrong on our end. We're working to fix the issue. Please try again later.
                </p>
                <div className="error-actions">
                    <button className="btn btn-primary" onClick={() => navigate('/')}>
                        Go Home
                    </button>
                    <button className="btn btn-secondary" onClick={() => window.location.reload()}>
                        Refresh Page
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ServerError;
