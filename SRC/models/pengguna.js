'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pengguna extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pengguna.hasOne(models.identitas, {
        as: "identitas",
        foreignKey: "userId"
      });
      pengguna.hasMany(models.nilai, {
        as: "nilai",
        foreignKey: "userId"
      })
    }
  }
  pengguna.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('guru', 'siswa')
  }, {
    sequelize,
    modelName: 'pengguna',
  });
  return pengguna;
};