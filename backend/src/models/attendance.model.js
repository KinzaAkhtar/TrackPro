import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true },
    check_in: { type: String, required: true },
    check_out: { type: String },
    hours_worked: { type: Number },
    status: { type: String, required: true },
    leave_type: { type: String, required: false },
    approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: false },
}, { timestamps: true });
export const Attendance = mongoose.model('Attendance', attendanceSchema);