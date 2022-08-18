const { Instrument, Category } = require("../db.js");
const { Op } = require("sequelize");

const postInstrument = async (req, res, next) => {
  const { name, brand, price, img, description, stock, status, category } =
    req.body;

  const nameUpperCase = name.split(" ");
  for (let i = 0; i < nameUpperCase.length; i++) {
    nameUpperCase[i] =
      nameUpperCase[i][0].toUpperCase() + nameUpperCase[i].substr(1);
  }
  const finalName = nameUpperCase.join(" ");

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
        name: finalName,
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
        where: { name: { [Op.iLike]: `%${name}%` } },
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
  const { id } = req.body;
  try {
    if (id) {
      const deleteInstrument = await Instrument.findByPk(id);
      if (!deleteInstrument) {
        throw new TypeError("Error, instrument not found with this Id");
      }
      deleteInstrument.isBanned = true;
      await deleteInstrument.save();
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
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const putInstrument = async (req, res, next) => {
  try {
    const {
      id,
      name,
      brand,
      price,
      img,
      description,
      stock,
      status,
      category,
      isBanned
    } = req.body;

    if (
      !id ||
      !name ||
      !brand ||
      !price ||
      !img ||
      !description ||
      !stock ||
      !status ||
      !category||
      !isBanned
    )
      throw new TypeError("data sent incorrectly");

    let instrument = await Instrument.findByPk(parseInt(id));
    if (!instrument) throw new TypeError("incorrect id");
    await instrument.update({
      name,
      brand,
      price: parseInt(price),
      img,
      description,
      stock: parseInt(stock),
      status,
    });
    let newInstrumentCategory = await Category.findOne({
      where: {
        name: category,
      },
    });
    console.log(newInstrumentCategory);
    if (!newInstrumentCategory)
      throw new TypeError("category sent incorrectly");
    instrument.setCategory(newInstrumentCategory);

    instrument.save();
    res.status(200).send("successfully edited");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postInstrument,
  getInstrument,
  deleteInstrument,
  getIdInstrument,
  putInstrument,
};
