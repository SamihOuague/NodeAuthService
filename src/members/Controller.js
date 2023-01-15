const Model = require("./Model");
const { jwtVerify } = require("../utils/jwt");
const randomStr = require("unique-slug");

module.exports = {
	getUser: async (req, res) => {
		try {
			let token = req.headers.authorization.split(' ');
			if (token.length < 2) return res.sendStatus(400);
			else token = token[1];
			let decoded = jwtVerify(token);
			let user = await Model.findOne({_id: decoded.sub});
			if (!user) return res.sendStatus(404);
			return res.send(user);
		} catch(e) {
			return res.sendStatus(500);
		}
	},
	updateProfil: async (req, res) => {
		try {
			let token = req.headers.authorization.split(' ')[1];
			let decoded = jwtVerify(token);
			let user = await Model.findOneAndUpdate({_id: decoded.sub}, req.body, {new: true});
			if (!user) return res.sendStatus(404);
			return res.send(user);

		} catch(e) {
			return res.sendStatus(500);
		}
	},
	deleteProfil: async (req, res) => {
		try {
			let token = req.headers.authorization.split(' ')[1];
			let decoded = jwtVerify(token);
			let user = await Model.findOneAndDelete({_id: decoded.sub});
			if (!user) return res.sendStatus(404);
			return res.send(user);
		} catch(e) {
			return res.sendStatus(500);
		}
	},
	forgotPwd: async (req, res) => {
		const { email } = req.body;
		try {
			if (!email) return res.sendStatus(400);
			let user = await Model.findOneAndUpdate({email}, { resetId: { url_id: randomStr() } });
			if (!user || !user._id) res.sendStatus(404);
			return res.send((await Model.findOne({email}, {email: 1, resetId: 1})));
		} catch(e) {
			return res.sendStatus(404);
		}
	},
	resetPwd: async (req, res) => {
		const { url_id } = req.params;
		try {
			let user = await Model.findOne({ resetId: url_id });
			if (!user) return res.sendStatus(404);
			return res.send(user);
		} catch (e) {
			return res.sendStatus(400);
		}
	},
	ping: (req, res) => {
		return res.send({ logged: true });
	}
};
