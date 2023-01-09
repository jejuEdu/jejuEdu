const express = require('express');
const session = require('express-session');
const StudyAllList = require('../../models/studyAllList');
const Study = require('../../models/study');
const JejuAreaDB = require('../../models/jejuAreaDB');
let { Op } = require('sequelize');
//const { route } = require('./page');
const router = express.Router();

const getDateDiff = (date) => {
  var today = new Date();

  return Math.floor(
    Math.abs(
      (new Date(
        today.getFullYear() +
          '-' +
          ('0' + (today.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + today.getDate()).slice(-2),
      ).getTime() -
        new Date(date).getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  ); // 밀리세컨 * 초 * 분 * 시 = 일
};

module.exports = {
  getStudyListCode: async (req, res, next) => {
    try {
      const studyList = await Study.findAll({
        where: {
          [Op.or]: [
            {
              study_category: {
                [Op.like]: `%프로그래밍%`,
              },
            },
          ],
        },
      });

      if (studyList) {
        Array.from(studyList).forEach((item) => {
          let concat = item.studyAt_location.split(' ');
          let result = concat[1] + ' ' + concat[2];
          item.studyAt_location = result;
          item.Dday = getDateDiff(item.studyAt_date);
        });

        res.status(200).json({
          code: 200,
          message: `프로그래밍 관련 스터디 추출 성공`,
          studyList: studyList,
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `프로그래밍 관련 스터디 추출에 관한 서버 에러발생 error : ${error}`,
      });
      return next(error);
    }
  },

  getStudyListSing: async (req, res, next) => {
    try {
      const studyList = await Study.findAll({
        where: {
          [Op.or]: [
            {
              study_category: {
                [Op.like]: `%보컬댄스%`,
              },
            },
          ],
        },
      });

      if (studyList) {
        Array.from(studyList).forEach((item) => {
          Array.from(studyList).forEach((item) => {
            let concat = item.studyAt_location.split(' ');
            let result = concat[1] + ' ' + concat[2];
            item.studyAt_location = result;
            item.Dday = getDateDiff(item.studyAt_date);
          });
        });

        res.status(200).json({
          code: 200,
          message: `보컬댄스 관련 스터디 추출 성공`,
          studyList: studyList,
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `보컬댄스 관련 스터디 추출에 관한 서버 에러발생 error : ${error}`,
      });
      return next(error);
    }
  },

  getStudyListDesign: async (req, res, next) => {
    try {
      //let studyList = await Study.findAll({});
      const studyList = await Study.findAll({
        where: {
          [Op.or]: [
            {
              study_category: {
                [Op.like]: `%디자인%`,
              },
            },
          ],
        },
      });

      if (studyList) {
        Array.from(studyList).forEach((item) => {
          let concat = item.studyAt_location.split(' ');
          let result = concat[1] + ' ' + concat[2];
          item.studyAt_location = result;
          item.Dday = getDateDiff(item.studyAt_date);
        });
      }
      res.status(200).json({
        code: 200,
        message: `디자인 관련 스터디 추출 성공`,
        studyList: studyList,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `디자인 관련 스터디 추출에 관한 서버 에러발생 error : ${error}`,
      });
      return next(error);
    }
  },

  getStudyList: async (req, res, next) => {
    try {
      const { area } = req.body;

      const studyList = await Study.findAll({
        where: {
          [Op.or]: [
            {
              studyAt_location: {
                [Op.like]: `%${area}%`,
              },
            },
          ],
        },
      });
      console.log(studyList);

      if (studyList) {
        for (var i = 0; i < studyList.length; i++) {
          let concat = studyList[i].studyAt_location.split(' ');
          let result = concat[1] + ' ' + concat[2];
          studyList[i].studyAt_location = result;
        }

        res.status(200).json({
          code: 200,
          message: `${area}지역범위 내의 스터디 추출 성공`,
          studyList: studyList,
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `${area}지역범위 내의 스터디 추출에 관한 서버 에러발생 error : ${error}`,
      });
      return next(error);
    }
  },

  getStudyListMineId: async (req, res, next) => {
    const statusList = ['모집중', '인원마감', '진행중', '완료', '종료'];
    /**
     * pdF = passDeadLineFlag
     * psdF = passStudyAtDateFlag
     */
    let pdF = false,
      psdF = false;
    let today = new Date();

    try {
      const studyList = await Study.findAll({
        where: {
          //who_open: req.params.id,
          user_no: req.params.id,
        },
      });

      Array.from(studyList).forEach((item) => {
        if (today > item.deadline || today > item.studyAt_date) {
          item.status = statusList[4];
          return;
        }

        item.status = statusList[item.status];
      });

      res.status(200).json({
        code: 200,
        message: '성공적으로 내가 개설한 스터디 목록 불러오기가 성공했습니다',
        studyListMine: studyList,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `알수없는 에러가 서버내에서 발생했습니다 error : ${error}`,
      });
      return next(error);
    }
  },

  getStudyListNotMineId: async (req, res, next) => {
    const statusList = ['모집중', '인원마감', '진행중', '완료', '종료'];

    /**
     * pdF = passDeadLineFlag
     * psdF = passStudyAtDateFlag
     */
    let pdF = false,
      psdF = false;
    let today = new Date();

    try {
      const studyList = await Study.findAll({
        where: {
          user_no: { [Op.ne]: req.params.id },
        },
      });

      Array.from(studyList).forEach((item) => {
        if (today > item.deadline || today > item.studyAt_date) {
          item.status = statusList[4];
          return;
        }

        item.status = statusList[item.status];
      });

      res.status(200).json({
        code: 200,
        message: '성공적으로 다른 유저가 개설한 스터디 목록 불러오기가 성공했습니다',
        studyListNotMine: studyList,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `알수없는 에러가 서버내에서 발생했습니다 error : ${error}`,
      });
      return next(error);
    }
  },

  openStudy: async (req, res, next) => {
    try {
      const {
        user_no,
        who_open,
        study_title,
        study_category,
        study_detail_description,
        min_member_cnt,
        studyAt_date,
        studyAt_location,
        tmX,
        tmY,
        deadline,
        status,
      } = req.body;

      req.body.user_no = user_no;
      req.body.study_no = (
        await Study.create({
          user_no: user_no,
          who_open: who_open,
          study_title: study_title,
          study_category: study_category,
          study_detail_description: study_detail_description,
          min_member_cnt: min_member_cnt,
          studyAt_date: studyAt_date,
          studyAt_location: studyAt_location,
          tmX: tmX,
          tmY: tmY,
          deadline: deadline,
          status: status,
        })
      ).dataValues.study_no;
      /**
       * 해당 스터디가 내가 개설한것에
       * 첫 개설때 나를 참여시키는 동작인지 아닌지
       * 구분하는 Flag값
       */
      req.body.mineFlag = 1;

      return next();
      /*
      res.status(200).json({
        code: 200,
        message: `스터디 개설 성공`,
      });
      */
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `알수없는 서버내의 이유로 스터디 개설 실패${error}`,
      });
      return next(error);
    }
  },

  /**
   * mineFlag값을 0으로 정해두고
   * 0이면 남의 스터디에 참여하는것이며,
   * 1이면 내 스터디를 개설할때에 내가 참여하는 것
   */
  joinStudy: async (req, res, next) => {
    try {
      const { user_no, study_no, mineFlag = 0 } = req.body;
      const studyInfo = await Study.findOne({ where: { study_no: study_no } });
      console.log('이상한데');
      console.log(studyInfo);

      if (!studyInfo) {
        res.status(404).json({
          code: 404,
          message: `존재하지 않는 스터디입니다 (참여실패)`,
        });
        return;
      }

      /**
       * study의 상태가 모집중( 0 )이 아니라면 더 참가할수가 없겠다
       */
      if (studyInfo.status != 0) {
        res.status(500).json({
          code: 500,
          message: `프론트에서 미리 막아두겠지만 혹시나해서 만든 에러 처리 코드 : 스터디가 모집중인 상태가 아님으로 참여 실패 error : ${error}`,
        });
        return;
      }

      if (studyInfo) {
        await StudyAllList.create({
          study_no: study_no,
          user_no: user_no,
        });
        await Study.increment({ current_member_cnt: 1 }, { where: { study_no: study_no } });
        if (mineFlag) {
          res.status(200).json({
            code: 200,
            message: `스터디 개설 성공`,
          });
        } else {
          res.status(200).json({
            code: 200,
            message: `해당 스터디에 참여 성공`,
            updated_current_member_cnt: studyInfo.current_member_cnt + 1,
          });
        }
      }
    } catch (error) {
      res.status(202).json({
        code: 202,
        message: `이미 참여해있는 스터디입니다 (참여실패) : ${error}`,
      });
      return next(error);
    }
  },

  closeStudy: async (req, res, next) => {
    const { study_no } = req.body;
    try {
      await Study.destroy({ where: { study_no: study_no } });

      res.status(200).json({
        code: 200,
        message: `study delete success`,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `study delete 중 알수없는 에러가 서버내에서 발생 : ${error} 또는 이미 삭제된 데이터일수 있습니다`,
      });
      return next(error);
    }
  },
};
