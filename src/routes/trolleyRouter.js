const {verifyToken}=require("../middlewares/authjwt")
const { Router } = require("express");
const router = Router();
const {get_trolley,post_trolley,delete_trolley}=require("../controllers/trolleyController")






router.get("/",[verifyToken],get_trolley)
router.post("/",[verifyToken],post_trolley)
router.delete("/",[verifyToken],delete_trolley)








module.exports = router;