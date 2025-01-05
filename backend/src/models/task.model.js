const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
    status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], required: true },
    deadline: { type: Date, required: true },
    performance_metrics: {
        time_taken: { type: Number, required: true }, // In hours
        quality_score: { type: Number, required: true }, // Out of 100
        feedback: { type: String, required: false }
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
