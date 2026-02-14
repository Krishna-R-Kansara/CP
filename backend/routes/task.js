import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Task from '../models/Task.js';

const router = express.Router();

// @route   GET /api/tasks
// @desc    Get all tasks for logged-in user
// @access  Private
router.get('/', authenticate, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/tasks
// @desc    Create new task
// @access  Private
router.post('/', authenticate, async (req, res) => {
    try {
        const task = await Task.create({
            userId: req.user._id,
            ...req.body
        });
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', authenticate, async (req, res) => {
    try {
        // If status is being changed to completed, set completedAt
        if (req.body.status === 'Completed') {
            req.body.completedAt = new Date();
        }

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
