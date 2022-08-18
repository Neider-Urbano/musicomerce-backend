const { Router } = require("express");
const router = Router();
const {
  mailSignUp,
  modifyUserProfile,
  /* mailPurchase */
} = require("../controllers/mailController");

router.post("/sign", mailSignUp);
router.post("/profile", modifyUserProfile);
//router.post("/purchase", mailPurchase);

module.exports = router;
