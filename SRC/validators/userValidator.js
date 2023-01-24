const { check } = require("express-validator");
const userModel = require("../models").user;

const createUserValidator = [
  check("nama")
    .isLength({
      min: 1,
    })
    .withMessage("Nama Wajib Di isi"),
  check("email")
    .isEmail()
    .withMessage("Gunakan Format Email")
    .custom((value) => {
      return userModel
        .findOne({
          where: {
            email: value,
          },
        })
        .then((user) => {
          if (user) {
            return Promise.reject("E-mail sudah digunakan");
          }
        });
    }),
];
module.exports = { createUserValidator };
