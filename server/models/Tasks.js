const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
});

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a task"],
        trim: true,
        maxlength: [50, "name cannot be more than 50 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide user"]
    },
    comments: [CommentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);