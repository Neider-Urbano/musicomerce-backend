const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      identificationNumber: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          len: [5, 20],
        },
      },
      email: {
        type: DataTypes.STRING(319),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hash);
        },
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      storeAddress: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      buyerAddress: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      rol: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
    },
    { timestamps: false }
  );
};
