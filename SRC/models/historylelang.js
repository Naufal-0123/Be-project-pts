"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class historyLelang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      historyLelang.belongsTo(models.masyarakat, {
        as: "masyarakat",
        foreignKey: "userId",
      });
      historyLelang.belongsTo(models.lelang, {
        as: "lelang",
        foreignKey: "lelangId",
      });
      historyLelang.belongsTo(models.barang, {
        as: "barang",
        foreignKey: "barangId",
      });
    }
  }
  historyLelang.init(
    {
      lelangId: DataTypes.INTEGER(11),
      barangId: DataTypes.INTEGER(11),
      userId: DataTypes.INTEGER(11),
      penawaranHarga: DataTypes.INTEGER(20),
    },
    {
      sequelize,
      modelName: "historyLelang",
    }
  );
  return historyLelang;
};
