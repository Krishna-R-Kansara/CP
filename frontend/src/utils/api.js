const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper to handle API responses and auto-logout on 401
const handleResponse = async (response) => {
    const data = await response.json();

    // If unauthorized (401), clear auth data and reload to login
    if (response.status === 401 && window.location.pathname !== '/login' && window.location.pathname !== '/signup' && window.location.pathname !== '/') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    return data;
};

// Auth API
export const authAPI = {
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    },

    signup: async (name, email, password, studentId) => {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, studentId })
        });
        return response.json();
    },

    verify: async () => {
        const response = await fetch(`${API_URL}/auth/verify`, {
            headers: getAuthHeader()
        });
        return response.json();
    }
};

// Academic API
export const academicAPI = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/academic`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    create: async (data) => {
        const response = await fetch(`${API_URL}/academic`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    update: async (id, data) => {
        const response = await fetch(`${API_URL}/academic/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    delete: async (id) => {
        const response = await fetch(`${API_URL}/academic/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    }
};

// Finance API
export const financeAPI = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/finance`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    getSummary: async () => {
        const response = await fetch(`${API_URL}/finance/summary`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    create: async (data) => {
        const response = await fetch(`${API_URL}/finance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    update: async (id, data) => {
        const response = await fetch(`${API_URL}/finance/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    delete: async (id) => {
        const response = await fetch(`${API_URL}/finance/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    }
};

// Task API
export const taskAPI = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/tasks`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    create: async (data) => {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    update: async (id, data) => {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    delete: async (id) => {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    }
};

// Note API
export const noteAPI = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/notes`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    getOne: async (id) => {
        const response = await fetch(`${API_URL}/notes/${id}`, {
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    create: async (data) => {
        const response = await fetch(`${API_URL}/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    update: async (id, data) => {
        const response = await fetch(`${API_URL}/notes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    },

    togglePin: async (id) => {
        const response = await fetch(`${API_URL}/notes/${id}/pin`, {
            method: 'PUT',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    },

    delete: async (id) => {
        const response = await fetch(`${API_URL}/notes/${id}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });
        return handleResponse(response);
    }
};
