const { Router } = require("express");
// const handler = require("../controllers/stripeController");
const { handlePayStripe } = require("../controllers/paymentController");
const router = Router();

router.post("/", handlePayStripe);

module.exports = router;
