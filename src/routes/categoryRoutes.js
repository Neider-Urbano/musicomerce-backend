const { Router } = require("express");
const categoryRouter = Router();
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

categoryRouter.post("/", controllerPost);

categoryRouter.put("/:id", controllerPut);

categoryRouter.delete("/:id", controllerDelete);

module.exports = categoryRouter;
