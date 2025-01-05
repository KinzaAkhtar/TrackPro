const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true },
    check_in: { type: String, required: true },
    check_out: { type: String, required: true },
    hours_worked: { type: Number, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'On Leave', 'Half Day'], required: true },
    leave_type: { type: String, required: false },
    approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: false },
    created_at: { type: Date, default: Date.now }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
