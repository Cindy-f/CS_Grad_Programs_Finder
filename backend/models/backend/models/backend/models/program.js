'use strict';

module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define(
    'Program',
    {
      program_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      degree_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tuition_in_state: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      tuition_out_of_state: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      program_ranking: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      application_deadline: {
        type: DataTypes.DATE,
        allowNull: true
      },
      avg_gre_score: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      avg_gpa: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true
      },
      funding_options: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      website_url: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: 'programs',
      timestamps: true
    }
  );

  Program.associate = (models) => {
    Program.belongsTo(models.University, {
      foreignKey: 'university_id',
      as: 'University'
    });

    Program.belongsToMany(models.ResearchArea, {
      through: 'program_research_areas',
      foreignKey: 'program_id',
      otherKey: 'research_area_id',
      as: 'ResearchAreas'
    });
  };

  return Program;
};
