
const responseHandler = require('../utils/responseHandler')
const { logger } = require('../services/winston.service');
const MESSAGE_CONSTANTS = require('../constant/message');



const tryCatchFn = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      responseHandler.errorResponse(
        res,
        400,
        error.message || MESSAGE_CONSTANTS.SOMETHING_WRONG,
        {error}
      )
      logger.error(typeof error === "Array" ? JSON.stringify(error) : error.stack);
      next(error); 
    });
  };
};

module.exports = { tryCatchFn };