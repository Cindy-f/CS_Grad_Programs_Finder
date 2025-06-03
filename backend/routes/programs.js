'use strict';

const express = require('express');
const router = express.Router();
const programsController = require('../controllers/programsController');

// GET /api/programs
router.get('/', programsController.getAllPrograms);

module.exports = router;
