const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },

    userType: {
      type: String,
      trim: true,
      required: true,
      enum: ['admin','user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
