const { verifyToken } = require("../middlewares/authjwt");
const { verifyTokenAdmin } = require("../middlewares/authjwtAdmin");
const { Router } = require("express");
const router = Router();

const {
  postInstrument,
  getInstrument,
  deleteInstrument,
  getIdInstrument,
  putInstrument,
} = require("../controllers/InstrumentsController.js");

router.post("/",[verifyTokenAdmin], postInstrument);
router.get("/", getInstrument);
router.delete("/",[verifyTokenAdmin], deleteInstrument);
router.get("/:id", getIdInstrument);
router.put("/",[verifyTokenAdmin], putInstrument);

module.exports = router;
