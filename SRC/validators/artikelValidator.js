const { check } = require("express-validator");
const ArticleModel = require("../models").article;

const createArtikelValidator = [
  check("title")
    .isLength({
      min: 1,
    })
    .withMessage("Title Wajib Di isi"),
  
];

const updateArtikelValidator = [
  check("title")
    .isLength({
      min: 1,
    })
    .withMessage("Title Wajib Di isi"),
];
module.exports = { updateArtikelValidator };
