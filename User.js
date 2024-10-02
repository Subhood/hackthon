// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    preferences: { type: Object, default: {} },
});

module.exports = mongoose.model('User', userSchema);
