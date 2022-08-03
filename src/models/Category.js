const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "category",
    {
      name: {
        type: DataTypes.ENUM("stringed","wind","percussion"),
        unique: true,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
