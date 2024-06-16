
// const authMiddleware = require('./auth.middleware');
// const userMiddleware = require('./user.middleware');
// const resourceAccessMiddleware = require('./resourceAccess.middleware');
const validateMiddleware = require('./validator');
const authMiddleware = require('./authMiddleware');
const authorizeMiddleware = require('./authorizeMiddleware');
module.exports = {
    validateMiddleware,
    authMiddleware,
    authorizeMiddleware
    // multerMiddleware,
  };
  