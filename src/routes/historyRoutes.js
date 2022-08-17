
const { Router } = require("express");
const { verifyToken } = require("../middlewares/authjwt");
const router = Router();
const {create_history}=require("../controllers/historyControllers")


router.get("/",[verifyToken],create_history)


module.exports = router;