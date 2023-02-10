const express = require("express");
const routers = express.Router();
// const fs = require('fs-extra');
const multer = require("multer");
const {
  getListUser,
  createUser,
  getDetailUserByid,
  getDetailUserByparams,
  UpdateUser,
  deleteUser,
} = require("../controllers/UserController");
const {
  getListProduk,
  createProduk,
  getDetailProdukByid,
  getDetailProdukByparams,
  UpdateProduk,
  deleteProduk,
} = require("../controllers/ProdukController");
const userValidator = require("../validators/userValidator");
const produkValidator = require("../validators/produkValidator");
const artikelValidator = require("../validators/artikelValidator");
const validationResultMid = require("../middleware/validationResault");
const {
  register,
  login,
  lupaPassword,
  resetPassword,
} = require("../controllers/authController");
const jwtValidateMid = require("../middleware/JwtValidateMid");
const {
  createArticle,
  UpdateArtikel,
  getListArticle,
  deleteArtikel,
  createArticleBulk,
  createArticleMulti,
  deleteArtikelMulti,
} = require("../controllers/ArticleControllers");
const { updateArtikelValidator } = require("../validators/artikelValidator");
const upload = multer({ dest: "public" });

routers.post("/lupa-password", lupaPassword);
routers.post("/reset-password/:userId/:token", resetPassword);
// =========================== produk ========================= //
routers.get("/produk/list", getListProduk);

routers.delete("/produk/delete/:id", deleteProduk);

routers.get("/produk/detail/:id", getDetailProdukByid);

routers.get("/produk/list/:brand", getDetailProdukByparams);

routers.put(
  "/produk/update/:id",
  UpdateProduk,
  produkValidator.updateProdukValidator,
  validationResultMid
);

routers.post(
  "/produk/create",
  produkValidator.createProdukValidator,
  validationResultMid,
  createProduk
);

// =========================== REGISTER & LOGIN ========================= //
routers.post("/login", login);
routers.post("/register", register);

// =========================== IMPLEMENTASI JWT MIDDLEWARE ========================= //
routers.use(jwtValidateMid);

// =========================== USERS ========================= //
routers.get("/user/list", getListUser);

routers.delete("/user/delete/:id", deleteUser);

routers.get("/user/detail/:id", getDetailUserByid);

routers.get("/user/list/:email", getDetailUserByparams);

routers.put(
  "/user/update/:id",
  UpdateUser,
  userValidator.updateUserValidator,
  validationResultMid
);

routers.post(
  "/user/create",
  userValidator.createUserValidator,
  validationResultMid,
  createUser
);

// =========================== ARTICLE ========================= //
routers.get("/artikel/list", getListArticle);

routers.post("/create/artikel", createArticle);

routers.post("/artikel/bulk", createArticleBulk);
routers.post("/artikel/multi", createArticleMulti);
routers.delete("/artikel/delete/multi", deleteArtikelMulti)
routers.delete("/artikel/delete/:id", deleteArtikel);

routers.put(
  "/artikel/update/:id",
  UpdateArtikel,
  artikelValidator.updateArtikelValidator,
  validationResultMid
);
module.exports = routers;
