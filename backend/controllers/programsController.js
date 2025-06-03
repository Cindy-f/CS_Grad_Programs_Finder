'use strict';

const { Program, University, ResearchArea } = require('../models');
const { Op } = require('sequelize');

exports.getAllPrograms = async (req, res) => {
  try {
    // Extract filter query params
    const {
      degree_type,
      location_state,
      min_tuition,
      max_tuition,
      research_area,
      deadline_before,
      ranking_below
    } = req.query;

    // Build dynamic WHERE clause
    const whereClause = {};

    if (degree_type) {
      whereClause.degree_type = degree_type; // e.g. 'MS' or 'PhD'
    }

    if (min_tuition || max_tuition) {
      whereClause.tuition_in_state = {};
      if (min_tuition) {
        whereClause.tuition_in_state[Op.gte] = parseInt(min_tuition, 10);
      }
      if (max_tuition) {
        whereClause.tuition_in_state[Op.lte] = parseInt(max_tuition, 10);
      }
    }

    if (deadline_before) {
      whereClause.application_deadline = {
        [Op.lte]: new Date(deadline_before)
      };
    }

    if (ranking_below) {
      whereClause.program_ranking = {
        [Op.lte]: parseInt(ranking_below, 10)
      };
    }

    // Include University and optionally filter by state
    const includeOptions = [
      {
        model: University,
        as: 'University',
        attributes: ['name', 'city', 'state', 'country'],
        where: location_state
          ? { state: location_state }
          : undefined
      }
    ];

    // If filtering by research_area, force an inner join
    if (research_area) {
      includeOptions.push({
        model: ResearchArea,
        as: 'ResearchAreas',
        where: {
          name: { [Op.iLike]: research_area } // case-insensitive match
        },
        through: { attributes: [] },
        attributes: ['name']
      });
    } else {
      // Otherwise, just include all research areas
      includeOptions.push({
        model: ResearchArea,
        as: 'ResearchAreas',
        through: { attributes: [] },
        attributes: ['name']
      });
    }

    const programs = await Program.findAll({
      where: whereClause,
      include: includeOptions,
      order: [['program_ranking', 'ASC']]
    });

    res.json(programs);
  } catch (error) {
    console.error('Error in getAllPrograms:', error);
    res.status(500).json({ message: 'Server error retrieving programs.' });
  }
};
