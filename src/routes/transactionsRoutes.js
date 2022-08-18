const {verifyToken}=require("../middlewares/authjwt")
const { Router } = require("express");
const router = Router();
const {get_transactions}=require("../controllers/transactionsController")


router.get("/",get_transactions)




module.exports = router;