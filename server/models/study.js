const Sequelize = require('sequelize');

module.exports = class Study extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        study_no: {
          type: Sequelize.INTEGER(100),
          autoIncrement: true,
          primaryKey: true,
        },
        user_no: {
          type: Sequelize.INTEGER(100),
          primaryKey: true,
        },
        /**닉네임이 될것임 */
        who_open: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        study_title: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        study_category: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        study_detail_description: {
          type: Sequelize.STRING(2000),
          allowNull: false,
        },
        /**
         * 몇명의 멤버가 모인게 아니라 누가누가 모였는지 다른 테이블에 기록이 필요할듯 고로 멤버 테이블이 따로 필요하게 될것
         * 이거 양방 belongsToMany 관계로 / through 속성으로 해결된듯 멤버 삭제해도 될듯
         * AllStudyList 모델에 다 기록될듯 테이블도 생겨나나?
         */
        current_member_cnt: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        min_member_cnt: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        /*open_date는 createdAt으로 대체될것
        open_date: {
          type: Sequelize.DATEONLY,
        },
        */
        /*close_date는 deletedAt으로 대체될것
        close_date: {
          type: Sequelize.DATEONLY,
        },
        */
        //공부하기로 잡힌 날짜는 따로 기록하는게 맞음으로 study_date는 살린다
        studyAt_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        //좌표를 따로 넣을건데 지역구 네임을 가지는 의미가 있을까 싶다.. 상의해봐야할듯하다
        studyAt_location: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        tmX: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        tmY: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        /* deadLine를 가지면 서버에선 deadline이 지났는지를 주기적으로 어떠한 방식으로든 체크하는 로직이 필요하다
        흠..deadline의 개념이 "한번 스터디를 개설하면 7일 14일내에 만나서 스터디를 하는방식으로 하고, 매일 12시마다 한번씩 체크해서
        기한이 지난 스터디는 쿼리하나로 한꺼번에 삭제하여 deletedAt기록을 남기는게 맞는것같은데.." 상의를 해보자
        */
        deadline: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        status: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        Dday: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Study',
        tableName: 'study',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }

  static associate(db) {
    /**
     * 하나의 스터디에 여러 유저가 몰릴수있으니 당연하게도 hasMany 성립
     */
    //db.Study.hasMany(db.User);
    /**
     * 여러명의 유저가 한 스터디에 속해있을수가 있고 , 그 반대역시 가능하니
     * 양방의 belongsToMany관게로 중계 테이블이 필요하다
     * through 속성으로 AllStudyList를 생성하여 중계테이블을 생성한다
     */
    // db.Study.belongsToMany(db.User, {
    //   through: "AllStudyList",
    // });
  }
};
