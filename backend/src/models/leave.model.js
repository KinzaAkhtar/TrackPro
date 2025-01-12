import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    Name: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    status: { type: String, default: "Pending" },
    leave_type: { type: String },
}, { timestamps: true });

export const Leaves = mongoose.model('leaves', leaveSchema);
