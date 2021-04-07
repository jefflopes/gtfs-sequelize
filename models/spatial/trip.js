var util = require('../../lib/util')

module.exports = function(sequelize, DataTypes) {
  var Trip = sequelize.define(util.getTablePrefix + "trip", {
    route_id: {
      type: DataTypes.STRING(255),
      references: {
        model: util.makeModelReference(sequelize, util.getTablePrefix + "route"),
        key: "route_id"
      }
    },
    service_id: {
      type: DataTypes.STRING(255),
      references: {
        model: util.makeModelReference(sequelize, util.getTablePrefix + "calendar"),
        key: "service_id"
      }
    },
    trip_id: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    trip_headsign: DataTypes.STRING(255),
    trip_short_name: DataTypes.STRING(100),
    direction_id: DataTypes.INTEGER,
    block_id: DataTypes.STRING(255),
    shape_id: {
      type: DataTypes.STRING(255),
      references: {
        model: util.makeModelReference(sequelize, util.getTablePrefix + "shape_gis"),
        key: "shape_id"
      }
    },
    wheelchair_accessible: DataTypes.INTEGER,
    bikes_allowed: DataTypes.INTEGER
  }, util.makeTableOptions(sequelize, {
    freezeTableName: true,
    classMethods: {
      associate: function (models) {

        Trip.belongsTo(models.route, {
          foreignKeyContraint: true,
          foreignKey: "route_id"
        });

        Trip.belongsTo(models.calendar, {
          foreignKeyContraint: true,
          foreignKey: "service_id"
        });

        Trip.belongsTo(models.shape_gis, {
          foreignKeyContraint: true,
          foreignKey: "shape_id"
        });

        Trip.hasMany(models.stop_time, {
          foreignKey: 'trip_id'
        });

        Trip.hasMany(models.frequency, {
          foreignKey: 'trip_id'
        });

      }
    }
  }));

  return Trip;
}
