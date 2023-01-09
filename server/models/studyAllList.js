const Sequelize = require("sequelize");

module.exports = class StudyAllList extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        study_no: {
          type: Sequelize.INTEGER(100),
          primaryKey: true,
        },
        user_no: {
          type: Sequelize.INTEGER(100),
          primaryKey: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "StudyAllList",
        tableName: "studyAllLists",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
