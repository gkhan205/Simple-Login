const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = Schema({
    email: String,
    password: String,
    name: String,
    avatar: String
});

module.exports = mongoose.model('User', RegisterSchema);