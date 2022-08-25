const { categories } = require("./categories.json");
const { instruments } = require("./instruments.json");
const { users } = require("./users.json");
const { admins } = require("./admin.json");
const { Instrument, Category, User, Admin } = require("./db");

let allData = async () => {
  try {
    const categoryValidation = await Category.findOne({
      where: { id: 1 },
    });
    if (!categoryValidation) {
      await Category.bulkCreate(categories);
      console.log("Categories Users and Admins loaded in db succesfully");
    }

    const instValidation = await Instrument.findOne({
      where: { id: 1 },
    });

    if (!instValidation) {
      await Admin.bulkCreate(admins);
      await User.bulkCreate(users);
      const inst = instruments.map(async (e) => {
        await Instrument.create(e).then(async (x) => {
          const category = e.category;
          let newInstrumentCategory = await Category.findOne({
            where: {
              name: category,
            },
          });
          await x.setCategory(newInstrumentCategory);
        });
      });

      console.log("Instruments loaded in db succesfully");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allData,
};
