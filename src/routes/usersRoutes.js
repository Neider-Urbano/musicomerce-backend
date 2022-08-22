const { verifyToken } = require("../middlewares/authjwt");
const { verifyTokenAdmin } = require("../middlewares/authjwtAdmin");
const { Router } = require("express");
const router = Router();

const {
  postUser,
  deleteUser,
  putUser,
  postUsersAll,
  getUsers,
  getUserToken,
  putUserAdmin,
  deleteUserAccount,
  getUserMail,
  putPasswordUser,
} = require("../controllers/usersController");

router.get("/", getUsers);
router.get("/token", [verifyToken], getUserToken);
router.post("/all", postUsersAll);
router.post("/", postUser);
router.delete("/:id", deleteUser);
router.put("/", [verifyToken], putUser);
router.put("/admin", [verifyTokenAdmin], putUserAdmin);
router.delete("/", [verifyToken], deleteUserAccount);
router.post("/email", [verifyToken], getUserMail);
router.post("/resetpass", putPasswordUser);

module.exports = router;
