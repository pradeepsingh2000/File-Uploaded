const Router = require("express");
const accountSettingRouteIndex = require("./accountSettingRoutes/index");
const router = Router();

const register = (app) => {
  
  app.use(router);
  router.use("/api", [accountSettingRouteIndex]);

  app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    res.status(error.status).json({
      success: false,
      data: null,
      error,
      message: error.message,
    });
  });

  // error response handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  });
};
module.exports = register;
