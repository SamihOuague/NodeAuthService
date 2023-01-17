const router = require('express').Router();
const auth = require('../api/authentication');
const { ping, getUser, updateProfil, deleteProfil, forgotPwd, resetPwd, getConfirmation, verifyEmail } = require("./Controller");
const { isAuth } = require("../utils/allowedUser");


router.post('/login', auth.signIn);
router.post('/register', auth.signUp);
router.post('/forgot-password', forgotPwd);
router.put('/reset-pwd', resetPwd);
router.put('/update-user', isAuth, updateProfil);
router.get('/ping', isAuth, ping);
router.get('/get-user', isAuth, getUser);
router.get('/confirm-email', isAuth, getConfirmation);
router.get('/verify-email', verifyEmail);
router.delete('/delete-user', isAuth, deleteProfil);

module.exports = router;
