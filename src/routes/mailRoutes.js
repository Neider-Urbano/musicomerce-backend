const { Router } = require("express");
const router = Router();
const { mailSignUp } = require("../controllers/mailController");

router.post("/", mailSignUp);

module.exports = router;
