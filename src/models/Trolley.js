const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Trolley",
    {
        // buyerAddress: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        //   },
      userId:{
        type:DataTypes.INTEGER(),
        allownull:false
      },
      instrumentId:{
        type:DataTypes.INTEGER(),
        allownull:false
      },
      userStock:{
        type:DataTypes.INTEGER(),
        allownull:false,
        defaultValue:1
      }

    },
    { timestamps: false }
  );
};