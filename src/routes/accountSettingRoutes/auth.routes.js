const { Router } = require('express');
const { login,singup,profile } = require('../../controller/accountSettingController/user.controller');
const authValidation = require('../../validation/accountSettingValidation/auth.validation');
const { validateMiddleware ,authMiddleware, authorizeMiddleware } = require('../../middleware');
const { checkUserEmail, checkUserEmailAlreadyExist } = require('../../utils/comman');
const router = Router();


router.post(
    '/login',
    validateMiddleware(authValidation.loginSchema),
    checkUserEmail,
    login
  );

  router.post(
    '/register',
    validateMiddleware(authValidation.signupSchema),
    checkUserEmailAlreadyExist,
    singup
  );

router.get(
    '/profile',
    authMiddleware,
    profile
)

module.exports = router;
