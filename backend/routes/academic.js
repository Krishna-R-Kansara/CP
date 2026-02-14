import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Academic from '../models/Academic.js';

const router = express.Router();

// @route   GET /api/academic
// @desc    Get all academic records for logged-in user
// @access  Private
router.get('/', authenticate, async (req, res) => {
    try {
        const academics = await Academic.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, data: academics });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/academic
// @desc    Create new academic record
// @access  Private
router.post('/', authenticate, async (req, res) => {
    try {
        const academic = await Academic.create({
            userId: req.user._id,
            ...req.body
        });
        res.status(201).json({ success: true, data: academic });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/academic/:id
// @desc    Update academic record
// @access  Private
router.put('/:id', authenticate, async (req, res) => {
    try {
        const academic = await Academic.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!academic) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }

        res.json({ success: true, data: academic });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/academic/:id
// @desc    Delete academic record
// @access  Private
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const academic = await Academic.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!academic) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }

        res.json({ success: true, message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
