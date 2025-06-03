'use strict';

module.exports = (sequelize, DataTypes) => {
  const University = sequelize.define(
    'University',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      website_url: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'universities',
      timestamps: true
    }
  );

  University.associate = (models) => {
    University.hasMany(models.Program, {
      foreignKey: 'university_id',
      onDelete: 'CASCADE'
    });
  };

  return University;
};
