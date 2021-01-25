const multer = require("multer");
const {diskStorage} = require("multer");
const path = require("path");

const uploadImg = multer({
  storage: diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().getTime() + ext);
    },
  }),
  limits: {fileSize: 20 * 1024 * 1024},
});

module.exports = {uploadImg};
