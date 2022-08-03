const { Router } = require('express');
const categoryRouter = require('./categoryRoutes');


const router = Router();

router.use('/category', categoryRouter);


module.exports = router;
