const { DataTypes, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "instrument",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("new", "used"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
