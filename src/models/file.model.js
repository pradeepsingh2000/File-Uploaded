const mongoose = require('mongoose');


const fileSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      trim: true,
      required:true

    },
    fileDescription: {
      type: String,
      trim: true,    
    },
    size: {
      type: String,
      trim: true,
      default:0,
    },
    file: {
        type:String,
        required:true
    },
    fileType :{
      type:String,
      
    }
  },
  {
    timestamps: true,
  }
);

const fileModel = mongoose.model('files', fileSchema);
module.exports = fileModel;
