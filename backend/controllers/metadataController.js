'use strict';

const { ResearchArea, University, Program, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

// List all research areas
exports.listResearchAreas = async (req, res) => {
  try {
    const areas = await ResearchArea.findAll({
      attributes: ['name'],
      order: [['name', 'ASC']]
    });
    res.json(areas.map((a) => a.name));
  } catch (error) {
    console.error('Error in listResearchAreas:', error);
    res.status(500).json([]);
  }
};

// List all states present in universities table
exports.listStates = async (req, res) => {
  try {
    // We can query distinct states from the universities table
    const states = await sequelize.query(
      'SELECT DISTINCT state FROM universities WHERE state IS NOT NULL ORDER BY state ASC;',
      {
        type: QueryTypes.SELECT
      }
    );
    // states is an array of objects like { state: 'Texas' }
    res.json(states.map((row) => row.state));
  } catch (error) {
    console.error('Error in listStates:', error);
    res.status(500).json([]);
  }
};
