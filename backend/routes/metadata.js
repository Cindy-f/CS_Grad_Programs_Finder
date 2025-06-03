'use strict';

const express = require('express');
const router = express.Router();
const metadataController = require('../controllers/metadataController');

// GET /api/metadata/researchAreas
router.get('/researchAreas', metadataController.listResearchAreas);

// GET /api/metadata/states
router.get('/states', metadataController.listStates);

module.exports = router;
