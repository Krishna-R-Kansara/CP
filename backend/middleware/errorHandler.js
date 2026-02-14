// Error handling middleware

// Custom error class
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// 404 Not Found handler
export const notFound = (req, res, next) => {
    const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
    next(error);
};

// Validation error handler
export const validationErrorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors
        });
    }
    next(err);
};

// MongoDB cast error handler (invalid ObjectId)
export const castErrorHandler = (err, req, res, next) => {
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format'
        });
    }
    next(err);
};

// Duplicate key error handler
export const duplicateKeyErrorHandler = (err, req, res, next) => {
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            success: false,
            message: `${field} already exists`
        });
    }
    next(err);
};

// JWT error handler
export const jwtErrorHandler = (err, req, res, next) => {
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expired'
        });
    }
    next(err);
};

// Global error handler
export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
        console.error('❌ ERROR:', err);
    }

    // Send error response
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? {
            statusCode: err.statusCode,
            stack: err.stack
        } : undefined
    });
};
