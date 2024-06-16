const { jwtTokenVerify } = require('../utils/comman');
const responseHandler = require('../utils/responseHandler')
const authMiddleware = async (req, res, next) => {
    try {
      const token = req.headers.authorization || req.header("Authorization").replace("Bearer ", "");
      if (!token) {
        return responseHandler.errorResponse(
          res,
          401,
          "Unauthorized access",
          []
        );
      }
      const decoded =  jwtTokenVerify(token);
      req.user = decoded
      next();
    } catch (e) {
      res.status(401).send({ e: "Please authenticate" });
    }
  };
  module.exports = authMiddleware;
