"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class masyarakat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      masyarakat.hasMany(models.historyLelang, {
        as: "historyLelang",
        foreignKey: "userId",
      });
      masyarakat.hasMany(models.lelang, {
        as: "lelang",
        foreignKey: "userId",
      });
    }
  }
  masyarakat.init(
    {
      namaLengkap: DataTypes.STRING(25),
      username: DataTypes.STRING(25),
      password: DataTypes.STRING(25),
      telp: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "masyarakat",
    }
  );
  return masyarakat;
};
