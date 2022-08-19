const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Raiting",
    {
       
      userId:{
        type:DataTypes.INTEGER(),
        allownull:false
      },
      userName:{
        type:DataTypes.STRING(),
        allownull:false
      },
      instrumentId:{
        type:DataTypes.INTEGER(),
        allownull:false
      },
      comment:{
        type:DataTypes.STRING(),
        allownull:false,
   
      },
      star:{
        type:DataTypes.INTEGER(),
        allownull:false,
      }
    },
    { timestamps: true }
  );
};