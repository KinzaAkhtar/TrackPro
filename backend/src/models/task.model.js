import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    priority: { type: String, required: true },
    status: { type: String, required: true, default: "TODO" },
    deadline: { type: Date, required: true },
    done_on: { type: Date },
    department: { type: String, required: true },
    tasktype: { type: String, required: true },
    quality_score: { type: Number }, // Out of 100
    attached_file: { type: String },//cloudinary url
    returned: { type: Boolean },
    return_message: { type: String },
    commentsection: { type: mongoose.Schema.Types.ObjectId, ref: 'comment' }
}, {
    timestamps: true,
});

export const Task = mongoose.model('Task', taskSchema);
