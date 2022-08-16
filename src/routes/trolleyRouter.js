const {verifyToken}=require("../middlewares/authjwt")
const { Router } = require("express");
const router = Router();
const {get_trolley,post_trolley,delete_trolley,delete_all_trolley,more_Stock,less_stock}=require("../controllers/trolleyController")






router.get("/",[verifyToken],get_trolley)
router.post("/",[verifyToken],post_trolley)
router.delete("/",[verifyToken],delete_trolley)
router.delete("/all",[verifyToken],delete_all_trolley)
router.post("/more",[verifyToken],more_Stock)
router.post("/less",[verifyToken],less_stock)







module.exports = router;