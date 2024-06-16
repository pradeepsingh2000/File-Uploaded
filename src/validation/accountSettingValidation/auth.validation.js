const Joi = require('joi');

const userCreate = {
    email: Joi.string().trim().email().max(100).required(),
    fullName: Joi.string().trim().max(50).required(),
    password: Joi.string().required(),
  };

  const signupSchema = Joi.object().keys({
    ...userCreate,
  });

  const loginSchema = Joi.object().keys({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  });

  module.exports = {
    loginSchema,
    signupSchema
  };