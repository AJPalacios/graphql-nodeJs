const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    views: Number
});

module.exports = mongoose.model('Course', courseSchema);