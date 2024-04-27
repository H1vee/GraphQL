const express = require ('express');
const router = express.Router();
const rentalsController = require('../controllers/rentals.controller');

router.get('/',rentalsController.getAllRentals);
router.post('/',rentalsController.createRental);
router.delete('/:id',rentalsController.deleteRental);

module.exports = router;
