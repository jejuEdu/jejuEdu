const Sequelize = require("sequelize");

module.exports = class serverLoggingDB extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        idx: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        serverLog: {
          type: Sequelize.STRING(400),
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "serverLoggingDB",
        tableName: "serverloggingdb",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
