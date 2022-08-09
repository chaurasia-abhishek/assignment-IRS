const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task_description: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserSchema'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    global: {
        type: Boolean,
        default: false
    },
    comments: {
        type: Array,
    }
})

module.exports = mongoose.model('TaskSchema', TaskSchema);