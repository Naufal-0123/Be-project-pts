const express = require("express");
const path = require("path");
const fs = require("fs");
const authMiddleware = require("../middleware/authmiddleware");
const uploadSingle = require("../../STORAGE/uploadSingle");
const uploadMulti = require("../../STORAGE/uploadMulti");
const routers = express.Router();
// const fs = require('fs-extra');
const multer = require("multer");
const upload = multer({ dest: "public" });

// =========================== GET ========================= //
routers.get("/", (req, res) => {
  res.send("Hello world");
});
routers.get("/user", (req, res) => {
  res.send({
    status: 200,
    message: "Success",
    data: {
      nama: "Dzakwan",
    },
  });
});
// routers.use(authMiddleware)

routers.get("/siswa/:nama", (req, res) => {
  // let nama = req.params.nama;
  let { nama } = req.params;
  let { angkatan, sekolah } = req.query;

  console.log("params =>", req.params);
  console.log("query =>", req.query);

  res.send({
    status: 200,
    message: "Siswa ditemukan",
    data: {
      nama: `${nama}`,
      kelas: `${req.query.kelas}`,
      angkatan: `${angkatan}`,
      sekolah: `${sekolah}`,
    },
  });
});
routers.get("/absensi/:nama", (req, res) => {
  // let nama = req.params.nama;
  let { nama } = req.params;
  let { status, dari_tanggal, sampai_tanggal } = req.query;

  console.log("params =>", req.params);
  console.log("query =>", req.query);

  res.send({
    status: 200,
    data: {
      nama: nama,
      status: status,
      dari_tanggal: dari_tanggal,
      sampai_tanggal: sampai_tanggal,
    },
  });
});
// =========================== POST ========================= //
routers.post("/upload/single", uploadSingle, (req, res) => {
  res.send({
    status: "Success",
    message: "Upload Berhasil",
    file: req.file,
    url: `${req.protocol}://${req.get("host")}/${req.file.filename}`,
  });
});
routers.post("/upload/multi", uploadMulti, (req, res) => {
  const files = req.files;
  const url = files.map((file, index) =>{
    return `${req.protocol}://${req.get('host')}/${req.files[index].filename}`;
  })

  res.send({
    status: 200,
    message: 'Upload Success',
    data: {
      file: req.files,
      fileURL: [
        url
      ]
    },
  });
});

routers.post("/user/create", (req, res) => {
  const payload = req.body;

  res.json({
    status: "Success",
    message: "Latihan Req body",
    payload: payload,
  });
});

routers.post("/", (req, res) => {
  res.send("Hello world");
});
routers.get("/user", (req, res) => {
  res.send({
    status: 200,
    message: "Success",
    data: {
      nama: "Dzakwan",
    },
  });
});
routers.post("/user", (req, res) => {
  const { nama, kelas } = req.body;
  res.send({
    status: 200,
    message: "Success",
    data: {
      nama: nama,
      kelas: kelas,
    },
  });
});

// routers.post('/upload', upload.single('file'), (req, res) => {
//   const file = req.file;

//   if (file) {
//     const target = path.join(__dirname, 'public', file.originalname);
//     fs.renameSync(file.path, target);
//     res.send({
//       status: 200,
//       message: 'Success, File uploaded',
//     });
//   } else {
//     res.send({
//       status: 400,
//       message: 'Error, File not found',
//     });
//   }
// });

module.exports = routers;
