const { Router } = require("express");
const router = Router();

const {
  getAdmins,
  createtAdmin,
  deleteAdmin,
  modifyAdmin,
  getAdminById,
} = require("../controllers/adminController");

router.get("/", getAdmins);
router.post("/register", createtAdmin);
router.delete("/", deleteAdmin);
router.put("/", modifyAdmin);
router.get("/:id", getAdminById);

module.exports = router;
