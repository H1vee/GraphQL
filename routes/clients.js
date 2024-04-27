const express = require('express');

const router = express.Router();
const clientController = require('../controllers/client.controller');

router.get('/',clientController.getAllClients);
router.post('/',clientController.createClient);
router.delete('/:id',clientController.deleteClient);

module.exports = router;
