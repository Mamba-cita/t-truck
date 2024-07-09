const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Route to get moves with optional filters
router.get('/', dashboardController.getMoves);

// Route to download filtered moves as a CSV file
router.get('/download', dashboardController.downloadMovesCSV);

module.exports = router;