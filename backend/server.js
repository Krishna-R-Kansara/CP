import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import academicRoutes from './routes/academic.js';
import financeRoutes from './routes/finance.js';
import taskRoutes from './routes/task.js';
import noteRoutes from './routes/note.js';

// Import error middleware
import {
  notFound,
  validationErrorHandler,
  castErrorHandler,
  duplicateKeyErrorHandler,
  jwtErrorHandler,
  globalErrorHandler
} from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notes', noteRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EduTrack API is running' });
});

// Error handling middleware (order matters!)
app.use(notFound); // 404 handler
app.use(validationErrorHandler); // Mongoose validation errors
app.use(castErrorHandler); // Invalid ObjectId errors
app.use(duplicateKeyErrorHandler); // Duplicate key errors
app.use(jwtErrorHandler); // JWT errors
app.use(globalErrorHandler); // Catch-all error handler

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
