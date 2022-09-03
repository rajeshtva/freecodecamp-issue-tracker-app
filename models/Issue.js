const mongoose = require('mongoose')

const issueSchema = mongoose.Schema({
    issue_title: {
        type: String,
        required: true,
    },
    issue_text: {
        type: String,
        required: true,
    },
    created_by: {
        type: String,
        required: true,
    },
    project: {
        type: String,
        required: true,
    },
    assigned_to: {
        type: String,
        required: false,
        default: ""
    },
    status_text: {
        type: String,
        required: false,
        default: ""
    },
    created_on: {
        type: Date,
        required: false,
        default: Date.now() - 1,
    },
    updated_on: {
        type: Date,
        required: false,
        default: Date.now(),
    },
    open: {
        type: Boolean,
        required: false,
        default: true,

    }
})

const Issue = mongoose.model('Issue', issueSchema)

module.exports = Issue;
