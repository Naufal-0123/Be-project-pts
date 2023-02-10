const ArticleModel = require("../models").article;
const { Op } = require("sequelize");
// async function getListArticle(req, res) {
//   try {
//     const articles = await ArticleModel.findAll({
//       where: {
//         userid: req.id,
//       },
//     });
//     res.json({
//       status: "Success",
//       message: "Data Produk Ditemukan",
//       data: articles,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(403).json({
//       status: "Fail",
//       maessage: "Terjadi Kesalahan",
//     });
//   }
// }

// async function getListArticle(req, res) {
//   const { title, dari_tahun, sampai_tahun } = req.query;
//   try {
//     const articles = await ArticleModel.findAll({
//       attributes: {
//         exclude: ["createdAt", "updatedAt"],
//       },
//       where: {
//         title: {
//           [Op.substring]: title,
//         },
//         year: {
//           [Op.between]: [dari_tahun, sampai_tahun]
//         }
//       },
//     });
//     res.json({
//       status: "Success",
//       message: "Data Article Ditemukan",
//       data: articles,
//       query: {
//         title,
//         dari_tahun,
//         sampai_tahun,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(403).json({
//       status: "Fail",
//       maessage: "Terjadi Kesalahan",
//     });
//   }
// }

async function getListArticle(req, res) {
  const {
    keyword,
    year,
    offset,
    page,
    pageSize,
    shortBy = "id",
    orderBy = "desc",
  } = req.query;
  try {
    const articles = await ArticleModel.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      // where: {
      //   [Op.or]: [
      //     {
      //       title: {
      //         [Op.substring]: keyword,
      //       },
      //     },
      //     {
      //       description: {
      //         [Op.substring]: keyword,
      //       },
      //     },
      //   ],
      //   year: {
      //     [Op.gte]: year
      //   }
      // },
      order: [[shortBy, orderBy]],
      limit: pageSize,
      offset: offset,
    });
    res.json({
      status: "Success",
      message: "Data Article Ditemukan",
      pageMid: {
        currentPage: page,
        pageSize: pageSize,
        totalData: articles.count,
      },
      data: articles,
      query: {
        page,
        pageSize,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "Fail",
      maessage: "Terjadi Kesalahan",
    });
  }
}

async function createArticle(req, res) {
  try {
    const payload = req.body;
    const { title, year, description } = payload;
    await ArticleModel.create({
      title,
      year,
      description,
      userid: req.id,
    });
    res.status(201).json({
      status: "Success",
      mesaage: "Create Article Berhasil",
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      mesaage: "Terjadi Kesalahan",
    });
  }
}

async function createArticleMulti(req, res) {
  try {
    const { payload } = req.body;

    let success = 0;
    let fail = 0;
    let jumlah = payload.length;
    await Promise.all(
      payload.map(async (item) => {
        try {
          await ArticleModel.create({
            title: item.title,
            year: item.year,
            description: item.description,
            userid: req.id,
          });

          success = success + 1;
        } catch (err) {
          fail = fail + 1;
        }
      })
    );

    res.status(201).json({
      status: "Success",
      msg: `Berhasil menambahkan ${success} dari ${jumlah} dan gagal ${fail}`,
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
    });
  }
}

async function deleteArtikelMulti(req, res) {
  try {
    const { payload } = req.body;
    let success = 0;
    let fail = 0;
    let jumlah = payload.length;
    await Promise.all(
      payload.map(async (items, index) => {
        try {
          const title = await ArticleModel.findOne({
            where: { id: items.id },
          });
          if (title.userid !== req.id) {
            // res.status(403).json({
            //   status: "Fail",
            //   msg: `Anda Tidak Bisa MengDelete Karena Ini Milik User Lain`,
            // });
            fail = fail + 1;
          }
          await ArticleModel.destroy({
            where: { id: items.id },
          });
          console.log(items.id);
          console.log(title);
          success = success + 1;
        } catch (error) {
          console.log(error);
        }
      })
    );
    res.status(200).json({
      status: "Success",
      msg: `Berhasil mendelete ${success} dari ${jumlah} dan gagal mendelete ${fail}`,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "Fail",
      mesaage: "Terjadi Kesalahan",
    });
  }
}

async function createArticleBulk(req, res) {
  try {
    // const payload = req.body.payload
    const { payload } = req.body;
    payload.map((item, index) => {
      item.userid = req.id;
    });
    await ArticleModel.bulkCreate(payload);
    res.status(201).json({
      status: "Success",
      mesaage: "Create Article Bulk Berhasil",
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      mesaage: "Terjadi Kesalahan",
    });
  }
}

async function UpdateArtikel(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { title, year, description } = payload;
    const artikel = await ArticleModel.findByPk(id);
    if (artikel === null) {
      res.status(404).json({
        status: "Fail",
        message: "Artikel Tidak Ditemukan",
      });
    }
    if (artikel.userid !== req.id) {
      res.status(403).json({
        status: "Fail",
        message: "Anda Tidak Bisa MengUpdate Karena Ini Milik User Lain",
      });
    }
    await ArticleModel.update(
      {
        title,
        year,
        description,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({
      status: "Succcess",
      message: "Update Berhasil",
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      message: "Terjadi Kesalahan Diupdate",
    });
  }
}

async function deleteArtikel(req, res) {
  try {
    const { id } = req.params;
    const artikel = await ArticleModel.findByPk(id);
    if (artikel === null) {
      res.status(404).json({
        status: "Fail",
        message: "Artikel Tidak Ditemukan",
      });
    }
    if (artikel.userid !== req.id) {
      res.status(403).json({
        status: "Fail",
        message: "Anda Tidak Bisa MengDelete Karena Ini Milik User Lain",
      });
    }
    await ArticleModel.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      status: "Success",
      message: "Delete Berhasil",
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      message: "Terjadi Kesalahan",
    });
  }
}

module.exports = {
  createArticle,
  UpdateArtikel,
  getListArticle,
  deleteArtikel,
  createArticleBulk,
  createArticleMulti,
  deleteArtikelMulti,
};
