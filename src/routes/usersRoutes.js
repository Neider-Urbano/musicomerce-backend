const { Router } = require("express");
const router = Router();

const {
    postUser,deleteUser,putUser,
    postUsersAll,getUsers,getUserId,
} = require("../controllers/usersController");


router.get("/", getUsers);
router.get("/:id", getUserId);
router.post("/all", postUsersAll);
router.post("/", postUser);
router.delete("/:id", deleteUser);
router.put("/:id", putUser);

module.exports = router;