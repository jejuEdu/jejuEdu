const database = require('../../firebase/config');

module.exports = {
  count: async (req, res) => {
    const dbRef = await database.ref();
    dbRef
      .child('users')
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(`db=${Object.keys(snapshot.val())}`);
          const countParticipants = Object.keys(snapshot.val()).length;

          res.status(200).json({
            code: 200,
            message: `현재 참여자 수를 성공적으로 가져왔습니다`,
            countParticipants: countParticipants,
          });
        } else {
          console.log('No data available');
          res.status(202).json({
            code: 202,
            message: `사용 가능한 데이터가 없습니다`,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({
          code: 500,
          message: `파이어베이스에서 설문 참여자 수를 카운트하는 중 서버 내 알 수 없는 에러발생 ${error}`,
        });
      });
  },
  submit: async (req, res) => {
    try {
      /**
       * email은 넣지 않는다는 기획자분의 확답을 받음. 삭제
       * {
       *      "surveyInfo" : {
       *             "surveyResList" : [ 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
       *             "phone" : "01011112222"
       *      }
       * }
       * 이렇게 온다는 가정하에 작성하는 코드
       * 휴대폰번호 암호화는 다 된 후에 진행해도 될듯..급한것부터
       */
      const { surveyResList, address, phone } = req.body['surveyInfo'];
      //각 Q1 , Q2 , Q3 ...들의 설문 갯수
      const eachSurveyItemsCnt = [7, 5, 4, 4, 2, 4, 4];

      //2. users 테이블에 설문한 유저의 설문데이터 기록
      //특이사항 : 휴대폰번호 중복체크
      //얘를 먼저 해야하는 이유는 휴대폰번호가 이미 참여완료한 번호면 아래의 총집계도 돌아가면 안된다
      database
        .ref('users/')
        .child(phone)
        .get()
        .then(async (snapshot) => {
          if (await snapshot.exists()) {
            return res.status(400).json({
              code: 400,
              message: `이미 설문조사를 완료한 휴대폰 번호입니다`,
            });
          } else {
            //2번 수행
            await database.ref('users/').child(phone).set({
              surveyResList: surveyResList,
              address: address,
              phone: phone,
            });
            //2번 마무리

            //1. surVeyQuestion에 들어온 설문데이터 집계
            for (var i = 0; i < 7; i++) {
              const path = `surVeyQuestion/${i}/Q${i + 1}/Q${i + 1}_List/${surveyResList[i] - 1}/Q${
                i + 1
              }_${surveyResList[i]}/Count`;

              await database.ref(path).once('value', (snapshot) => {
                database.ref(path).set(snapshot.val() + 1);
              });
            }
            //1번 마무리
            return res.status(200).json({
              code: 200,
              message: `파이어베이스에 유저 설문데이터, 총 집계 데이터가 성공적으로 저장되었습니다`,
            });
          }
        });

      //3. 내 데이터를 포함해 현재까지 설문 랭킹을 가공해서 보내줘야한다 ( 이후 생각.. 지금은 불가 )
      //이건 여기서 보내는게 아니라 따로 버튼이 있네
    } catch (e) {
      return res.status(500).json({
        code: 500,
        message: `파이어베이스에 유저 설문데이터, 총 집계 데이터를 저장하는 중 서버 내 알 수 없는 에러발생 ${e}`,
      });
    }
  },
};
