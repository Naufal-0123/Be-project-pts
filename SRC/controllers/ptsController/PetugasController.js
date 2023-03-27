const PetugasModel = require("../../models").petugas;

async function getListPetugas(req, res) {
    try {
      const users = await PetugasModel.findAll();
      res.json({
        status: "Success",
        message: "Data Petugas Ditemukan",
        data: users,
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
    getListPetugas,
  };
  