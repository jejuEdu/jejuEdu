const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_no: {
          type: Sequelize.INTEGER(100),
          autoIncrement: true,
          primaryKey: true,
        },
        id: {
          type: Sequelize.STRING(50),
          primaryKey: true,
        },
        nick: {
          type: Sequelize.STRING(50),
          primaryKey: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        tel: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        good_cnt: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: true,
        },
        bad_cnt: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: true,
        },
        /* 토큰은 오직 cookie에서만 처리하면 될듯하니.. db에는 없어도 되겠다
        refresh_jwt: {
          type: Sequelize.STRING(1000),
          allowNull: true,
        },
        */
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    /*
     * 한명의 유저가 여러개의 스터디에 참여할수있거나 개설할수있는 이유로 hasMany
     */
    //db.User.hasMany(db.Study);
    /**
     * 여러명의 유저가 한 스터디에 속해있을수가 있고 , 그 반대역시 가능하니
     * 양방의 belongsToMany관게로 중계 테이블이 필요하다
     * through 속성으로 AllStudyList를 생성하여 중계테이블을 생성한다
     */
    // db.User.belongsToMany(db.Study, {
    //   through: "AllStudyList",
    // });
  }
};
