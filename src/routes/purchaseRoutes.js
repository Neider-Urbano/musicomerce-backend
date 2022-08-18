
const { Router } = require("express");
const { verifyToken } = require("../middlewares/authjwt");
const router = Router();
const {purchase_user}=require("../controllers/purchaseControllers")


router.get("/",[verifyToken],purchase_user)


module.exports = router;