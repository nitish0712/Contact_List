const mongoose = require('mongoose');

const contactSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 11
    }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact; 