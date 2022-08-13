const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Payment",
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
      },
      submit_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_method_types: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      billing_address_collection: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shipping_options: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      line_items: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      success_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cancel_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      billing_details: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
