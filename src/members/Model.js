const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

module.exports = mongoose.model('Member', Schema);