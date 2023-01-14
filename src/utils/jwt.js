const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
	jwtSign: (user) => {
		const payload = {
			sub: user.id,
			iat: Date.now()
		};
		return jwt.sign(payload, config.secretKey);
	},
	jwtVerify: (token) => {
		return jwt.verify(token, config.secretKey);
	}
};
