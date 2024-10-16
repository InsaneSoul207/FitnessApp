const express = require('express');
const router = express.Router();
const labelAnalysisController = require('../controllers/labelAnalysisController');

router.post('/label-analysis', labelAnalysisController.analyze);

module.exports = router;
