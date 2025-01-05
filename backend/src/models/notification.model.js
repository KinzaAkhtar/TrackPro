const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: Date, required: true },
    read_status: { type: Boolean, default: false }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
