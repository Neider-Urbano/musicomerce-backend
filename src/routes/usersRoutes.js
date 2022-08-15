const {verifyToken}=require("../middlewares/authjwt")
const { Router } = require("express");
const router = Router();

const {
    postUser,deleteUser,putUser,
    postUsersAll,getUsers,getUserToken, putUserAdmin
} = require("../controllers/usersController");


router.get("/", getUsers);
router.get("/token",[verifyToken], getUserToken);
router.post("/all", postUsersAll);
router.post("/", postUser);
router.delete("/:id", deleteUser);
router.put("/", [verifyToken], putUser);
router.put("/admin", [verifyToken], putUserAdmin);

module.exports = router;