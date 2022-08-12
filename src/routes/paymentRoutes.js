const { Router } = require("express");
const handler = require("../controllers/stripeController");
const router = Router();



router.post("/", handler);

module.exports = router;

