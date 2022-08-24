const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Favorite",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false,
      },
      instruments: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    { timestamps: false }
    )
}