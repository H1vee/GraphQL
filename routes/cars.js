const express = require('express');

const router = express.Router();

const carsController = require('../controllers/cars.controller');


router.get('/',carsController.getAllCars);

router.post('/',carsController.createCar);

router.delete('/:id',carsController.deleteCar);

module.exports = router;
