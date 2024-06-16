const MESSAGE_CONSTANTS = require("../../constant/message");
const { fileRepository } = require("../../repository/accountSettingRepository");
const responseHandler = require("../../utils/responseHandler");
const { tryCatchFn } = require("../../utils/tryCatchFn");

module.exports.addFile = tryCatchFn(async (req, res, next) => {
  if (req.file) {
    req.body.file = req.file?.path;
    req.body.size = (req.file.size / 1024).toFixed(2);
    req.body.mimeType = req.file.mimetype; 

    if (req.file.mimetype.startsWith('image/')) {
    req.body.fileType = 'image';
  } else if (req.file.mimetype === 'application/pdf') {
    req.body.fileType = 'pdf';
  } else if (req.file.mimetype.startsWith('video/')) {
    req.body.fileType = 'video';
  } else {
    req.body.fileType = 'unknown'; 
  }

  }
  const result = await fileRepository.addFile(req?.body);
  return responseHandler.successResponse(
    res,
    201,
    MESSAGE_CONSTANTS.FILE_CREATE,
    result
  );
});

module.exports.updateFiles = tryCatchFn(async(req,res,next) => {
  if (req.file) {
    req.body.file = req.file?.path;
    req.body.size = (req.file.size / 1024).toFixed(2);
  }
  
  const data = await fileRepository.updateFile(req.params,req.body)
  return responseHandler.successResponse(
    res,
    200,
    MESSAGE_CONSTANTS.FILE_UPDATED_SUCCESSFULLY,
    data
  );
})


module.exports.getFiles = tryCatchFn(async (req, res, next) => {
  const data = await fileRepository.getFile(req.query);
  return responseHandler.successResponse(
    res,
    200,
    MESSAGE_CONSTANTS.SUCCESS,
    data
  );
});


module.exports.deleteFiles = tryCatchFn(async(req,res,next) => {
  const data = await fileRepository.deleteFile(req.body)
return responseHandler.successResponse(
  res,
  200,
  MESSAGE_CONSTANTS.FILE_DELETED,
  data
)
})


