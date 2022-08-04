const { Router } = require("express");
const router = Router();

const { Instrument } = require("../db");
const { Category } = require("../db");
const { Op } = require("sequelize");
const {
  postInstrument,
  getInstrument,
  deleteInstrument,
  getIdInstrument,
  putInstrument
} = require("../controllers/InstrumentsController.js");


router.post("/", postInstrument);
router.get("/", getInstrument);
router.delete("/:id", deleteInstrument);
router.get("/:id", getIdInstrument);
router.put("/",putInstrument);




module.exports = router;
