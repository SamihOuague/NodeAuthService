const Model = require('../members/Model');
const { jwtSign } = require('../utils/jwt');
const jwt = require('../utils/jwt');

module.exports = {
  signIn: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) { return res.status(422).send({ message: 'Something is wrong !' }); }
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
    const { password, email } = req.body;
    if (!password || !email) { return res.status(401).send({ message: 'Something is wrong !' }); }
    Model.findOne({ email }, (err, docs) => {
      if (err) return res.status(422).send({ err });
      if (docs) return res.status(422).send({ message: 'User already exists !' });
      const model = new Model({
        password: password,
        email: email
      });
      model.save((err, user) => {
        if (err) next(err);
        res.json({ success: true, token: jwtSign(user) });
      });
    });
  }
};
