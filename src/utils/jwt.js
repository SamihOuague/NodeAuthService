const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
	jwtSign: (user) => {
		const payload = {
			sub: user.id,
			iat: Date.now(),
			role: user.role,
		};
		return jwt.sign(payload, config.secretKey);
	},
	jwtVerify: (token) => {
		return jwt.verify(token, config.secretKey);
	},
	jwtPwdReset: (user) => {
		const payload = {
			r_sub: user._id,
			iat: Date.now()
		};
		return jwt.sign(payload, config.secretKey);
	},
	jwtEmailConfirm: (user) => {
		const payload = {
			e_sub: user._id,
			iat: Date.now()
		};
		return jwt.sign(payload, config.secretKey);
	}
};
