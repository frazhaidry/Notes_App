const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    fullName: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdOn: {
        type: Date,
        default: new Date().getTime()
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model('User', userSchema);