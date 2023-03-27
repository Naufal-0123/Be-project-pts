const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtValidateMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log(req.headers)
  if (!authorization || authorization === undefined) {
    return res.sendStatus(401);
  }
  const bearerHeader = authorization.split(" ");
  const token = bearerHeader[1];
  console.log("token", token)


  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      console.log(err)
      return res.status(401).json({
        status: "failed",
        err: err,
      });
    } else {
      req.id = decoded.id;
      req.nama = decoded.nama;
      req.email = decoded.email;
      req.role = decoded.role;
      next();
    }
  });
};

module.exports = { jwtValidateMiddleware };
