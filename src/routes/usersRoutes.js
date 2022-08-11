const {verifyToken}=require("../controllers/authControllers")
const { Router } = require("express");
const router = Router();

const {
    postUser,deleteUser,putUser,
    postUsersAll,getUsers,getUserToken,
} = require("../controllers/usersController");


router.get("/", getUsers);
router.get("/token",[verifyToken], getUserToken);
router.post("/all", postUsersAll);
router.post("/", postUser);
router.delete("/:id", deleteUser);
router.put("/:id", putUser);

module.exports = router;