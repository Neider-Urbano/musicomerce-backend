const { Router } = require("express");
const categoryRouter = require("./categoryRoutes");
const instrumentsRouter = require("./InstrumentsRoutes.js");

const router = Router();

router.use("/category", categoryRouter);
router.use("/instruments", instrumentsRouter);

module.exports = router;
