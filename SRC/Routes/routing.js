const express = require("express");
const routers = express.Router();
// const fs = require('fs-extra');
const multer = require("multer");

const {
  login,
  registerMasyarakat,
  registerPetugas,
} = require("../controllers/authController");
const {
  createMasyarakatValidator,
  createPetugasValidator,
  createBarangValidator,
  loginValidator,
} = require("../validators/ptsValidator");
const jwtValidateMid = require("../middleware/JwtValidateMid");
const {
  getListMasyarakat,
} = require("../controllers/ptsController/MasyarakatController");
const {
  getListPetugas,
} = require("../controllers/ptsController/PetugasController");
const validationResultMid = require("../middleware/validationResault");
const {
  getListBarang,
  createBarang,
  deleteBarang,
} = require("../controllers/ptsController/BarangController");
const upload = multer({ dest: "public" });

// =========================== REGISTER & LOGIN ========================= //
routers.post("/login", loginValidator, validationResultMid, login);
routers.post(
  "/register/masyarakat",
  createMasyarakatValidator,
  validationResultMid,
  registerMasyarakat
);

routers.post(
  "/register/petugas",
  createPetugasValidator,
  validationResultMid,
  registerPetugas
);

// =========================== IMPLEMENTASI JWT MIDDLEWARE ========================= //
// routers.use(jwtValidateMid.jwtValidateMiddleware);
routers.use(jwtValidateMid.jwtValidateMiddleware);

// =========================== PTS FE & BE ========================= //
routers.get("/list/masyarakat", getListMasyarakat);
routers.get("/list/petugas", getListPetugas);

routers.get("/barang/list", getListBarang);
routers.post(
  "/barang/create",
  createBarangValidator,
  validationResultMid,
  createBarang
);
routers.delete("/barang/delete/:id", deleteBarang);

module.exports = routers;
