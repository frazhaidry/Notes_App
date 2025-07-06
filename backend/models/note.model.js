const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: new Date().getTime()
    },
    isPinned : {
        type: String,
        default: false
    },
    userId : {
        type: String,
        required: true

    }
})

module.exports = mongoose.model('Note', noteSchema);