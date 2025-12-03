const multer = require("multer");
const fs= require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, "..", "uploads");
 
// Auto-create uploads folder
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
} 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req,file,cb) => {
  const allowedType = /jpeg|jpg|png|gif/;
  const extname = allowedType.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedType.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb(new Error('Only images are allowed'));
  }
}

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  //limit of 5mb
    fileFilter: fileFilter
});

module.exports = upload;