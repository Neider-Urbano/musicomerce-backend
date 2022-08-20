const {verifyTokenAdmin}=require("../middlewares/authjwtAdmin")
const { Router } = require("express");
const router = Router();

const {
  getAdmins,
  createtAdmin,
  deleteAdmin,
  modifyAdmin,
  getAdminById,
} = require("../controllers/adminController");

router.get("/",[verifyTokenAdmin], getAdmins);
router.post("/register",[verifyTokenAdmin], createtAdmin);
router.delete("/", [verifyTokenAdmin],deleteAdmin);
router.put("/",[verifyTokenAdmin], modifyAdmin);
router.get("/id",[verifyTokenAdmin], getAdminById);

module.exports = router;
