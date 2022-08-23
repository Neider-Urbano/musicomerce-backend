const { Router } = require("express");
const router = Router();
const {
  mailSignUp,
  modifyUserProfile,
  mailPurchase,
  mailNewsletter,
  mailResetPassword,
  mailPassReseted,
  mailAdmin,
} = require("../controllers/mailController");

router.post("/sign", mailSignUp);
router.post("/profile", modifyUserProfile);
router.post("/purchase", mailPurchase);
router.post("/news", mailNewsletter);
router.post("/resetpassword", mailResetPassword);
router.post("/passwordreseted", mailPassReseted);
//router.post("/resetpasswordadmin", mailResetPassword);
router.post("/resetpasswordadmin", mailAdmin);

module.exports = router;
