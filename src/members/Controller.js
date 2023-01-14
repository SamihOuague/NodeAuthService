const Model = require("./Model");
const { jwtVerify } = require("../utils/jwt");

module.exports = {
	getUser: async (req, res) => {
		let token = req.headers.authorization.split(' ');
		if (token.length < 2) return res.sendStatus(400);
		else token = token[1];
		let decoded = jwtVerify(token);
		let user = await Model.findOne({_id: decoded.sub});
		if (!user) return res.sendStatus(404);
		return res.send(user);
	},
	updateProfil: (req, res, next) => {

	},
	forgotPwd: (req, res, next) => {

	},
	ping: (req, res) => {
		return res.send({ logged: true });
	}
};
