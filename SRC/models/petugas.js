"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class petugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      petugas.hasOne(models.lelang, {
        as: "lelang",
        foreignKey: "petugasId",
      });
      petugas.belongsTo(models.level, {
        as: "level",
        foreignKey: "id",
      });
    }
  }
  petugas.init(
    {
      namaPetugas: DataTypes.STRING(25),
      username: DataTypes.STRING(25),
      password: DataTypes.STRING(25),
      levelId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "petugas",
    }
  );
  return petugas;
};
