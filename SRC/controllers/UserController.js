const UserModel = require('../models').user

async function getListUser(req, res) {
    try{
        const users = await UserModel.findAll();
        res.json({
            status: "Success",
            message: "Data User Ditemukan",
            data: users
        })
    } catch (err) {
        res.status(403).json({
            status: "Fail",
            maessage: "Terjadi Kesalahan"
        })
    }
}

//create data ke database
async function createUser(req, res) {
    try{
        const payload = req.body
        let {nama, email, tempatLahir, tanggalLahir} = payload
        const user = await UserModel.create({
            nama: nama,
            email: email,
            isActive: true,
            tempatLahir: tempatLahir,
            tanggalLahir: tanggalLahir
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


async function getDetailUserByid(req, res){
    try{
        const {id} = req.params
        const user = await UserModel.findByPk(id)
        if(user === null){
            res.status(404).json({
                status: "Fail",
                message: "User Tidak Ditemukan"
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
            message: "Terjadi Kesalahan"
        })
    }
}
async function getDetailUserByparams(req, res){
    try{
        const {email} = req.params
        const user = await UserModel.findOne({
            where: {
                email: email
            }
        })
        if(user === null){
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
module.exports = {getListUser, createUser, getDetailUserByid, getDetailUserByparams}