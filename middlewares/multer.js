const multer = require("multer");

const multerUpload = multer({
    limits:{fileSize : 1024 * 1024 * 5},
    storage: multer.memoryStorage(),
});


module.exports.singleAvatar = multerUpload.single("avatar");

module.exports.attachmentsMulter = multerUpload.array("files",5);