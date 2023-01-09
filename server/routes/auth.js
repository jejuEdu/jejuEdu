const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Study = require('../models/study');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleWare = require('../dao/auth/authMiddleWare');
const userAgentMiddleWare = require('../dao/userAgent/userAgentMiddleWare');
const {
  modifyPW,
  modifyNickName,
  checkDupId,
  join,
  login,
  payload,
  logout,
  withdrawal,
} = require('../dao/user/userModule');

const { sendVerificationsSMS, verifySMSMsg, getNewPw } = require('../dto/NVsens');
/*
const {
  sendVerificationsSMS,
  verifySMSMsg,
  getNewPw,
} = require("../../../configs/dto/NVsens");
*/
router.get('/message/code', userAgentMiddleWare('/api/auth/message/code'), sendVerificationsSMS);

router.get(
  '/message/verifySMSMsg',
  userAgentMiddleWare('/api/auth/message/verifySMSMsg'),
  verifySMSMsg,
);

/**
 * 비번찾기 "휴대폰 문자"
 * 가입한 휴대폰번호로 임시 비밀번호 발급해야함
 * 1. 비밀번호 10자리 재발급 (알파벳 숫자 섞여서)
 * 2. 재발급한 비밀번호 DB에 업데이트
 * 3. 해당 비밀번호 문자로 전송
 */

router.post('/message/findPW', userAgentMiddleWare('/api/auth/message/findPW'), getNewPw);

/**
 * 비번 변경
 *
 */
router.post('/modifyPW', userAgentMiddleWare('/api/auth/message/modifyPW'), modifyPW);

/**
 * 닉네임 변경
 *
 */
router.post('/modifyNickName', userAgentMiddleWare('/api/auth/modifyNickName'), modifyNickName);

/**
 * 아이디 중복체크만 따로 분리
 */
router.post('/checkDupId', userAgentMiddleWare('/api/auth/checkDupId'), checkDupId);

router.post('/join', userAgentMiddleWare('/api/auth/join'), join);

router.post('/login', userAgentMiddleWare('/api/auth/login'), login);

/**
 * 회원 탈퇴 
 */
router.post('/withdrawal', userAgentMiddleWare('/api/auth/withdrawal'), withdrawal);

/**
 * url : /api/payload
 * 토큰의 유효값을 체크하거나
 * accessToken의 유효시간이 다되었을때 && refreshToken의 유효시간이 덜 되었을때 accessToken을 재발급하는 로직
 * accessToken의 유효시간이 다되었을때 && refreshToken의 유효시간이 다되었을때 client에 특정값을 return하여
 * login페이지로 redirect를 유도하는 로직이 담겨있다
 */
router.get('/payload', userAgentMiddleWare('/api/auth/payload'), authMiddleWare, payload);

router.get('/logout', logout);

module.exports = router;
