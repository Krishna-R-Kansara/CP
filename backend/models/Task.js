import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
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
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Overdue'],
        default: 'Pending'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    dueDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
});

export default mongoose.model('Task', taskSchema);
