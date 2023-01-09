const express = require('express');
const { User, Study } = require('../models');
const path = require('path');
const router = express.Router();
const userAgentMiddleWare = require('../dao/userAgent/userAgentMiddleWare');
const authMiddleWare = require('../dao/auth/authMiddleWare');
const { viewDetailStudyNo } = require('../dao/page/pageModule');

router.post(
  '/api/viewDetail/:study_no',
  userAgentMiddleWare('/viewDetail/:study_no'),
  viewDetailStudyNo,
);

router.get('/', userAgentMiddleWare('/'), authMiddleWare, (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  } catch (e) {
    console.log(`sendfile Error ${e}`);
  }
  return;
});

module.exports = router;
