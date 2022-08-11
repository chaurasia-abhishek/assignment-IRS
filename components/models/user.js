const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    UserProfile: {
        type: String,
    },
    Password: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    Role: {
        type: String,
        enum: ['Admin', 'Team Member'],
        required:true
    }
})

module.exports = mongoose.model('UserSchema', UserSchema)