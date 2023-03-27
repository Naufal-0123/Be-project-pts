const { check } = require("express-validator");
const masyarakatModel = require("../models").masyarakat;
const petugasModel = require("../models").petugas
const barangModel = require("../models").barang

const loginValidator = [
  check("username")
  .isLength({
    min: 1,
  })
    .withMessage("Username Wajib Diisi")
    .custom((value) => {
      return masyarakatModel && petugasModel
        .findOne({
          where: {
            username: value,
          },
        })
    }),
  check("password") .isLength({
      min: 1,
    }).withMessage("Password Wajib Diisi"),
];

const createBarangValidator = [
  check("namaBarang")
  .isLength({
    min: 1,
  })
    .withMessage("Nama Barang Wajib Diisi")
    .custom((value) => {
      return barangModel
        .findOne({
          where: {
            namaBarang: value,
          },
        })
    }),
  check("deskBarang") .isLength({
      min: 1,
    }).withMessage("Deskripsi Barang Wajib Diisi"),
    check("hargaAwal") .isLength({
      min: 1,
    }).withMessage("Harga Barang Wajib Diisi"),
];



const createMasyarakatValidator = [
  check("namaLengkap")
    .isLength({
      min: 1,
    })
    .withMessage("Nama Lengkap Wajib Diisi"),
  check("username")
  .isLength({
    min: 1,
  })
    .withMessage("Nama Wajib Diisi")
    .custom((value) => {
      return masyarakatModel
        .findOne({
          where: {
            username: value,
          },
        })
        .then((username) => {
          if (username) {
            return Promise.reject(
              "Username Sudah Ada Silahkan Gunakan Username Lain"
            );
          }
        });
    }),
  check("password") .isLength({
      min: 1,
    }).withMessage("Password Wajib Diisi"),
  check("telp").isLength({
      min: 1,
    }).withMessage("No Handphone Wajib Diisi"),
];


const createPetugasValidator = [
  check("namaPetugas")
    .isLength({
      min: 1,
    })
    .withMessage("Nama Petugas Wajib Diisi"),
  check("username")
  .isLength({
    min: 1,
  })
    .withMessage("Nama Wajib Diisi")
    .custom((value) => {
      return petugasModel
        .findOne({
          where: {
            username: value,
          },
        })
        .then((username) => {
          if (username) {
            return Promise.reject(
              "Username Sudah Ada Silahkan Gunakan Username Lain"
            );
          }
        });
    }),
  check("password") .isLength({
      min: 1,
    }).withMessage("Password Wajib Diisi"),
];

module.exports = { loginValidator, createBarangValidator, createMasyarakatValidator, createPetugasValidator };