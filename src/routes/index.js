const { Router } = require("express");
const categoryRouter = require("./categoryRoutes");
const instrumentsRouter = require("./InstrumentsRoutes.js");
const usersRouter = require("./usersRoutes.js");

const router = Router();

router.use("/category", categoryRouter);
router.use("/instruments", instrumentsRouter);
router.use("/users", usersRouter);

module.exports = router;
