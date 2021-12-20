const multer = require("multer");
const path = require("path");
//image upload
const storageProfile = multer.diskStorage({
  destination: "../cms-ui/src/assets/gallery/profile",
  filename: (req, file, cb) => {
    cb(null, Date.now()+path.extname(file.originalname));
  },
});
const storageFeed = multer.diskStorage({
  destination: "../cms-ui/src/assets/gallery/feed",
  filename: (req, file, cb) => {
    cb(null, Date.now()+path.extname(file.originalname));
  },
});

const upload = multer({ storage: storageProfile });
const uploadFeed = multer({storage:storageFeed});
module.exports = {upload,uploadFeed };
