const NilaiModel = require("../models").nilai;
const { Op } = require("sequelize");
const models = require("../models");
const { checkQuery } = require("../Utils");

async function getListNilai(req, res) {
  const { page, pageSize } = req.query;
  try {
    const nilai = await NilaiModel.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: models.pengguna,
          require: true,
          as: "pengguna",
          attributes: ["id", "nama"],
        },
      ],
    });

    res.json({
      status: "Success",
      message: "Data Nilai Ditemukan",
      data: nilai,
      query: {
        page,
        pageSize,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "Fail",
      maessage: "Terjadi Kesalahan",
    });
  }
}

module.exports = {
  getListNilai,
};
