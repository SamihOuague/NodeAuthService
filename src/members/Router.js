const router = require('express').Router();
const auth = require('../api/authentication');
const { ping } = require("./Controller");
const { isAuth } = require("../utils/allowedUser");


router.post('/login', auth.signIn);
router.post('/register', auth.signUp);
router.get('/ping', isAuth, ping);

module.exports = router;
