let router = require("express").Router();
let auth = require("../api/authentication");

router.post("/login", auth.signIn);
router.post("/register", auth.signUp);

module.exports = router;