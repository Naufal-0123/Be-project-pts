const express = require("express");
const routers = express.Router();
// const fs = require('fs-extra');
const multer = require("multer");
const { getListUser, createUser, getDetailUserByid, getDetailUserByparams } = require("../controllers/UserController");
const { getListProduk, createProduk, getDetailProdukByid, getDetailProdukByparams} = require("../controllers/ProdukController");
const userValidator = require("../validators/userValidator");
const produkValidator = require("../validators/produkValidator");
const validationResultMid = require("../middleware/validationResault");
const upload = multer({ dest: "public" });

// =========================== produk ========================= //
routers.get("/produk/list", getListProduk);

routers.get("/produk/detail/:id",getDetailProdukByid)

routers.get("/produk/list/:brand",getDetailProdukByparams)

routers.post(
    "/produk/create",
    produkValidator.createProdukValidator,
    validationResultMid,
    createProduk
  );
// =========================== USERS ========================= //
routers.get("/user/list", getListUser);

routers.get("/user/detail/:id",getDetailUserByid)

routers.get("/user/list/:email",getDetailUserByparams)

routers.post(
  "/user/create",
  userValidator.createUserValidator,
  validationResultMid,
  createUser
);

module.exports = routers;
