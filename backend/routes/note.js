import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Note from '../models/Note.js';

const router = express.Router();

// @route   GET /api/notes
// @desc    Get all notes for logged-in user
// @access  Private
router.get('/', authenticate, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id })
            .sort({ isPinned: -1, updatedAt: -1 });
        res.json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/notes/:id
// @desc    Get single note
// @access  Private
router.get('/:id', authenticate, async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        res.json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/notes
// @desc    Create new note
// @access  Private
router.post('/', authenticate, async (req, res) => {
    try {
        const note = await Note.create({
            userId: req.user._id,
            ...req.body
        });
        res.status(201).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/notes/:id
// @desc    Update note
// @access  Private
router.put('/:id', authenticate, async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        res.json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/notes/:id/pin
// @desc    Toggle pin status of note
// @access  Private
router.put('/:id/pin', authenticate, async (req, res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        note.isPinned = !note.isPinned;
        await note.save();

        res.json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/notes/:id
// @desc    Delete note
// @access  Private
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        res.json({ success: true, message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
