const express = require('express');
const session = require('express-session');
const StudyAllList = require('../models/studyAllList');
const Study = require('../models/study');
const JejuAreaDB = require('../models/jejuAreaDB');
let { Op } = require('sequelize');
const { route } = require('./page');
const router = express.Router();
const userAgentMiddleWare = require('../dao/userAgent/userAgentMiddleWare');
const authMiddleWare = require('../dao/auth/authMiddleWare');

const {
  getStudyListCode,
  getStudyListSing,
  getStudyListDesign,
  getStudyList,
  getStudyListMineId,
  getStudyListNotMineId,
  openStudy,
  joinStudy,
  closeStudy,
} = require('../dao/study/studyModule');

router.get('/getStudyList/code', userAgentMiddleWare('/api/getStudyList/code'), getStudyListCode);

router.get('/getStudyList/sing', userAgentMiddleWare('/api/getStudyList/sing'), getStudyListSing);

router.get(
  '/getStudyList/design',
  userAgentMiddleWare('/api/getStudyList/design'),
  getStudyListDesign,
);
/**
 * 이거 검색창에 위치기반 검색하면 뜨게하려는것같은데 현석이형이
 * 흠..
 */
router.post(
  '/getStudyList',
  userAgentMiddleWare('/api/getStudyList'),
  authMiddleWare,
  getStudyList,
);

/*
 * 내가 개설한 스터디들만 보기
 */
router.get(
  '/getStudyListMine/:id',
  userAgentMiddleWare('/api/getStudyListMine/:id'),
  authMiddleWare,
  getStudyListMineId,
);

/**
 * 다른사람이 개설한 스터디들만 보기
 */
router.get(
  '/getStudyListNotMine/:id',
  userAgentMiddleWare('/api/getStudyListNotMine/:id'),
  authMiddleWare,
  getStudyListNotMineId,
);

router.post(
  '/openStudy',
  userAgentMiddleWare('/api/openStudy'),
  authMiddleWare,
  openStudy,
  joinStudy,
);

router.post('/joinStudy', userAgentMiddleWare('/api/joinStudy'), authMiddleWare, joinStudy);

router.post('/closeStudy', userAgentMiddleWare('/api/closeStudy'), authMiddleWare, closeStudy);

module.exports = router;
