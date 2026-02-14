import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Academic from './pages/Academic';
import Finance from './pages/Finance';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/academic" element={
              <ProtectedRoute><Academic /></ProtectedRoute>
            } />
            <Route path="/finance" element={
              <ProtectedRoute><Finance /></ProtectedRoute>
            } />
            <Route path="/tasks" element={
              <ProtectedRoute><Tasks /></ProtectedRoute>
            } />
            <Route path="/notes" element={
              <ProtectedRoute><Notes /></ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute><About /></ProtectedRoute>
            } />
            <Route path="/contact" element={
              <ProtectedRoute><Contact /></ProtectedRoute>
            } />

            <Route path="/500" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
