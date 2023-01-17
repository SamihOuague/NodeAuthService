const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ResetPwdSchema = new mongoose.Schema({
	url_param: String,
	created_at: Date,
});

const Schema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	address: String,
	addressDetails: String,
	zipcode: String,
	city: String,
	phoneNumber: String,
	confirmed: {
		type: Boolean,
		defaultValue: false,
	},
	role: {
		type: Number,
		defaultValue: 0,
	}
});

Schema.pre('save', function (next) {
	bcrypt.hash(this.password, 12, (err, hash) => {
		if (!err) { this.set('password', hash); } else { console.log(err); }
		next();
	});
});

Schema.methods.comparePwd = function (plainPwd, cb) {
	bcrypt.compare(plainPwd, this.password, (err, val) => {
		if (err) return cb(err);
		cb(null, val);
	});
};

module.exports = mongoose.model('Member', Schema);
