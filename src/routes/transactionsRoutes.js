const {verifyToken}=require("../middlewares/authjwt")
const { Router } = require("express");
const router = Router();
const {get_transactions}=require("../controllers/transactionsController");
const { verifyTokenAdmin } = require("../middlewares/authjwtAdmin");


router.get("/",[verifyTokenAdmin],get_transactions)




module.exports = router;