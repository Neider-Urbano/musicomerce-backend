const { Router } = require('express');
const authRouter = Router();
const {
    controllerLogin, 
    controllerRegister 
} =require("../controllers/authControllers");

authRouter.post("/register",controllerRegister );

authRouter.post("/login", controllerLogin);

module.exports = authRouter;