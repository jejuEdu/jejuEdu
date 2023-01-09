const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res, next) => {
  // 인증 완료
  try {
    // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환
    /**
     * cookie에 그대로 값이 있으니 headers를 까보지않아도 cookie만 탐색하면 될듯하다
     */

    //req.decoded = jwt.verify(req.headers.authorization, key);
    req.decoded = jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET_KEY);
    console.log(req.decoded);
    return next();
  } catch (error) {
    /**
     * accessToken은 유효하지 않은 상태인데 refresh토큰이 유효하다면 아래의 TokenExpiredError이 호출될 이유가 없겠지
     * 그냥 여기서 refresh토큰을 토대로 accessToken을 만들어주면 되니까
     */
    try {
      req.decoded = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET_KEY);
      console.log(`accessToken은 망가졌는데 refresh은 살아있을때 오는 req.decoded값 :\n`);
      console.log(req.decoded);
      /**
       * refreshToken은 정상이라 하면 refreshToken을 decode해서 해당 데이터들로 새로운 accessToken을 만들어
       * cookie에 넣어주면 되겠다
       */
      try {
        res.cookie(
          'accessToken',
          jwt.sign(
            {
              type: 'JWT',
              id: req.decoded.id,
              profile: req.decoded.profile,
            },
            process.env.ACCESS_SECRET_KEY,
            {
              expiresIn: '5m',
              issuer: 'admin',
            },
          ),
          {
            secure: false,
            httpOnly: true,
          },
        );

        next();
      } catch (error) {
        console.log(
          `authMiddleWare에서 refreshToken이 유효한 상태에서 accessToken재발행시 에러발생 : ${error}`,
        );
        return res.status(500).json({
          code: 500,
          message: `authMiddleWare에서 refreshToken이 유효한 상태에서 accessToken재발행시 에러발생 error : ${error}`,
        });
      }

      /** 구간체크 */
    } catch (error) {
      /**
       * refreshToken과 accessToken둘다 유효하지않다면 새로 만들어주는게 아니라 로그인을 다시하게 해야하는게 맞다고 판단된다
       * 고로 client단에선 특정 키워드를 response로 받아서 경로를 redirect하는게 맞을듯한데.. 상의를 해봐야겠다
       */
      console.log(`authMiddleWare에서 에러발생 : ${error}`);
      /**
       * 인증 실패
       * 유효시간이 초과된 경우인데 refreshToken까지 만료가 되었다면...
       */

      if (error.name === 'TokenExpiredError') {
        return res.status(419).json({
          code: 419,
          message: `토큰이 만료되었습니다. error : ${error}`,
        });
      }
      // 토큰의 비밀키가 일치하지 않는 경우
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          code: 401,
          message: `유효하지 않은 토큰입니다. error : ${error}`,
        });
      }
    }
    /** 구간체크 */
  }
};
