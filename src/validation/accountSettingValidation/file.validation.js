const Joi = require('joi');

const fileSchema = Joi.object().keys({
    fileName: Joi.string().trim().required(),
    fileDescription: Joi.string().trim().required(),
    
  });

  module.exports = {
    fileSchema
  };