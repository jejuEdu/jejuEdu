const express = require('express');
const router = express.Router();

const { getReport } = require('../dao/openai/openAiModule');

router.post('/getReport', getReport);

module.exports = router;
