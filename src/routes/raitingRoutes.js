const {verifyToken}=require("../middlewares/authjwt")
const { Router } = require("express");
const router = Router();
const {add_raiting,get_raiting} = require("../controllers/raitingController")

router.post("/",[verifyToken],add_raiting)

router.get("/",[verifyToken],get_raiting)


module.exports = router;