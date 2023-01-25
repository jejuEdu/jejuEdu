const express = require('express');
const router = express.Router();

const { count, submit, getTotalSurveyResult } = require('../dao/survey/surveyModule');

// 시작 페이지 (참여자 수 카운팅)
router.get('/count', count);

// 핸드폰 번호 폼 입력하고 제출하는 페이지 (db 에 사용자 데이터-핸드폰 번호 저장)
router.post('/submit', submit);

/**
 * 설문조사 총집계를 Front단으로 넘겨줘서 결과페이지 즉
 * /jejuvoice/result 에 데이터를 뿌려주는 API
 */
router.post('/getTotalSurveyResult', getTotalSurveyResult);

module.exports = router;
