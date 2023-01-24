const { check } = require("express-validator");
const produkModel = require("../models").produk;

const createProdukValidator = [
  check("namaProduk")
    .isLength({
      min: 1,
    })
    .withMessage("Nama Wajib Di isi"),
  check("brand")
    .isLength()
    .withMessage("Gunakan Nama Brand")
    .custom((value) => {
      return produkModel
        .findOne({
          where: {
            brand: value,
          },
        })
        .then((produk) => {
          if (produk) {
            return Promise.reject("Brand sudah digunakan");
          }
        });
    }),
];
module.exports = { createProdukValidator };
