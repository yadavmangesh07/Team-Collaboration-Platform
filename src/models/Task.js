const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    projectId: { type: String, required: true },
    assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Task', TaskSchema);
