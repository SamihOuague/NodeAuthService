const Model = require('../members/Model');
const { jwtSign } = require('../utils/jwt');
const jwt = require('../utils/jwt');

module.exports = {
	signIn: (req, res) => {
		const { email, password } = req.body;
		let regex = /^([a-zA-Z0-9]+)\.{0,1}[a-zA-Z0-9_-]+@{1}([a-zA-Z0-9_-]{3,})(\.[a-zA-Z]{2,5})$/;
		if (!email || !password) { return res.status(422).send({ message: 'Something is wrong !' }); }
		else if (!regex.test(email)) res.status(401).send({ message: "Invalid email !" });
		Model.findOne({ email }, (err, docs) => {
			if (err) return res.status(422).send({ err });
			else if (!docs) return res.status(401).send({ message: 'Username does not exist !' });
			else {
				docs.comparePwd(password, (err, val) => {
					if (err || !val) return res.status(401).send({ message: 'Something is wrong with the password' });
					else {
						return res.json({
							success: true,
							token: jwt.jwtSign(docs)
						});
					}
				});
			}
		});
	},
	signUp: (req, res, next) => {
		const { password, email, firstname, lastname } = req.body;
		let regex = /^([a-zA-Z0-9]+)\.{0,1}[a-zA-Z0-9_-]+@{1}([a-zA-Z0-9_-]{3,})(\.[a-zA-Z]{2,5})$/;
		if (!password || !email || !firstname || !lastname) return res.status(401).send({ message: 'Something is wrong !' });
		else if (!regex.test(email)) return res.status(401).send({ message: "Invalid email !" });
		else if (password.length < 8) return res.status(401).send({ message: "Invalid password !" });
		Model.findOne({ email }, (err, docs) => {
			if (err) return res.status(422).send({ err });
			if (docs) return res.status(422).send({ message: 'User already exists !' });
			const model = new Model({
				password: password,
				email: email,
				firstname,
				lastname,
				role: 0,
			});
			model.save((err, user) => {
				if (err) next(err);
				res.json({ success: true, token: jwtSign(user) });
			});
		});
	}
};
