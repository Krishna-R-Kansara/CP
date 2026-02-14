import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    }, []);

    useEffect(() => {
        // Verify token and user existence on app load
        const verifyUser = async () => {
            if (token) {
                try {
                    const response = await authAPI.verify();

                    if (response.success && response.user) {
                        // User exists in database, update user data
                        setUser(response.user);
                        localStorage.setItem('user', JSON.stringify(response.user));
                    } else {
                        // Token invalid or user deleted from database
                        console.log('User verification failed:', response.message);
                        logout();
                    }
                } catch (error) {
                    // Network error or token invalid
                    console.error('Token verification error:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        verifyUser();
    }, [token, logout]);

    const login = (userData, authToken) => {
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(authToken);
        setUser(userData);
    };

    const signup = (userData, authToken) => {
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(authToken);
        setUser(userData);
    };

    const value = {
        user,
        token,
        loading,
        login,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
