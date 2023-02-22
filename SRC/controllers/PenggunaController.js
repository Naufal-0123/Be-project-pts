const PenggunaModel = require("../models").pengguna;
const { Op } = require("sequelize");
const models = require("../models");
const { checkQuery } = require("../Utils");

async function getListPengguna(req, res) {
  const { mapel } = req.query;

  try {
    const pengguna = await PenggunaModel.findAll({
      include: [
        {
          model: models.identitas,
          require: true,
          as: "identitas",
          attributes: ["nama", "alamat"],
        },
        {
          model: models.nilai,
          require: true,
          as: "nilai",
          attributes: ["mapel", "nilai"],
          where: {
            ...(checkQuery(mapel) && {
              mapel: {
                [Op.substring]: mapel,
              },
            }),
          },
        },
      ],
    });
    res.json({
      status: "Success",
      message: "Data Pengguna Ditemukan",
      data: pengguna,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "Fail",
      maessage: "Terjadi Kesalahan",
    });
  }
}

async function getDetailPengguna(req, res) {
  try {
    const { id } = req.params;
    const pengguna = await PenggunaModel.findOne(id);
    if (pengguna === null) {
      res.status(404).json({
        status: "Fail",
        message: "Pengguna Tidak Ditemukan",
      });
    }
    res.json({
      status: "Success",
      message: "Pengguna Berhasil",
      data: pengguna,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "Fail",
      message: "Terjadi Kesalahan",
    });
  }
}

module.exports = {
  getDetailPengguna,
  getListPengguna,
};
