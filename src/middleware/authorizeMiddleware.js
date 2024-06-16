
const authorizeMiddleware = (req, res, next) => {
  try {
    if (req.user.userType == "admin") {
      next();
    } else {
    res.status(403).send({status:false, message: "Unauthorize" });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = authorizeMiddleware;
