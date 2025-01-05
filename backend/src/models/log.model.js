const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    action: { type: String, required: true },
    details: { type: Map, of: String, required: false },
    timestamp: { type: Date, required: true }
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
module.exports = ActivityLog;
