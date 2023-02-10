const ProdukModel = require('../models').produk

async function getListProduk(req, res) {
    try{
        const users = await ProdukModel.findAll();
        res.json({
            status: "Success",
            message: "Data Produk Ditemukan",
            data: users
        })
    } catch (err) {
        res.status(403).json({
            status: "Fail",
            maessage: "Terjadi Kesalahan"
        })
    }
}

//create ke database
async function createProduk(req, res) {
    try{
        const payload = req.body
        let {namaProduk, brand, stok, harga} = payload
        const Produk = await ProdukModel.create({
            namaProduk: namaProduk,
            brand: brand,
            stok: stok,
            harga: harga
        })
        res.status(201).json({
            status: "Success",
            message: "Berhasil Menyimpan"
        })
    } catch(Err){
        res.status(403).json({
            status: "Fail",
            message: "Tidak Berhasil Menyimpan"
        })
    }
    
}

async function getDetailProdukByid(req, res){
    try{
        const {id} = req.params
        const produk = await ProdukModel.findByPk(id)
        if(produk === null){
            res.status(404).json({
                status: "Fail",
                message: "Produk Tidak Ditemukan"
            })
        }
        res.json({
            status: "Success",
            message: "Produk Berhasil",
            data: produk
        })
    } catch (err) {
        res.status(403).json({
            status: "Fail",
            message: "Terjadi Kesalahan"
        })
    }
}
async function getDetailProdukByparams(req, res){
    try{
        const {brand} = req.params
        const produk = await ProdukModel.findOne({
            where: {
                brand: brand
            }
        })
        if(produk === null){
            res.status(404).json({
                status: "Fail",
                message: "Data Tidak Ditemukan"
            })
        }
        res.json({
            status: "Success",
            message: "User Berhasil",
            data: produk
        })
    } catch (err) {
        res.status(403).json({
            status: "Fail",
            message: "Data TIdak Ditemukan"
        })
    }
}

async function UpdateProduk(req, res) {
    try {
      const { id } = req.params;
      const payload = req.body;
      const { namaProduk, brand, stok } = payload;
      const produk = await ProdukModel.findByPk(id);
      if (produk === null) {
        res.status(404).json({
          status: "Fail",
          message: "Produk Tidak Ditemukan",
        });
      }
      // await UserModel.update(
      //     {
      //       nama: nama,
      //       tempatLahir: tempatLahir,
      //       tanggalLahir: tanggalLahir
      //     },
      //     {
      //       where: {
      //         id: id,
      //       },
      //     }
      //   );
      await ProdukModel.update(
        {
          namaProduk,
          brand,
          stok,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.json({
        status: "Success",
        message: "Update Berhasil",
        id: id,
      });
    } catch (err) {
      res.status(403).json({
        status: "Fail",
        message: "Terjadi Kesalahan Diupdate",
      });
    }
  }

  async function deleteProduk(req, res) {
    try {
      const { id } = req.params;
      const produk = await ProdukModel.findByPk(id);
      if (produk === null) {
        res.status(404).json({
          status: "Fail",
          message: "Produk Tidak Ditemukan",
        });
      }
      await ProdukModel.destroy({
        where: {
          id: id,
        },
      });
      res.json({
        status: "Success",
        message: "Delete Berhasil",
      });
    } catch (err) {
      res.status(403).json({
        status: "Fail",
        message: "Terjadi Kesalahan",
      });
    }
  }
module.exports = {getListProduk, getDetailProdukByparams, getDetailProdukByid, createProduk, UpdateProduk, deleteProduk}