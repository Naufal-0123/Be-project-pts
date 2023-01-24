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
            data: user
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
        const {email} = req.params
        const produk = await ProdukModel.findOne({
            where: {
                namaProduk: email
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
            data: user
        })
    } catch (err) {
        res.status(403).json({
            status: "Fail",
            message: "Data TIdak Ditemukan"
        })
    }
}
module.exports = {getListProduk, getDetailProdukByparams, getDetailProdukByid, createProduk}