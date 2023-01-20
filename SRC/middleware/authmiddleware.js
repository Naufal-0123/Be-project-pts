function authMiddleware(req, res, next) {
    console.log('header =>', req.headers);
    console.log('AuthMiddleware');
  
    if (req?.headers?.authorization === '123') {
      next();
    } else if  (req?.headers?.authorization === undefined) {
      return res.status(401).json({
        status: 'fail',
        message: 'Kirimkan token',
      });
    } else {
      return res.status(401).json({
        status: 'fail',
        message: 'Token tidak valid',
      });
    }
  }
  
  module.exports = authMiddleware;