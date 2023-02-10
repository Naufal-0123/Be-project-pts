const UserModel = require("../models").user;
const forgotPasswords = require("../models").password
const sendEmailHandle = require("../mail/index")
const bcrypt = require("bcrypt");
const crypto = require('crypto')
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
require('dotenv').config()
async function register(req, res) {
  try {
    const payload = req.body;
    const { nama, email, password } = payload;
    let hashPassword = await bcrypt.hashSync(password, 10);
    await UserModel.create({
      nama,
      email,
      password: hashPassword,
    });
    res.json({
      status: "Success",
      message: "Register Berhasil",
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      maessage: "Terjadi Kesalahan",
    });
  }
}
async function login(req, res) {
  try {
    const payload = req.body;
    const { email, password } = payload;
    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (user === null) {
      return res.status(422).json({
        status: "fail",
        message: "Email Tidak Ditemukan, Silahkan Register",
      });
    }
    if (password === null) {
      return res.status(422).json({
        status: "fail",
        message: "Email Dan Password Tidak Cocok",
      });
    }
    // const verify = await bcrypt.compareSync(password, user.password);
    // if (verify === false) {
    //   return res.status(422).json({
    //     status: "fail",
    //     message: "Email Dan Password Tidak Cocok",
    //   });
    // }
    const token = jwt.sign(
      {
        id: user?.id,
        name: user?.nama,
        email: user?.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.json({
      status: "Success",
      message: "Login Berhasil",
      token: token,
      data: user
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "Fail",
      maessage: "Terjadi Kesalahan",
    });
  }
}

async function lupaPassword(req, res) {
  try {
    const { email } = req.body;
    //cek apakah user dengan email tsb terdaftar
    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    //jika tidak terdaftar berikan response dengan msg email tidak terdaftar
    if (user === null) {
      return res.status(422).json({
        status: "fail",
        message: "Email Tidak Ditemukan, Silahkan Gunakan Email Yang Terdaftar",
      });
    }
    // cek apakah token sudah pernah dibuat pada user tsb di table forgot password
    const currentToken = await forgotPasswords.findOne({
      where: {
        userId: user.id,
      },
    });
    // sudah hapus
    if(currentToken != null) {
      await forgotPasswords.destroy({
        where: {
          userId:user.id
        }
      })
    }
    // jika belum buat token
    const token = crypto.randomBytes(32).toString("hex");
    const date = new Date();
    const expire = date.setHours(date.getHours() + 1);

    await forgotPasswords.create({
      userId: user.id,
      token: token,
      expireDate: dayjs(expire).format('DD/MM/YYYY HH:mm:ss')
    })

    const context = {
      link: `${process.env.MAIL_CLIENT_URL}/lupa-password/${user.id}/${token}`,
    };
    const sendEmail = await sendEmailHandle(email, 'Lupa Password', 'resetPassword', context);
    if(sendEmail === "success"){
      res.json({
        status: 'success',
        msg: 'Silahkan Cek Email Anda',
      });
    } else {
      res.status(404).json({
        status: 'Fail',
        msg: 'Gunakan Email Yang Terdaftar',
      });
    }
    
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: 'error 403',
      msg: 'Terjadi Kesalahan',
    });
  }
}

async function resetPassword(req, res) {
  try {
    let { newPassword } = req.body;
    let { userId, token } = req.params;
    const currentToken = await forgotPasswords.findOne({
      where: { userId: userId, token: token },
    });

    const user = await UserModel.findOne({
      where: {
        id: userId,
      },
    });

    if (currentToken === null) {
      res.status(403).json({
        msg: 'token invalid',
      });
    } else {
      // const date = new Date();
      // let date1 = dayjs(currentToken.expiredDate);
      // let date2 = dayjs(date);
      // let difference = date2.diff(date1, 'hour');

      let userExpired = currentToken.expiredDate;
      let expire = dayjs(Date());
      let difference = expire.diff(userExpired, 'hour');
      if (difference !== 0) {
        res.json({
          status: 'Fail',
          msg: 'Token has expired',
        });
      } else {
        let hashPassword = await bcrypt.hash(newPassword, 10);
        await UserModel.update(
          { password: hashPassword },
          {
            where: {
              id: user.id,
            },
          }
        );
        await forgotPasswords.destroy({ where: { token: token } });
        res.json({
          status: '200 OK',
          msg: 'password updated',
        });
      }
    }
  } catch (err) {
    console.log('err', err);
    res.status(403).json({
      status: 'error 403',
      msg: 'ada error',
      err: err,
      // token: currentToken
    });
  }
}
module.exports = { register, login, lupaPassword, resetPassword };