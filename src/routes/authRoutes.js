const { Router } = require('express');
const authRouter = Router();
const {controllerLogin, controllerRegister, controllerLoginGoogle } =require("../controllers/authControllers");

authRouter.post("/register",controllerRegister );
authRouter.post("/login", controllerLogin);
authRouter.post("/login/google", controllerLoginGoogle);



module.exports = authRouter;