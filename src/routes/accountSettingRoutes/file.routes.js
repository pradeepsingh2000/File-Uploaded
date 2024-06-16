const { Router } = require('express');
const { addFile, getFiles, updateFiles, deleteFiles } = require('../../controller/accountSettingController/file.controller.');
const mediaUpload = require('../../middleware/multerMiddleware');
const fileValidation = require('../../validation/accountSettingValidation/file.validation');
const { validateMiddleware, authMiddleware, authorizeMiddleware } = require('../../middleware');
const router = Router();


router.post('/file',authMiddleware ,authorizeMiddleware,mediaUpload.single('file'), validateMiddleware(fileValidation.fileSchema),addFile);
router.put('/file/:id',authMiddleware,authorizeMiddleware, mediaUpload.single('file'),updateFiles)
router.get('/file',authMiddleware, getFiles)
router.post('/filedelete',authMiddleware ,authorizeMiddleware,deleteFiles)

module.exports = router;
