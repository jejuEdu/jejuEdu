const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

dotenv.config({ path: '../.env' });
//dotenv.config({ path: "../../configs/.env" });

const surveyRouter = require('./routes/survey');
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');

const { sequelize } = require('./models');

const app = express();

//app.set("port", process.env.PORT || 443);

app.set('port', process.env.PORT || 80);

/**
 * 설문조사 때만 주석처리
 */
// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log('데이터베이스 연결 성공');
//   })
//   .catch((err) => {
//     console.error(err);
//   });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
//react build파일 접근경로처리
//app.use(express.static(path.join(__dirname, "../client/build")));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
/** client 즉 React서버가 자리잡으면 해당 url만 cors를 허용해줄 예정임
 * app.use(
 *  cors({
 *     origin: "http://:3000",
 *    method: ["GET", "POST"],
 *    credentials: true,
 *  })
 * );
 *
 * 다만 지금은 dev단계이니 모두 허용
 */

app.use(cors());

/**
 * DDos 공격 방어
 * 모든 요청에 대해
 * ip당 1분간 들어오는 request 숫자를 50으로 제한 (1초 간격) -> 확인할 것
 */
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
    delayMs: 1000,
    handler(req, res) {
      res.status(429).json({
        code: 429,
        message: `모든 요청에 대해 1분에 20번만 요청할 수 있습니다.`,
      });
    },
  }),
);

//swagger.js
const { swaggerUi, specs } = require('./modules/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * 설문조사 때만 주석처리
 */
// app.use('/', pageRouter);
// app.use('/api/auth', authRouter);
// app.use('/api', apiRouter);
app.use('/api/survey', surveyRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중...도커 젠킨스 확인 갱신확인겸');
});
