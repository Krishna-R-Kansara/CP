import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Finance from '../models/Finance.js';

const router = express.Router();

// @route   GET /api/finance
// @desc    Get all finance records for logged-in user
// @access  Private
router.get('/', authenticate, async (req, res) => {
    try {
        const finances = await Finance.find({ userId: req.user._id }).sort({ date: -1 });
        res.json({ success: true, data: finances });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/finance/summary
// @desc    Get finance summary (total income, expenses, balance)
// @access  Private
router.get('/summary', authenticate, async (req, res) => {
    try {
        const finances = await Finance.find({ userId: req.user._id });

        const totalIncome = finances
            .filter(f => f.type === 'Income')
            .reduce((sum, f) => sum + f.amount, 0);

        const totalExpense = finances
            .filter(f => f.type === 'Expense')
            .reduce((sum, f) => sum + f.amount, 0);

        res.json({
            success: true,
            data: {
                totalIncome,
                totalExpense,
                balance: totalIncome - totalExpense
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/finance
// @desc    Create new finance record
// @access  Private
router.post('/', authenticate, async (req, res) => {
    try {
        const finance = await Finance.create({
            userId: req.user._id,
            ...req.body
        });
        res.status(201).json({ success: true, data: finance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/finance/:id
// @desc    Update finance record
// @access  Private
router.put('/:id', authenticate, async (req, res) => {
    try {
        const finance = await Finance.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!finance) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }

        res.json({ success: true, data: finance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/finance/:id
// @desc    Delete finance record
// @access  Private
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const finance = await Finance.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!finance) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }

        res.json({ success: true, message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
