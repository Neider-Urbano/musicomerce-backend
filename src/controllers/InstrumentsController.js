const { Instrument, Category } = require("../db.js");
const { Op } = require("sequelize");

const postInstrument = async (req, res, next) => {
  const { name, brand, price, img, description, stock, status, category } =
    req.body;
  try {
    let newInstrumentCategory = await Category.findOne({
      where: {
        name: category,
      },
    });
    if (!newInstrumentCategory) {
      throw new TypeError("Category not found");
    } else {
      let newInstrument = await Instrument.create({
        name,
        brand,
        price,
        img,
        description,
        stock,
        status,
      });
      await newInstrument.setCategory(newInstrumentCategory);
      return res.status(200).json({ message: "Activity successfully added" });
    }
  } catch (error) {
    next(error);
  }
};

const getInstrument = async (req, res, next) => {
  try {
    let name = req.query.name;
    if (name) {
      let instrumentos = await Instrument.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
        include: { model: Category },
      });
      if (instrumentos.length) return res.status(200).send(instrumentos);
      else return res.status(400).send("Instrument " + name + " not found");
    } else {
      let instrumentos = await Instrument.findAll({
        include: { model: Category },
      });
      if (instrumentos.length) return res.status(200).send(instrumentos);
      else return res.status(400).send("No Instruments to show");
    }
  } catch (error) {
    next(error);
  }
};

const deleteInstrument = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const deleteInstrument = await Instrument.destroy({
        where: { id: id },
      });
      if (!deleteInstrument) {
        throw new TypeError("Error, instrument not found with this Id");
      }
      res.status(200).send("Instrument deleted");
    } else {
      throw new TypeError("Error, The Id entered is not valid");
    }
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const getIdInstrument = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const idInstrument = await Instrument.findByPk(id, {
        include: { model: Category },
      });

      idInstrument
        ? res.status(200).send(idInstrument)
        : res.status(404).send(`Id ${id} not found`);
    }
  } catch (error) {
    return res.status(400).send(e.message);
  }
};

module.exports = {
  postInstrument,
  getInstrument,
  deleteInstrument,
  getIdInstrument,
};
