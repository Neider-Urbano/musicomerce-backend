const {verifyToken}=require("../middlewares/authjwt")
const { Router } = require("express");
const router = Router();
const {get_transactions, get_user_transactions}=require("../controllers/transactionsController")
const { verifyTokenAdmin } = require("../middlewares/authjwtAdmin");

router.get("/",[verifyTokenAdmin],get_transactions)
router.get("/", [verifyToken], get_user_transactions)


module.exports = router;