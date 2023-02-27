const MasyarakatModel = require("../../models").masyarakat;

async function getListMasyarakat(req, res) {
    try {
      const users = await MasyarakatModel.findAll();
      res.json({
        status: "Success",
        message: "Data Masyarakat Ditemukan",
        data: users,
      });
    } catch (err) {
      res.status(403).json({
        status: "Fail",
        maessage: "Terjadi Kesalahan",
      });
    }
  }
  
  module.exports = {
    getListMasyarakat,
  };
  