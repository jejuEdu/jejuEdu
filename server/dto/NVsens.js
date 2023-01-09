/*
 *  네이버 SENS
 *  회원가입 문자인증때문에 사용
 */

const { sens, createRandomNumber, cache } = require("../config/SENSconfig");
/*
const {
  sens,
  createRandomNumber,
  cache,
} = require("../../../configs/config/SENSconfig");
*/
const CryptoJS = require("crypto-js");
const axios = require("axios");
const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  sendVerificationsSMS: async (req, res) => {
    try {
      const { tel } = req.body;
      const user_phone_number = tel.split("-").join("");
      const verificationCode = createRandomNumber(6);
      const date = Date.now().toString();

      //환경변수
      const sens_service_id = sens.serviceId;
      const sens_access_key = sens.accessKey;
      const sens_secret_key = sens.secretKey;
      const sens_call_number = sens.callNumber;

      // url 관련 변수 선언
      const method = "POST";
      const space = " ";
      const newLine = "\n";
      const url = `https://sens.apigw.ntruss.com/sms/v2/services/${sens_service_id}/messages`;
      const url2 = `/sms/v2/services/${sens_service_id}/messages`;

      //암호화
      const hmac = CryptoJS.algo.HMAC.create(
        CryptoJS.algo.SHA256,
        sens_secret_key
      );

      hmac.update(method);
      hmac.update(space);
      hmac.update(url2);
      hmac.update(newLine);
      hmac.update(date);
      hmac.update(newLine);
      hmac.update(sens_access_key);
      const hash = hmac.finalize();

      const signature = hash.toString(CryptoJS.enc.Base64);

      const smsRes = await axios({
        method: method,
        url: url,
        headers: {
          "Contenc-type": "application/json; charset=utf-8",
          "x-ncp-iam-access-key": sens_access_key,
          "x-ncp-apigw-timestamp": date,
          "x-ncp-apigw-signature-v2": signature,
        },
        data: {
          type: "SMS",
          countryCode: "82",
          from: sens_call_number,
          content: `인증번호는 [${verificationCode}] 입니다.`,
          messages: [{ to: `${user_phone_number}` }],
        },
      });

      if (smsRes.data.statusCode == "202") {
        cache.set(user_phone_number, verificationCode);
      } else {
        return res.status(500).json({
          code: 500,
          message: `회원가입 인증 SMS sent 에서 알수없는 서버 에러발생${e} sms server returned Code : ${smsRes.data.statusCode}`,
        });
      }
      return res.status(200).json({ code: 200, message: "SMS sent" });
    } catch (e) {
      console.log(`sms send error : ${e}`);
      return res
        .status(404)
        .json({ code: 404, message: `SMS not sent error : ${e}` });
    }
  },

  verifySMSMsg: (req, res) => {
    try {
      const { tel, SMSMsg } = req.body;

      if (cache.get(tel) === SMSMsg) {
        return res.status(200).json({
          code: 200,
          message: `회원가입 SMS메세지 인증 성공 ! `,
        });
      } else {
        return res.status(502).json({
          code: 502,
          message: `회원가입 SMS메세지 인증 실패 , 인증번호 불일치`,
        });
      }

      console.log("번호확인");
    } catch (e) {
      return res.status(500).json({
        code: 500,
        message: `회원가입 SMS메세지 인증에서 에러발생 message : ${e}`,
      });
    }
  },

  getNewPw: async (req, res) => {
    try {
      const { id, tel } = req.body;

      /**
       * 임시 비밀번호 생성 및 업데이트
       */
      const tempPw = Math.random().toString(36).split(".")[1];
      const hashPw = await bcrypt.hash(tempPw, 12);

      await User.update({ password: hashPw }, { where: { id: id, tel: tel } });

      /**
       * 이후 유저에게 새로운 패스워드 전달
       */

      //
      const user_phone_number = tel;
      const date = Date.now().toString();

      //환경변수
      const sens_service_id = sens.serviceId;
      const sens_access_key = sens.accessKey;
      const sens_secret_key = sens.secretKey;
      const sens_call_number = sens.callNumber;

      // url 관련 변수 선언
      const method = "POST";
      const space = " ";
      const newLine = "\n";
      const url = `https://sens.apigw.ntruss.com/sms/v2/services/${sens_service_id}/messages`;
      const url2 = `/sms/v2/services/${sens_service_id}/messages`;

      //암호화
      const hmac = CryptoJS.algo.HMAC.create(
        CryptoJS.algo.SHA256,
        sens_secret_key
      );

      hmac.update(method);
      hmac.update(space);
      hmac.update(url2);
      hmac.update(newLine);
      hmac.update(date);
      hmac.update(newLine);
      hmac.update(sens_access_key);
      const hash = hmac.finalize();

      const signature = hash.toString(CryptoJS.enc.Base64);

      const smsRes = await axios({
        method: method,
        url: url,
        headers: {
          "Contenc-type": "application/json; charset=utf-8",
          "x-ncp-iam-access-key": sens_access_key,
          "x-ncp-apigw-timestamp": date,
          "x-ncp-apigw-signature-v2": signature,
        },
        data: {
          type: "SMS",
          countryCode: "82",
          from: sens_call_number,
          content: `새로운 비밀번호는 [${tempPw}] 입니다.`,
          messages: [{ to: `${user_phone_number}` }],
        },
      });

      if (smsRes.data.statusCode == "202") {
        cache.set(user_phone_number, tempPw);
      } else {
        return res.status(500).json({
          code: 500,
          message: `패스워드 찾기/재발급 SMS sent 에서 알수없는 서버 에러발생${e} sms server returned Code : ${smsRes.data.statusCode}`,
        });
      }
      return res
        .status(200)
        .json({ code: 200, message: "New Pw Genned & SMS sent" });
    } catch (e) {
      console.log(`sms send error : ${e}`);
      return res
        .status(404)
        .json({ code: 404, message: `SMS not sent error : ${e}` });
    }
  },
};
