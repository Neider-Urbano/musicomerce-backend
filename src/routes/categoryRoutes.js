const { Router } = require("express");
const categoryRouter = Router();
const {verifyTokenAdmin}=require("../middlewares/authjwtAdmin")

const {
  controllerGet,
  controllerPost,
  controllerGetId,
  controllerGetName,
  controllerDelete,
  controllerPut,
} = require("../controllers/categoryControllers");

categoryRouter.get("/all", controllerGet);

categoryRouter.get("/id/:id", controllerGetId);

categoryRouter.get("/name", controllerGetName);

categoryRouter.post("/",[verifyTokenAdmin], controllerPost);

categoryRouter.put("/",[verifyTokenAdmin], controllerPut);

categoryRouter.delete("/",[verifyTokenAdmin], controllerDelete);

module.exports = categoryRouter;
