const MateriModel = require("../models").materi;
const { Op } = require("sequelize");

async function getListMateriSiswa(req, res) {
  try {
    let {
      keyword,
      page,
      pageSize,
      offset,
      sortBy = "id",
      orderBy = "asc",
    } = req.query;
    
    const materi = await MateriModel.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        [Op.or]: [
          {
            mataPelajaran: {
              [Op.substring]: keyword,
            },
          },
          {
            kelas: {
              [Op.substring]: keyword,
            },
          },
          {
            materi: {
              [Op.substring]: keyword,
            },
          },
        ],
      },
      limit: pageSize,
      offset: offset,
      order: [[sortBy, orderBy]],
    });

    res.json({
      status: 200,
      msg: "Data Ditemukan",
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalData: materi.count,
      },
      data: materi,
      query: {
        page,
        pageSize,
      },
    });
  } catch (err) {
    console.log(err)
    res.status(403).json({
      status: "404 Not Found",
      msg: "Terjadi Kesalahan",
      err
    });
  }
}

async function getListMateriGuru(req, res) {
  const {
    isAll,
    offset,
    page,
    pageSize,
    shortBy = "id",
    orderBy = "desc",
  } = req.query;
  try {
    if (isAll == 'true') {
      const materi = await MateriModel.findAndCountAll();

      res.json({
        status: 200,
        msg: 'Data Ditemukan',
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalData: materi.count,
        },
        data: materi,
        query: {
          page,
          pageSize,
        },
      });
    } else {
      const materi = await MateriModel.findAndCountAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        where: {
          [Op.or]: [
            {
              userId: req.id,
            },
          ],
        },
        limit: pageSize,
        offset: offset,
        order: [[shortBy, orderBy]],
      });
      res.json({
        status: 200,
        msg: 'Data Ditemukan',
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalData: materi.count,
        },
        data: materi,
        query: {
          page,
          pageSize,
        },
      });
    }

  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "Fail",
      message: "Terjadi Kesalahan",
    });
  }
}

async function createMateriMulti(req, res) {
  try {
    let { payload } = req.body;
    let success = 0;
    let fail = 0;
    let jumlah = payload.length;

    if (req.role === "guru") {
      await Promise.all(
        payload.map(async (item, index) => {
          try {
            await MateriModel.create({
              mataPelajaran: item.mataPelajaran,
              kelas: item.kelas,
              materi: item.materi,
              userId: req.id,
            });

            success = success + 1;
          } catch (err) {
            fail = fail + 1;
          }
        })
      );

      res.status(201).json({
        status: "201",
        msg: `Berhasil menambahkan ${success} dari ${jumlah} dan gagal mendelete ${fail}`,
      });
    } else {
      res.status(403).json({
        status: "error",
        msg: "Anda tidak memiliki akses karena role anda adalah siswa",
        r: ` role anda adalah ${req.role}`,
      });
    }
  } catch (err) {
    res.status(403).json({
      status: "error",
      msg: "error creating",
    });
  }
}

async function updateMateri(req, res) {
  try {
    const payload = req.body;
    let { mataPelajaran, materi, kelas, id } = payload;
    const Materi = await MateriModel.findByPk(id);

    if (Materi === null) {
      return res.status(404).json({
        status: 404,
        msg: "Materi not found",
      });
    }

    if (req.role === "guru") {
      if (req.id === Materi.userId) {
        await MateriModel.update(
          { mataPelajaran, materi, kelas },
          {
            where: {
              id: id,
            },
          }
        );
        res.json({
          status: "200 OK",
          msg: "artikel updated",
        });
      } else {
        res.status(403).json({
          status: "error",
          msg: "Anda tidak mengupdate materi ini karena materi ini ditulis oleh guru lain",
        });
      }
    } else {
      res.status(403).json({
        status: "error",
        msg: "Anda tidak memiliki akses karena role anda adalah siswa",
        r: ` role anda adalah ${req.role}`,
      });
    }
  } catch (err) {
    res.status(403).json({
      status: "failed",
      msg: "ada kesalahan update",
    });
  }
}

async function deleteMateriMulti(req, res) {
  try {
    const { payload } = req.body;
    let jumlah = payload.length;
    let success = 0;
    let fail = 0;

    if (req.role === "guru") {
      await Promise.all(
        payload.map(async (items, index) => {
          try {
            const materi = await MateriModel.findOne({
              where: { id: items.id },
            });
            if (materi.userId !== req.id) {
              return (fail = fail + 1);
            }
            await MateriModel.destroy({
              where: { id: items.id },
            });
            success = success + 1;
          } catch (error) {
            fail = fail + 1;
          }
        })
      );
      res.status(200).json({
        status: "Success",
        msg: `Berhasil mendelete ${success} dari ${jumlah} dan gagal mendelete ${fail}`,
      });
    } else {
      res.status(403).json({
        status: "error",
        msg: "Anda tidak memiliki akses karena role anda adalah siswa",
        r: ` role anda adalah ${req.role}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      msg: "Something went wrong",
    });
  }
}

module.exports = {
  getListMateriSiswa,
  getListMateriGuru,
  createMateriMulti,
  deleteMateriMulti,
  updateMateri,
};
