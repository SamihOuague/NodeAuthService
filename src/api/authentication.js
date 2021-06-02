let Model = require("../members/Model");

module.exports = {
    signIn: (req, res) => {
        let { username, password } = req.body;
        if (!username || !password)
            return res.status(422).send({message: "Something is wrong !"});
        Model.findOne({ username }, (err, docs) => {
            if (err) return res.status(422).send({err});
            if (docs) return res.status(200).send({message: "You are logged !"});
            else return res.status(422).send({message: "Username does not exist !"});
        });
    },
    signUp: (req, res, next) => {
        let { username, password, email } = req.body;
        if (!username || !password || !email)
            return res.status(422).send({message: "Something is wrong !"});
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
                console.log(user);
                res.json({success: true, user});
            });
        });
    }
}