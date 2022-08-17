const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      dni: {
        type: DataTypes.BIGINT,
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
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
          len: [0, 20],
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
      buyerAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rol: {
        type: DataTypes.ENUM("user", "banned"),
        defaultValue: "user",
      },
      history:{
        type:DataTypes.ARRAY(DataTypes.JSONB),
        allowNull:true,
      }
    },
    { timestamps: false }
  );
};
