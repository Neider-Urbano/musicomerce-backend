const { Router } = require('express');
const categoryRouter = require('./categoryRoutes');
const instrumentRouter = require("./instrumentRouter")


const router = Router();

router.use('/category', categoryRouter);
router.use("/instrument", instrumentRouter);


module.exports = router;
