const dayjs = require('dayjs')
const BarangModel = require('../../models').barang;

async function getListBarang(req, res) {
    try {
        const barang =  await BarangModel.findAndCountAll({
          attributes : {
              exclude:['createdAt','updateAt']
          },
         
      })
        res.json({
          status: 'Success',
          msg: 'Barang Ditemukan',
          data: barang,
        });
      } catch (err) {
        console.log(err);
        res.status(401).json({
          status: 'Fail',
          msg: 'Gagal mendapatkan barang',
          err: err.message,
        });
      }
  }

  async function createBarang(req, res) {
    let now = dayjs();
    try {
      let { namaBarang, deskBarang, hargaAwal } = req.body;
  
      await BarangModel.create({
        namaBarang: namaBarang,
        deskBarang: deskBarang,
        hargaAwal: hargaAwal,
        tgl: now,
      });
      res.status(201).json({
        status: 'Success',
        msg: 'Barang berhasil ditambah',
      });
    } catch (err) {
      res.status(403).json({
        status: 'Fail',
        msg: 'Gagal menambah barang',
        t: now,
        err: err.message,
      });
    }
  }
  
  async function deleteBarang(req, res) {
    try {
      const { id } = req.params;
      const barang = await BarangModel.findByPk(id);
      if (barang === null) {
        res.status(404).json({
          status: 'Fail',
          message: 'barang tidak ditemukan',
        });
      }
      if (barang.id != id) {
        return res.status(422).json({
          status: 'Fail',
          message: "artikel is not belong to you, you can't delete it",
        });
      }
      await BarangModel.destroy({
        where: {
          id: id,
        },
      });
      res.json({
        status: 'Success',
        message: 'Barang berhasil dihapus',
        id: id,
      });
    } catch (error) {
      console.log(error);
      res.status(403).json({
        status: 'Fail',
        message: 'ada kesalahan',
      });
    }
  }

  module.exports = {
    createBarang,
    getListBarang,
    deleteBarang,       
  };
  