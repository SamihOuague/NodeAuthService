const router = require('express').Router();
const auth = require('../api/authentication');

router.post('/login', auth.signIn);
router.post('/register', auth.signUp);

module.exports = router;
