let Model = require("../members/Model");

module.exports = {
    signIn: (req, res) => {
        let { email, password } = req.body;
        if (!email || !password)
            return res.status(422).send({message: "Something is wrong !"});
        Model.findOne({ email }, (err, docs) => {
            if (err) return res.status(422).send({err});
            else if (!docs) return res.status(401).send({message: "Username does not exist !"});
            else {
                docs.comparePwd(password, (err, val) => {
                    if (err || !val) return res.status(401).send({message: "Something is wrong with the password"});
                    else return res.json({
                        success: true,
                        message: "You are logged."
                    });
                });
            }
        });
    },
    signUp: (req, res, next) => {
        let { username, password, email } = req.body;
        if (!username || !password || !email)
            return res.status(401).send({message: "Something is wrong !"});
        Model.findOne({ email }, (err, docs) => {
            if (err) return res.status(422).send({err});
            if (docs) return res.status(422).send({message: "User already exists !"});
            let model = new Model({
                username: username,
                password: password,
                email: email
            });
            model.save((err, user) => {
                if (err) next(err);
                res.json({success: true, user});
            });
        });
    }
}