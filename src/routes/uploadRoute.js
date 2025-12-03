const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const upload = require("../middleware/multer");

router.post("/upload", upload.single("myfile"), uploadController.uploadFile);
router.post("/upload-multiple", upload.array("myfiles", 3), uploadController.uploadMultiple);
router.post('/upload-Feilds', upload.fields([{ name: 'profilePic', maxCount: 6 }, { name: 'document' }]), uploadController.uploadFeilds);
module.exports = router;
