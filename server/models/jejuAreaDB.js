const Sequelize = require("sequelize");

module.exports = class jejuAreaDB extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(1200),
        },
        latitude: {
          type: Sequelize.DataTypes.DOUBLE,
          allowNull: false,
        },
        longtitude: {
          type: Sequelize.DataTypes.DOUBLE,
          allowNull: false,
        },
        distance: {
          type: Sequelize.DataTypes.DOUBLE,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "jejuAreaDB",
        tableName: "jejuareadb",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
