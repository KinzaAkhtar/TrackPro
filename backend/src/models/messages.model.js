const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, required: true },
    read_status: { type: Boolean, default: false }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;