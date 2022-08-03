const { Router } = require('express');
const router = Router();
const { Instrument } = require('../db');
const { Category } = require('../db');
const {Op} = require('sequelize');
const { postInstrument, getInstrument } = require("../controllers/InstrumentsController.js");



router.post("/", postInstrument);
router.get("/", getInstrument);



module.exports = router;
