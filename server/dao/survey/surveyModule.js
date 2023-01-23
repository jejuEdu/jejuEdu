const database = require('../../firebase/config');

module.exports = {
  question: async(req, res) => {
    try {
      // questionNum: 설문조사 문항번호 / itemNum: 사용자가 선택한 답변 번호
      const { questionNum, itemNum } = req.body;
      let current = 0; // 현재 카운트

      // 여러 사람들이 각 다른 데이터를 보내서 여러 데이터의 카운트가 동시에 증가되는 거라, 트랜잭션 고민해봐야 할 듯
      database.ref('question').child(questionNum).child(itemNum).on('value', (snapshot) => {
        if (snapshot) {
          console.log(`value=${Object.values(snapshot.val())}`);
          current = parseInt(Object.values(snapshot.val())); 
        }
      });

      await database.ref('question').child(questionNum).child(itemNum).set({
        count: current+1,
      });

      res.status(200).json({
        code: 200,
        message: `파이어베이스에 설문 데이터 카운트 수가 성공적으로 저장되었습니다`
      }) 

          
    } catch (e) {
      return res.status(500).json({
        code: 500,
        message: `파이어베이스에 설문 데이터 카운트 수를 저장하는 중 서버에 알 수 없는 에러 발생 ${e}`,
      })
    }
  },
  count: async(req, res) => {
    const dbRef = await database.ref();
    dbRef.child('users').get().then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(`db=${Object.keys(snapshot.val())}`);
        const countParticipants = Object.keys(snapshot.val()).length;

        res.status(200).json({
          code: 200,
          message: `현재 참여자 수를 성공적으로 가져왔습니다`,
          countParticipants: countParticipants,
        });
      } else {
          console.log("No data available");
          res.status(202).json({
            code: 202,
            message: `사용 가능한 데이터가 없습니다`,
          });
      }
    }).catch((error) => {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: `파이어베이스에서 설문 참여자 수를 카운트하는 중 서버 내 알 수 없는 에러발생 ${error}`,
      })
    });
  },
  submit: async(req, res) => {
    try {
      const { phone, email } = req.body;
      // phone 중복 체크할 것 (사용자 중복 체크)

      await database.ref('users').child(phone).set({
        email: email,
      }); 
      res.status(200).json({
        code: 200,
        message: `파이어베이스에 데이터가 성공적으로 저장되었습니다`,
      });
    } catch (e) {
      return res.status(500).json({
        code: 500,
        message: `파이어베이스에 휴대폰 번호와 이메일을 저장하는 중 서버 내 알 수 없는 에러발생 ${e}`,
      })
    }
  },
}