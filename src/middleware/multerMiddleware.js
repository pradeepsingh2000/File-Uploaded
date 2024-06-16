const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define the upload directory
const uploadDir = process.env.UPLOAD_DIR ?? 'public';

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Ensure parent directories are created
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

const mediaUpload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.fieldname === "file" ||
      file.fieldname === "image"
    ) {
      
      const allowedMimeTypes = [
        "image/png",
        "image/jpg",
        "image/svg",
        "image/svg+xml",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
        "video/mp4",
        "video/mpeg",
        "video/quicktime",
        "video/x-msvideo",
        "video/x-ms-wmv",
        "video/x-matroska"
      ];
     
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        return cb(null, false);
      }
    }
   
  },

});

module.exports = mediaUpload;
