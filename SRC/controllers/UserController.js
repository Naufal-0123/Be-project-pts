const UserModel = require("../models").user;

async function getListUser(req, res) {
  try {
    const users = await UserModel.findAll();
    res.json({
      status: "Success",
      message: "Data User Ditemukan",
      data: users,
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      maessage: "Terjadi Kesalahan",
    });
  }
}

//create data ke database
async function createUser(req, res) {
  try {
    const payload = req.body;
    let { nama, email, tempatLahir, tanggalLahir } = payload;
    const user = await UserModel.create({
      nama: nama,
      email: email,
      isActive: true,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
    });
    res.status(201).json({
      status: "Success",
      message: "Berhasil Menyimpan",
    });
  } catch (Err) {
    res.status(403).json({
      status: "Fail",
      message: "Tidak Berhasil Menyimpan",
    });
  }
}

async function getDetailUserByid(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        message: "User Tidak Ditemukan",
      });
    }
    res.json({
      status: "Success",
      message: "User Berhasil",
      data: user,
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      message: "Terjadi Kesalahan",
    });
  }
}
async function getDetailUserByparams(req, res) {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        message: "Data Tidak Ditemukan",
      });
    }
    res.json({
      status: "Success",
      message: "User Berhasil",
      data: user,
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      message: "Data TIdak Ditemukan",
    });
  }
}

async function UpdateUser(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { nama, tempatLahir, tanggalLahir } = payload;
    const user = await UserModel.findByPk(id);
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        message: "User Tidak Ditemukan",
      });
    }
    // await UserModel.update(
    //     {
    //       nama: nama,
    //       tempatLahir: tempatLahir,
    //       tanggalLahir: tanggalLahir
    //     },
    //     {
    //       where: {
    //         id: id,
    //       },
    //     }
    //   );
    await UserModel.update(
      {
        nama,
        tempatLahir,
        tanggalLahir,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({
      status: "Success",
      message: "Update Berhasil",
      id: id,
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      message: "Terjadi Kesalahan Diupdate",
    });
  }
}
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (user === null) {
      res.status(404).json({
        status: "Fail",
        message: "User Tidak Ditemukan",
      });
    }
    await UserModel.destroy({
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

async function updatePassowordUser(req, res) {
  try {
    const payload = req.body;
    let { email, oldPassword, newPassword } = payload;
    const users = await UserModel.findOne({
      where: {
        email: req.email,
      },
    });

    const verify = await bcrypt.compareSync(oldPassword, users.password);

    if (users === null) {
      return res.json({
        status: 404,
        msg: 'email not found',
      });
    }

    if (verify) {
      let hashPassword = await bcrypt.hash(newPassword, 10);
      await UserModel.update(
        { password: hashPassword },
        {
          where: {
            id: users.id,
          },
        }
      );
      res.json({
        status: '200 OK',
        msg: 'password updated',
      });
    } else {
      res.json({
        msg: 'password lama tidak sesuai',
      });
    }
  } catch (err) {
    console.log('err', err);
    res.status(403).json({
      status: 'failed',
      msg: 'ada kesalahan update password',
      err: err,
    });
  }
}

module.exports = {
  getListUser,
  createUser,
  getDetailUserByid,
  getDetailUserByparams,
  UpdateUser,
  deleteUser,
  updatePassowordUser
};
