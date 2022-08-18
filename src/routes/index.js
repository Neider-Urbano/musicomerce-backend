const { Router } = require("express");
const categoryRouter = require("./categoryRoutes");
const instrumentsRouter = require("./instrumentsRoutes.js");
const usersRouter = require("./usersRoutes.js");
const authRouter = require("./authRoutes");
const paymentRouter = require("./paymentRoutes");
const adminsRouter = require("./adminRoutes.js");
const trolleyRouter = require("./trolleyRoutes.js");
const mailController = require("./mailRoutes");
const purchaseRoutes = require("./purchaseRoutes")
const router = Router();

router.use("/category", categoryRouter);
router.use("/instruments", instrumentsRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/payment", paymentRouter);
router.use("/admins", adminsRouter);
router.use("/trolley", trolleyRouter);
router.use("/mail", mailController);
router.use("/purchase",purchaseRoutes)

module.exports = router;
