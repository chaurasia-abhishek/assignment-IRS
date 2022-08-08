const mongoose = require('mongoose');
const CommetSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type:String,
        required: true,
    }
})


module.exports = mongoose.model('CommetSchema', CommetSchema);