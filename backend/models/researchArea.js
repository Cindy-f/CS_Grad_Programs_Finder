'use strict';

module.exports = (sequelize, DataTypes) => {
  const ResearchArea = sequelize.define(
    'ResearchArea',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    },
    {
      tableName: 'research_areas',
      timestamps: false
    }
  );

  ResearchArea.associate = (models) => {
    ResearchArea.belongsToMany(models.Program, {
      through: 'program_research_areas',
      foreignKey: 'research_area_id',
      otherKey: 'program_id',
      as: 'Programs'
    });
  };

  return ResearchArea;
};
