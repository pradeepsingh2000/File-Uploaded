const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const responseHandler = require('../utils/responseHandler');
const userModel = require('../models/user.model');

module.exports.objectId = (id) => {
    try {
      return new mongoose.Types.ObjectId(id);
    } catch (error) {
      throw Error(error);
    }
  };

  module.exports.passwordEncryption = async (password) => {
    try {
      const salt = await bcrypt.genSalt(); // password encrypt
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw Error(err);
    }
  };

module.exports.validatePasswordEncryption = async (password, newPassword) => {
    try {
      return await bcrypt.compare(password, newPassword);
    } catch (error) {
      throw Error(err);
    }
  };

  module.exports.jwtTokenCreate = (payload) => {
    try {
      return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
      });
    } catch (error) {
      throw Error(err);
    }
  };
  
  module.exports.jwtTokenVerify =   (token) => {
    try {
      return jwt.verify(token, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
      });
    } catch (error) {
      throw Error(error);
    }
  };

  module.exports.checkUserEmail = async (req,res,next) => {
    try {
        const data = await userModel.findOne({email:req.body.email})
        if(data) {
          next()
        }
        else {
          return responseHandler.errorResponse(res,404,'User Not Found Sing-Up First!',[])
        }
    }catch (error) {
      throw Error(error);
    }
  }
  
  module.exports.checkUserEmailAlreadyExist = async (req,res,next) => {
    try {
        const data = await userModel.findOne({email:req.body.email})
        if(data) {
          return responseHandler.errorResponse(res,404,'User already register , please login!',[])

        }
        else {
next()
        }
    }catch (error) {
      throw Error(error);
    }
  }
 
