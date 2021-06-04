const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
    jwt_sign: (user) => {
        let payload = {
            sub: user.id,
            iat: Date.now()
        }
        return jwt.sign(payload, config.secretKey);
    },
    jwt_verify: (token) => {
        return jwt.verify(token, config.secretKey);
    }
}