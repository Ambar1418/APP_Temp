const express = require('express');
const router = express.Router();
const controller = require('../controllers/competitionController');

// Define explicit routes for Express 5
router.get('/', controller.getCompetitionDetails);
router.get('/:slug', controller.getCompetitionDetails);
router.post('/register', controller.registerUser);
router.post('/submit', controller.submitEntry);
router.post('/reset', controller.resetCompetitionState);
router.post('/reset/:slug', controller.resetCompetitionState);

module.exports = router;
