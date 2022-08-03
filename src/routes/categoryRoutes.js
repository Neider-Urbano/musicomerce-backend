const { Router } = require('express');
const categoryRouter = Router();
const {controllerGet, 
    controllerPost, 
    controllerGetId, 
    controllerDelete,
    controllerPut } =require("../controllers/categoryControllers");


categoryRouter.get("/all", controllerGet);

categoryRouter.get("/:id", controllerGetId);

categoryRouter.post("/", controllerPost);

categoryRouter.put("/:id", controllerPut);

categoryRouter.delete("/:id", controllerDelete);



module.exports=categoryRouter