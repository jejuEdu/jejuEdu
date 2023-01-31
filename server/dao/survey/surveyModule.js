const database = require('../../firebase/config');
const crypto = require('crypto');
const { algorithm, key } = require('../../crypto/crypto');

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
       * 휴대폰번호 암호화는 다 된 후에 진행해도 될듯..급한것부터 >> 휴대폰 암호화 완료
       */
      const { surveyResList, address, phone } = req.body['surveyInfo'];
      //각 Q1 , Q2 , Q3 ...들의 설문 갯수
      const eachSurveyItemsCnt = [7, 5, 4, 4, 2, 4, 4];

      // 각 문항의 설문 개수를 토대로 surveyResList 의 값이 정상적인 값인지 체크
      const checkSurveyResList = (eachSurveyItemsCnt.length == surveyResList.length) &&
                              eachSurveyItemsCnt.every((value, idx) => value >= surveyResList[idx]);

      if (checkSurveyResList == false) {
        return res.status(203).json({
          code: 203,
          message: `설문조사 결과 리스트에 비정상적인 문항 개수가 포함되어 있습니다.`
        })
      }

      //휴대폰번호 형식이 맞는지 체크
      const checkPhone = /(01[0])([1-9]{1}[0-9]{3})([0-9]{4})$/;
      if (!checkPhone.test(phone)) {
        // 휴대폰번호 형식에 맞지 않는 경우
        return res.status(202).json({
          code: 202,
          message: `사용자가 입력한 휴대폰 번호가 형식에 맞지 않습니다.`,
        })
      }

      //휴대폰번호 암호화
      // const key = crypto.scryptSync(phone, salt, 16); // phone, salt, byte 순
      const cipher = crypto.createCipher(algorithm, key);
      let cryptoPhone = cipher.update(phone, 'utf8', 'hex');
      cryptoPhone += cipher.final('hex');
      // '/' 가 포함되면 파이어베이스에 자식 객체로 인식함. '/' 지우고 저장
      cryptoPhone = cryptoPhone.replace(/\//g, "");
      console.log(`암호화된 휴대폰 번호: ${cryptoPhone}`);
      // console.log(`key: ${atob(key)}`);
      //휴대폰번호 암호화 마무리

      //2. users 테이블에 설문한 유저의 설문데이터 기록
      //특이사항 : 휴대폰번호 중복체크
      //얘를 먼저 해야하는 이유는 휴대폰번호가 이미 참여완료한 번호면 아래의 총집계도 돌아가면 안된다
      database
        .ref('users/')
        .child(cryptoPhone)
        .get()
        .then(async (snapshot) => {
          if (await snapshot.exists()) {
            return res.status(400).json({
              code: 400,
              message: `이미 설문조사를 완료한 휴대폰 번호입니다`,
            });
          } else {
            //2번 수행

            //휴대폰번호 복호화
            const deciper = crypto.createDecipher(algorithm, key);
            let decryptPhone = deciper.update(cryptoPhone, 'hex', 'utf8');
            decryptPhone += deciper.final('utf8');
            console.log(`복호화된 휴대폰 번호: ${decryptPhone}`);
            //휴대폰번호 복호화 마무리

            await database.ref('users/').child(cryptoPhone).set({
              surveyResList: surveyResList,
              address: address,
              phone: cryptoPhone,
              // key: atob(key), // 복호화할 때 휴대폰 번호 암호화할 때 사용한 key 가 필요
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

  getTotalSurveyResult: async (req, res) => {
    const eachSurveyItemsCnt = [7, 5, 4, 4, 2, 4, 4];
    //1. 내가 선택한 데이터들을 전부 받아와야함

    const phone = req.body.phone;

    //휴대폰번호 형식이 맞는지 체크
    const checkPhone = /(01[0])([1-9]{1}[0-9]{3})([0-9]{4})$/;
    if (!checkPhone.test(phone)) {
      // 휴대폰번호 형식에 맞지 않는 경우
      return res.status(202).json({
        code: 202,
        message: `사용자가 입력한 휴대폰 번호가 형식에 맞지 않습니다.`,
      })
    }

    // bcrypt 는 단방향 암호화이기 때문에 복호화 불가능
    // crpyto 를 사용, 휴대폰 번호 비교하는 것은 복호화해서 해야 할 듯
    
    /**
     *  // 여기서 암호화 해도 똑같은 값으로 암호화 안됨..
     */

    try {
      // db 에 있는 암호화된 휴대폰 번호를 복호화해서 비교하려고 했으나.. (key 값도 랜덤, 초기화 벡터도 랜덤)
      // 우선은 key 값을 명시해서 암호화, 복호화 진행 (초기화 벡터 사용 X)

      const dbRef = database.ref();
      dbRef
      .child('users')
      .get()
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          // console.log(`db=${JSON.stringify(snapshot.val())}`);
          // console.log(`핸드폰 존재하는지: ${cryptoPhone in snapshot.val()}`);
          // cryptoPhone = Object.keys(snapshot.val())[46];

          let cryptoPhone;
          let decryptPhone;
          let j = 0;
          let flag = false;

          // 휴대폰 번호 복호화해서 프론트단에서 넘어온 휴대폰 번호와 같은 값 찾기
          while (j < Object.keys(snapshot.val()).length) {
            cryptoPhone = Object.keys(snapshot.val())[j];
            // 휴대폰 번호 복호화
            const deciper = crypto.createDecipher(algorithm, key);
            decryptPhone = deciper.update(cryptoPhone, 'hex', 'utf8');
            decryptPhone += deciper.final('utf8');
            console.log(`복호화된 휴대폰 번호: ${decryptPhone}`);
            //휴대폰번호 복호화 마무리

            if (decryptPhone === phone) {
              flag = true;
              break;
            }
            j++;
          }

          console.log(`여기서 cryptoPhone 값은? ${cryptoPhone}`);

          if (flag === false) {
            return res.status(404).json({
              code: 404,
              message: `설문의 총 집계를 추출하던 중 없는 휴대폰 번호(설문에 참여하지 않은 고객)를 서버가 받아서 처리하지 못했습니다`,
            })
          }

          const myPick = (await database.ref(`users/${cryptoPhone}/surveyResList`).get()).val();
          console.log(`myPick=${myPick}`);
            
          //2. 현재까지의 집계를 다 받아오되 , Count 내림차순으로 받아와야한다
            var surVeyAr = [];
            for (var i = 0; i < 7; i++) {
              var temp = (
                await database
                  .ref(`surVeyQuestion`)
                  .child(`${i}/Q${i + 1}/Q${i + 1}_List/`)
                  .get()
              ).val();
              var tempAr = [];
              for (var k = 0; k < eachSurveyItemsCnt[i]; k++) {
                tempAr.push(temp[k][`Q${i + 1}_${k + 1}`]);
              }
              surVeyAr.push(tempAr);
            }
            //이후 내 랭킹목록의 맨위에 내 선택지를 올리기 위한 surVeyFixedAr 변수
            const surVeyFixedAr = JSON.parse(JSON.stringify(surVeyAr));

            /**
             * 이제 내가 선택한걸 맨 위로 올리기만하면됨
             * 반복 도는김에 순위필드까지 추가하고
             */
            for (var i = 0; i < 7; i++) {
              var temp = surVeyAr[i][0];
              var title = surVeyFixedAr[i][myPick[i] - 1]['Title'];

              for (var k = 0; k < eachSurveyItemsCnt[i]; k++) {
                if (title === surVeyAr[i][k]['Title']) {
                  surVeyAr[i][k] = temp;
                  break;
                }
              }
              surVeyAr[i][0] = surVeyFixedAr[i][myPick[i] - 1];
            }

            //아..리소스 낭비인것같은데..만들고나서 생각해볼까
            /**
             * surVeyAr 를
             * 새 형태의 배열 { Count: 3, Title: '나만의 작은 취미 만들기' } 들만 쌓인 형태로 가공 완료
             * 이는 2차원 배열로 아래에선 각 surVeyAr[][V] 인덱스마다 내부 배열을 정렬해서 새로운 배열로 할당해야함
             */

            for (var i = 0; i < 7; i++) {
              for (var a = 2; a < eachSurveyItemsCnt[i]; a++) {
                for (var b = 1; b < a; b++) {
                  if (surVeyAr[i][b]['Count'] < surVeyAr[i][a]['Count']) {
                    var temp = surVeyAr[i][a];
                    surVeyAr[i][a] = surVeyAr[i][b];
                    surVeyAr[i][b] = temp;
                  }
                }
              }
            }

            //순위 여기서 좀 쉽게 매겨볼까
            for (var i = 0; i < 7; i++) {
              var rank = 1;
              for (var a = 1; a < eachSurveyItemsCnt[i]; a++) {
                if (a == 1) {
                  if (surVeyAr[i][0]['Count'] > surVeyAr[i][a]['Count']) {
                    surVeyAr[i][0]['rank'] = rank++;
                    surVeyAr[i][a]['rank'] = rank;
                    continue;
                  } else {
                    surVeyAr[i][a]['rank'] = rank++;
                    surVeyAr[i][0]['rank'] = rank;
                    continue;
                  }
                }
                if (surVeyAr[i][0]['Count'] < surVeyAr[i][a]['Count']) {
                  surVeyAr[i][a]['rank'] = rank++;
                  surVeyAr[i][0]['rank'] = rank;
                  continue;
                } else if (surVeyAr[i][0]['Count'] == surVeyAr[i][a]['Count']) {
                  surVeyAr[i][a]['rank'] = rank;
                  surVeyAr[i][0]['rank'] = rank;
                  continue;
                }
                surVeyAr[i][a]['rank'] = ++rank;
              }
            }

            //다했다 이제 surVeyAr만 넘기면됨
            return res.status(200).json({
              code: 200,
              message:
                '성공적으로 설문의 총 집계를 추출해냈습니다 1순위는 집계의 count와 관계없이 무조건 내가 선택한 항목입니다',
              surVeyAr: surVeyAr,
            });
        } else {
          console.log('No data available');
          res.status(203).json({
            code: 203,
            message: `파이어베이스에 사용 가능한 데이터가 없습니다`,
          });
        }
      })
    } catch (e) {
      return res.status(500).json({
        code: 500,
        message: `설문의 총 집계를 추출하던 중 서버 내 알 수 없는 에러 발생 ${e}`,
      });
    }
  },
};
