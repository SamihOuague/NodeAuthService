const Model = require("./Model");
const { jwtVerify, jwtPwdReset, jwtEmailConfirm } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: "",
			pass: "",
		},
	});
	let infos = await transporter.sendMail(data);

	return infos;
};

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
			let regex = /^([a-zA-Z0-9]+)\.{0,1}[a-zA-Z0-9_-]+@{1}([a-zA-Z0-9_-]{3,})(\.[a-zA-Z]{2,5})$/;
			if (req.body.email && !regex.test(req.body.email)) return res.status(400).send({msg: "Invalid email !"});
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
		try {
			const { email } = req.body;
			if (!email) return res.sendStatus(400);
			let user = await Model.findOne({email}, {_id: 1, email: 1});
			if (!user || !user._id) return res.sendStatus(404);
			const url_token = jwtPwdReset(user);
			let msg = await sendEmail({
				from: "souaguen96@gmail.com",
				to: user.email,
				subject: "Reset Your Password",
				text: `Copy this link : http://localhost:3000/reset-password?url_token=${url_token}`,
				html: `<a href=\"http://localhost:3000/reset-password?url_token=${url_token}\">
							Click Here to reset password
						</a>
						<p>Or copy this link : http://localhost:3000/reset-password?url_token=${url_token}</p>`,
			});
			if (!msg || !msg.messageId) return res.sendStatus(500);
			return res.send({msg});
		} catch(e) {
			return res.sendStatus(404);
		}
	},
	resetPwd: async (req, res) => {
		const { password, url_token } = req.body;
		try {
			let decoded = jwtVerify(url_token);
			const limit = decoded.iat+((60*1000) * 15);
			if (!password || password.length < 8) return res.sendStatus(400);
			else if (limit < Date.now()) return res.status(403).send({msg: "Token expired !"});
			let user = await Model.findOneAndUpdate({ _id: decoded.r_sub }, {password: bcrypt.hashSync(password, 12)});
			if (!user) return res.sendStatus(404);
			return res.send(user);
		} catch (e) {
			return res.sendStatus(500);
		}
	},
	getConfirmation: async (req, res) => {
		try {
			let token = req.headers.authorization.split(' ')[1];
			let decoded = jwtVerify(token);
			let user = await Model.findOne({ _id: decoded.sub }, {_id: 1, email: 1});
			if (!user || !user._id) res.sendStatus(404);
			else if (user.confirmed) return res.status(400).send({msg: "Email already confirmed"});
			let url_token = jwtEmailConfirm(user);
			let msg = await sendEmail({
				from: "souaguen96@gmail.com",
				to: user.email,
				subject: "Email Confirmation",
				text: `Copy this link : https://localhost:3000/verify-email?url_token=${url_token}`,
				html: `<a href=\"https://localhost:3000/verify-email?url_token=${url_token}\">
							Click Here to confirm
						</a>
						<p>Or copy this link : https://localhost:3000/verify-email?url_token=${url_token}</p>`,
			});
			if (!msg || !msg.messageId) return res.sendStatus(500);
			return res.send({msg});
		} catch(e) {
			return res.sendStatus(500);
		}
	},
	verifyEmail: async (req, res) => {
		try {
			const { url_token } = req.query;
			if (!url_token) return res.sendStatus(400);
			const decoded = jwtVerify(url_token);
			const limit = decoded.iat+((60*1000) * 15);
			if (!decoded) return res.sendStatus(401);
			else if (limit < Date.now()) return res.status(403).send({msg: "Token expired !"});
			const user = await Model.findByIdAndUpdate({_id: decoded.e_sub}, { confirmed: true }, {new: true});
			if (!user) return res.sendStatus(404);
			return res.send({confirmed: user.confirmed});
		} catch(e) {
			return res.sendStatus(500);
		}
	},
	ping: (req, res) => {
		return res.send({ logged: true });
	}
};
