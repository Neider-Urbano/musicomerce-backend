const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Cart",
    {
      price_data: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      adjustable_quantity: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
