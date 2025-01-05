const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    review_period: { type: String, required: true },
    tasks_completed: { type: Number, required: true },
    average_quality_score: { type: Number, required: true }, // Average score from completed tasks
    attendance_score: { type: Number, required: true }, // Out of 100, based on attendance
    overall_performance_score: { type: Number, required: true }, // Weighted score
    feedback: { type: String, required: false },
    reviewed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Performance = mongoose.model('Performance', performanceSchema);
module.exports = Performance;
