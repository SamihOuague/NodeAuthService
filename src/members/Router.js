const router = require('express').Router();
const auth = require('../api/authentication');
const { ping, getUser } = require("./Controller");
const { isAuth } = require("../utils/allowedUser");


router.post('/login', auth.signIn);
router.post('/register', auth.signUp);
router.get('/ping', isAuth, ping);
router.get('/get-user', isAuth, getUser);

module.exports = router;
