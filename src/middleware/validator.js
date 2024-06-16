
const responseHandler = require('../utils/responseHandler')

const middleware = (schema, property) => async (req, res, next) => {
    try {
      const { error } = schema.validate(req[property || 'body']);
      if (!error) {
        next();
      } else {
        const { details } = error;
        let msg = details[0]?.message || 'Validation Error!';
        msg = msg.charAt(1).toUpperCase() + msg.slice(2);
        msg = msg.replace(new RegExp('"', 'g'), '');
         responseHandler.errorResponse(
          res,
          400,
          msg || 'Something went wrong!',
          { error }
        );
      }
    } catch (err) {
    //   return responseHandler.errorResponse(
    //     res,
    //     500,
    //     'Internal Server Error',
    //     null,
    //     err
    //   );
    }
  };
module.exports = middleware;
