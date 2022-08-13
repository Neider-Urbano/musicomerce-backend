require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/musicommerce`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Instrument, Category, User, Admin, Cart, Payment } = sequelize.models;

Admin.hasMany(Instrument);
Instrument.belongsTo(Admin);

User.belongsToMany(Instrument, {
  through: "Favorites",
});
Instrument.belongsToMany(User, {
  through: "Favorites",
});

User.belongsToMany(Instrument, {
  through: "HistoryShop",
});
Instrument.belongsToMany(User, {
  through: "HistoryShop",
});

User.belongsToMany(Instrument, {
  through: "Trolley",
});
Instrument.belongsToMany(User, {
  through: "Trolley",
});

Category.hasMany(Instrument, {
  onDelete: "cascade",
  onUpdate: "cascade",
  hooks: true,
});
Instrument.belongsTo(Category);

Payment.belongsToMany(Cart, { through: "Transaction" });
Cart.belongsToMany(Payment, { through: "Transaction" });

/* User.hasMany(Instrument, {
  onDelete: "cascade",
  onUpdate: "cascade",
  hooks: true,
});
Instrument.belongsTo(User); */

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
