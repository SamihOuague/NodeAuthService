const { jwtVerify } = require('./jwt');

module.exports = {
	isAuth: (req, res, next) => {
		const barear = req.headers.authorization;
		if (barear) {
			try {
				const token = barear.split(' ')[1];
				const verif = jwtVerify(token);
				if (!verif || !verif.sub) { return res.status(403).send({ logged: false }); }
			} catch (e) {
				return res.status(403).send({ logged: false });
			}
		} else {
			return res.status(401).send({ logged: false });
		}
		next();
	},
	isAdmin: (req, res, next) => {
		const barear = req.headers.authorization;
		try {
			const token = barear.split(' ')[1];
			const verif = jwtVerify(token);
			if (!verif || !verif.role || verif.role != 3) return res.status(403).send({ is_admin: false });
		} catch (e) {
			return res.status(401).send({ is_admin: false });
		}
		next();
	}
};