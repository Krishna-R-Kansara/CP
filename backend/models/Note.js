import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    color: {
        type: String,
        default: '#FFFFFF'
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
noteSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model('Note', noteSchema);
