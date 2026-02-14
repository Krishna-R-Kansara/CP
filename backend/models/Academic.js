import mongoose from 'mongoose';

const academicSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        min: 0,
        max: 100
    },
    status: {
        type: String,
        enum: ['Excellent', 'Good', 'Average', 'Poor'],
        default: 'Average'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Academic', academicSchema);
