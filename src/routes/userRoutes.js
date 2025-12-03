const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const upload = require('../middleware/multer');


router.post('/signup',upload.single('profileImage'), userController.signup);
router.post('/login', userController.login);
router.get('/users', userController.getAllUser);
router.get('/export-excel', userController.exportsUsersToExcel);
router.get('/users/:id', userController.getOneUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
