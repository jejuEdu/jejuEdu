const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const Study = require('../../models/study');
const router = express.Router();
const jwt = require('jsonwebtoken');

module.exports = {
  modifyPW: async (req, res, next) => {
    try {
      const { id, newPw, pw } = req.body;
      const exUser = await User.findOne({ where: { id: id } });
      const Flag = await bcrypt.compare(pw, exUser.dataValues.password);
      console.log(Flag);
      if (Flag) {
        console.log(`newPw=${newPw}, pw=${pw}`);
        if (pw !== newPw) {
          await User.update({ password: await bcrypt.hash(newPw, 12) }, { where: { id: id } });
          res.status(200).json({
            code: 200,
            message: '비밀번호 변경 성공',
          });
        } else {
          console.log(`pw=${pw}, newPw=${newPw}`);
          res.status(203).json({
            code: 203,
            message: '현재 비밀번호와 수정하려는 비밀번호가 같습니다.',
          });
        }
      } else {
        res.status(202).json({
          code: 202,
          message: '현재 비밀번호 인증 실패',
        });
      }
    } catch (e) {
      res.status(500).json({
        code: 500,
        message: `비밀번호 변경 중 서버 내 알 수 없는 에러발생 ${e}`,
      });
    }
  },

  modifyNickName: async (req, res, next) => {
    try {
      const { newNickName, nickName } = req.body;

      if (nickName !== newNickName) {
        const Flag = await User.update({ nick: newNickName }, { where: { nick: nickName } });

        if (Flag[0] == 0) {
          return res.status(405).json({
            code: 405,
            message: '존재하지 않는 닉네임입니다',
          });
        }
        return res.status(200).json({
          code: 200,
          message: '닉네임 변경 성공',
        });
      }

      return res.status(203).json({
        code: 203,
        message: '현재 닉네임과 수정하려는 닉네임이 같습니다.',
      });
    } catch (e) {
      return res.status(500).json({
        code: 500,
        message: `닉네임 변경 중 서버 내 알 수 없는 에러발생 ${e}`,
      });
    }
  },

  checkDupId: async (req, res, next) => {
    /**
     * 회원가입 시 비밀번호 암호화
     */
    try {
      const { id } = req.body;
      const exUser = await User.findOne({ where: { id: id } });
      if (exUser) {
        res.status(201).json({
          code: 201,
          message: '아이디 중복입니다',
        });
      } else {
        console.log(`아이디 중복체크 여부${exUser}`);
        res.status(200).json({
          code: 200,
          message: '사용 가능한 아이디입니다',
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: `아이디 중복체크 시도중 에러발생 ${error}`,
      });
      return next(error);
    }
  },

  join: async (req, res, next) => {
    const result = {};
    /**
     * 회원가입 시 비밀번호 암호화
     */
    try {
      const { id, nick, pw, name, tel = '' } = req.body;
      const hashPw = await bcrypt.hash(pw, 12);
      const exUser = await User.findOne({ where: { id: id } });
      if (exUser) {
        result['success'] = 100;
        result['msg'] = '아이디 중복입니다';
        res.json(result);
        return;
      }
      await User.create({
        id,
        nick: nick,
        password: hashPw,
        name,
        tel: tel,
      });
      console.log(`회원가입 정보\nid : ${id}\npw : ${hashPw}\nname : ${name}\nnick : ${nick}`);
      result['success'] = 200;
      result['msg'] = '회원가입 성공';
      res.json(result);
    } catch (error) {
      result['success'] = 500;
      result['msg'] = `회원가입 실패 error : ${error}`;
      res.json(result);
      console.error(error);
      return next(error);
    }
  },

  login: async (req, res, next) => {
    const { id, pw } = req.body;
    /**
     * 로그인 시 비밀번호 암호화
     */

    let accessToken = '';
    let refreshToken = '';

    try {
      let exUser = await User.findOne({
        where: { id: id },
      });

      if (exUser == null) {
        res.status(403).json({
          code: 403,
          message: 'Failed to Search User',
        });
        return;
      }

      const Flag = await bcrypt.compare(pw, exUser.dataValues.password);

      if (!Flag) {
        res.status(403).json({
          code: 403,
          message: 'Failed to Search User',
        });
        return;
      }

      /**
       * 원래자리
       */
      const { password, createdAt, updatedAt, deletedAt, ...others } = exUser.dataValues;
      if (exUser != null) {
        accessToken = jwt.sign(
          {
            type: 'JWT',
            id: id,
            profile: others,
          },
          process.env.ACCESS_SECRET_KEY,
          {
            expiresIn: '1m',
            issuer: 'admin',
          },
        );

        refreshToken = jwt.sign(
          {
            type: 'JWT',
            id: id,
            profile: others,
          },
          process.env.REFRESH_SECRET_KEY,
          {
            expiresIn: '30m',
            issuer: 'admin',
          },
        );

        /**
         * 만들어진 access, refresh 토큰 전송
         */
        res.cookie('accessToken', accessToken, {
          /**
           * https 와 http의 차이 명시
           * http 사용임으로 false
           */
          secure: false,
          /**
           * javaScript와 http중 어디서 접근이 가능할지 명시
           * javaScript에서 cookie접근이 불가능하게 true
           */
          httpOnly: true,
        });

        res.cookie('refreshToken', refreshToken, {
          secure: false,
          httpOnly: true,
        });

        res.status(200).json({
          code: 200,
          message: 'JWT Token is Created',
          //accessToken: accessToken,
          //refreshToken: refreshToken,
          id: id,
          userInfo: others,
        });
      } else {
        res.status(403).json({
          code: 403,
          message: `Failed to Search User error : ${error}`,
        });
      }
    } catch (error) {
      console.log(`/auth/api/login에서 에러발생 ${error}`);
      res.status(500).json({
        code: 500,
        message: `Failed to create jwt token error : ${error}`,
      });
    }
  },

  payload: (req, res) => {
    return res.status(200).json({
      code: 200,
      message: '토큰이 정상입니다.',
      data: {
        id: req.decoded.id,
        profile: req.decoded.profile,
      },
    });
  },
  logout: (req, res) => {
    try {
      res.cookie('accessToken', '');
      res.cookie('refreshToken', '');
      res.status(200).json({
        code: 200,
        message: 'Logout Success',
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: error,
      });
    }
  },
  withdrawal: async (req, res, next) => {
    try {
      const { id } = req.body;

      if (await User.destroy({ where: { id: id } })) {
        res.status(200).json({
          code: 200,
          message: '회원탈퇴를 완료하였습니다.',
        });
      } else {
        res.status(405).json({
          code: 405,
          message: '존재하지 않는 아이디입니다.',
        });
      }
    } catch (e) {
      return res.status(500).json({
        code: 500,
        message: `회원 탈퇴 중 서버 내 알 수 없는 에러발생 ${e}`,
      });
    }
  },
};
