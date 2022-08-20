const { Router } = require("express");
const router = Router();
const {
  mailSignUp,
  modifyUserProfile,
  mailPurchase,
  mailNewsletter,
} = require("../controllers/mailController");

router.post("/sign", mailSignUp);
router.post("/profile", modifyUserProfile);
router.post("/purchase", mailPurchase);
router.post("/news", mailNewsletter);

module.exports = router;
