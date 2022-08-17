
const { Router } = require("express");
const { verifyToken } = require("../middlewares/authjwt");
const router = Router();
const {purchase}=require("../controllers/purchaseControllers")


router.get("/",[verifyToken],purchase)


module.exports = router;