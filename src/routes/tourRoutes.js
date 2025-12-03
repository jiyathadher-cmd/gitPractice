const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController.js');

router.post('/newtour', tourController.createTour);
router.get('/tour/allTours', tourController.getAllTours);
router.get('/tours/getTour/:id', tourController.getTour);
router.put('/tours/update/:id', tourController.updateTour); 
router.delete('/tours/delete/:id', tourController.deleteTour);

module.exports = router;
