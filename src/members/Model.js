const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

Schema.pre('save', function(next) {
    bcrypt.hash(this.password, 12, (err, hash) => {
        if (!err)
            this.set('password', hash);
        else
            console.log(err);
        next();
    });
});

Schema.methods.comparePwd = function (plainPwd, cb) {
    bcrypt.compare(plainPwd, this.password, (err, val) => {
        if (err) return cb(err);
        cb(null, val);
    });
}

module.exports = mongoose.model('Member', Schema);