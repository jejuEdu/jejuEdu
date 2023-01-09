const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'JenFra API',
      version: '1.0.0',
      description: 'Janfra API with express',
    },
    host: 'localhost:3000',
    basePath: '/',
    tags: [
      {
        name: 'Test Swagger',
        description: 'API for task',
      },
    ],
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    paths: {
      '/api/auth/login': {
        post: {
          tags: ['Login'],
          summary: 'Login Data Post',
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: '로그인할때 보내는 form형식',
              schema: {
                $ref: '#/definitions/apiAuthLoginRequestForm',
              },
            },
          ],
          responses: {
            200: {
              description: 'Login Success(로그인 성공)',
              schema: {
                $ref: '#/definitions/apiAuthLoginResponseForm',
              },
            },
            403: {
              description: 'Failed to Search User(일치하는 유저가 없다)',
            },
            500: {
              description: 'Failed to create jwt token(jwt토큰만드는 로직에 문제가 생겼다)',
            },
          },
        },
      },

      '/api/auth/join': {
        post: {
          tags: ['Join'],
          summary: 'Join Data Post',
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: '회원가입할때 보내는 form형식',
              schema: {
                $ref: '#/definitions/apiAuthJoinRequestForm',
              },
            },
          ],
          responses: {
            200: {
              description: 'Login Success(회원가입 성공)',
              schema: {
                $ref: '#/definitions/apiAuthJoinResponseForm',
              },
            },
            100: {
              description: '아이디 중복일시 (실패)',
              schema: {
                $ref: '#/definitions/apiAuthJoinResponseForm',
              },
            },
          },
        },
      },

      '/api/auth/checkDupId': {
        post: {
          tags: ['회원가입시에 아이디 중복체크'],
          summary: '회원가입시에 아이디 중복체크',
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: '회원가입할때 아이디 중복체크를 위해 존재하는 API',
              schema: {
                $ref: '#/definitions/apiAuthCheckDupIdRequestForm',
              },
            },
          ],
          responses: {
            201: {
              description: '아이디가 중복될때 리턴되는 코드는 201입니다',
              schema: {
                $ref: '#/definitions/apiAuthCheckDupId_ResponseForm_Success201',
              },
            },
            200: {
              description: '아이디가 중복이 없고 사용 가능한 아이디일때 코드는 200입니다',
              schema: {
                $ref: '#/definitions/apiAuthCheckDupId_ResponseForm_Success200',
              },
            },
            500: {
              description:
                '아이디 중복을 체크하는도중 예기치 못한 에러가 발생한다면 500입니다 (body에 id를 안보내거나 하면 발생)',
              schema: {
                $ref: '#/definitions/apiAuthCheckDupId_ResponseForm_Failed',
              },
            },
          },
        },
      },

      '/api/auth/payload': {
        get: {
          tags: ['PayLoad'],
          summary:
            'PayLoad Verify JWT Token 쿠키내에 JWT토큰이 아직 유효한지를 검사하는 API (그냥 get쏘면됨 파라미터 X)',
          responses: {
            200: {
              description: '쿠키내의 JWT 토큰이 유효함',
              schema: {
                $ref: '#/definitions/apiAuthPayLoadResponseForm_VerifySuccess',
              },
            },
            401: {
              description:
                '로그인하지않고 그냥 /api/auth/payload로 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함',
              schema: {
                $ref: '#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401',
              },
            },
            419: {
              description:
                '쿠키내의 JWT 토큰이 accessToken , refreshToken 모두 유효기간이 다함 -> 즉 다시 로그인해야하니 로그인페이지로 보내야함',
              schema: {
                $ref: '#/definitions/apiAuthPayLoadResponseForm_VerifyFailed419',
              },
            },
          },
        },
      },
      '/api/auth/logout': {
        get: {
          tags: ['Logout'],
          summary:
            'Logout API (그냥 로그아웃)파라미터 아무것도 안보내고 그냥 쏘면 쿠키내에 accessToken,refreshToken이 삭제된다',
          responses: {
            200: {
              description: '성공적으로 로그아웃이 되었습니다',
              schema: {
                $ref: '#/definitions/apiAuthLogoutResponseForm_Success',
              },
            },
            500: {
              description: '로그아웃을 하는중에 무언가 에러가 발생해 예외처리되었다',
              schema: {
                $ref: '#/definitions/apiAuthLogoutResponseForm_Failed',
              },
            },
          },
        },
      },

      '/api/getStudyList/code': {
        get: {
          tags: ['프로그래밍 스터디 모임 리스트 추출'],
          summary: '프로그래밍 주제 관련한 스터디 모임의 리스트를 서버로부터 받는다',
          responses: {
            200: {
              description:
                '성공적으로 프로그래밍 주제 관련한 스터디 모임의 리스트 추출 및 서버로부터 응답 받음',
              schema: {
                $ref: '#/definitions/apiGetStudyListCode_ResponseForm_Success',
              },
            },
            401: {
              description:
                '로그인하지않고 그냥 /api/getStudyList/code로 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함',
              schema: {
                $ref: '#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401',
              },
            },
            500: {
              description: '프로그래밍 관련 스터디 추출에 관한 서버에서의 에러발생',
              schema: {
                $ref: '#/definitions/apiGetStudyListCode_ResponseForm_Failed',
              },
            },
          },
        },
      },

      '/api/getStudyList/sing': {
        get: {
          tags: ['보컬댄스 스터디 모임 리스트 추출'],
          summary: '보컬댄스 주제 관련한 스터디 모임의 리스트를 서버로부터 받는다',
          responses: {
            200: {
              description:
                '성공적으로 보컬댄스 주제 관련한 스터디 모임의 리스트 추출 및 서버로부터 응답 받음',
              schema: {
                $ref: '#/definitions/apiGetStudyListSing_ResponseForm_Success',
              },
            },
            401: {
              description:
                '로그인하지않고 그냥 /api/getStudyList/sing로 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함',
              schema: {
                $ref: '#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401',
              },
            },
            500: {
              description: '보컬댄스 관련 스터디 추출에 관한 서버에서의 에러발생',
              schema: {
                $ref: '#/definitions/apiGetStudyListSing_ResponseForm_Failed',
              },
            },
          },
        },
      },

      '/api/getStudyList/design': {
        get: {
          tags: ['디자인 스터디 모임 리스트 추출'],
          summary: '디자인 주제 관련한 스터디 모임의 리스트를 서버로부터 받는다',
          responses: {
            200: {
              description:
                '성공적으로 디자인 주제 관련한 스터디 모임의 리스트 추출 및 서버로부터 응답 받음',
              schema: {
                $ref: '#/definitions/apiGetStudyListDesign_ResponseForm_Success',
              },
            },
            401: {
              description:
                '로그인하지않고 그냥 /api/getStudyList/design로 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함',
              schema: {
                $ref: '#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401',
              },
            },
            500: {
              description: '디자인 관련 스터디 추출에 관한 서버에서의 에러발생',
              schema: {
                $ref: '#/definitions/apiGetStudyListDesign_ResponseForm_Failed',
              },
            },
          },
        },
      },

      '/api/openStudy': {
        post: {
          tags: ['스터디 모임 개설'],
          summary: '스터디 모임을 일정 양식에 따라 개설한다',
          parameters: [
            {
              in: 'body',
              name: 'body',
              description:
                'body내에 스터디 개설에 필요한 데이터들을 집어넣고 서버로 Http Request를 보내야 한다',
              schema: {
                $ref: '#/definitions/apiOpenStudyRequestForm',
              },
            },
          ],
          responses: {
            200: {
              description: '성공적으로 스터디 개설 성공',
              schema: {
                $ref: '#/definitions/apiOpenStudy_ResponseForm_Success',
              },
            },
            401: {
              description:
                '로그인하지않고 그냥 /api/openStudy로 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함',
              schema: {
                $ref: '#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401',
              },
            },
            500: {
              description: '스터디 개설 관련 서버내의 에러 발생',
              schema: {
                $ref: '#/definitions/apiOpenStudy_ResponseForm_Failed',
              },
            },
          },
        },
      },

      '/api/getStudyListNotMine/:id': {
        get: {
          tags: ['내가 개설한것이 아닌 다른 사람이 개설한 스터디 목록을 불러오는 API'],
          summary: '다른사람이 개설한 스터디 목록을 불러와준다',
          responses: {
            200: {
              description:
                '성공적으로 다른사람이 개설한 스터디 모임의 리스트 추출 및 서버로부터 응답 받음',
              schema: {
                $ref: '#/definitions/apiGetStudyListNotMine_ResponseForm_Success',
              },
            },
            401: {
              description:
                '로그인하지않고 그냥 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함',
              schema: {
                $ref: '#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401',
              },
            },
            500: {
              description: '다른사람이 개설한 스터디 추출에 관한 서버에서의 에러발생',
              schema: {
                $ref: '#/definitions/apiGetStudyListNotMine_ResponseForm_Failed',
              },
            },
          },
        },
      },

      '/api/getStudyListMine/:id': {
        get: {
          tags: ['내가 개설한 스터디 목록을 불러오는 API'],
          summary: '내가 개설한 스터디 목록을 불러와준다',
          responses: {
            200: {
              description:
                '성공적으로 내가 개설한 스터디 모임의 리스트 추출 및 서버로부터 응답 받음',
              schema: {
                $ref: '#/definitions/apiGetStudyListMine_ResponseForm_Success',
              },
            },
            401: {
              description:
                '로그인하지않고 그냥 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함',
              schema: {
                $ref: '#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401',
              },
            },
            500: {
              description: '내가 개설한 스터디 추출에 관한 서버에서의 에러발생',
              schema: {
                $ref: '#/definitions/apiGetStudyListMine_ResponseForm_Failed',
              },
            },
          },
        },
      },

      '/api/joinStudy': {
        post: {
          tags: ['다른사람이 개설한 스터디에 참가하는 API'],
          summary: '다른사람이 개설한 스터디에 참가하는 API이다',
          parameters: [
            {
              in: 'body',
              name: 'body',
              description:
                '현석이형이 전에 스터디를 참여한후에 바로 인원수가 변하는걸 볼수있게 response에 즉각적으로 바뀐 참가인원수를 담아보내달라해서 보냄!',
              schema: {
                $ref: '#/definitions/apiJoinStudyRequestForm',
              },
            },
          ],
          responses: {
            200: {
              description:
                '성공적으로 내가 개설한 스터디 모임의 리스트 추출 및 서버로부터 응답 받음',
              schema: {
                $ref: '#/definitions/apiJoinStudy_ResponseForm_Success200',
              },
            },
            202: {
              description: '이미 참여해있는 스터디에 참여하려할때 리턴되는 코드',
              schema: {
                $ref: '#/definitions/apiJoinStudy_ResponseForm_Failed202',
              },
            },
            401: {
              description:
                '로그인하지않고 그냥 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함',
              schema: {
                $ref: '#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401',
              },
            },
            404: {
              description: '존재하지 않는 스터디에 참여하려했을때 리턴되는 코드',
              schema: {
                $ref: '#/definitions/apiJoinStudy_ResponseForm_Failed404',
              },
            },
            500: {
              description: '스터디가 현재 모집중인 상태가 아닌 상태일때 500이 리턴된다',
              schema: {
                $ref: '#/definitions/apiJoinStudy_ResponseForm_Failed500',
              },
            },
          },
        },
      },

      '/api/viewDetail/:study_no': {
        post: {
          tags: ['스터디 목록중 하나를 선택해 상세페이지로 들어가는 API'],
          summary:
            '스터디 목록이 쫘라락 보이는 데에서 특정 스터디를 클릭하면 그 스터디 상세설명 페이지로 들어가는 API',
          responses: {
            200: {
              description: '성공적으로 클릭한 스터디의 세부정보를 추출했습니다',
              schema: {
                $ref: '#/definitions/apiViewDetail_Study_No_ResponseForm_Success',
              },
            },
            401: {
              description:
                '로그인하지않고 그냥 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함',
              schema: {
                $ref: '#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401',
              },
            },
            500: {
              description: '특정 글의 상세정보를 서버에서 추출해오는데서 에러발생',
              schema: {
                $ref: '#/definitions/apiViewDetail_Study_No_ResponseForm_Failed',
              },
            },
          },
        },
      },

      '/api/closeStudy': {
        post: {
          tags: ['특정 스터디를 삭제하는 API'],
          summary: '특정 스터디를 선택해 삭제하는 API이다',
          parameters: [
            {
              in: 'body',
              name: 'body',
              description:
                '삭제할 스터디를 특정짓기위해 해당 스터디의 DB내에 기록되어있는 Index번호(study_no)가 필요하다',
              schema: {
                $ref: '#/definitions/apiCloseStudyRequestForm',
              },
            },
          ],
          responses: {
            200: {
              description: 'study delete success',
              schema: {
                $ref: '#/definitions/apiCloseStudy_ResponseForm_Success',
              },
            },
            401: {
              description:
                '로그인하지않고 그냥 뭔가를 쏠 시에 받는 에러메세지이다 프론트단에선 이걸받으면 로그인창으로 가게해야함',
              schema: {
                $ref: '#/definitions/apiAuthPayLoadResponseForm_VerifyFailed401',
              },
            },
            500: {
              description:
                '특정 스터디 모집 글을 삭제하는데에서 서버내 알수없는 에러발생 또는 이미 삭제된 스터디 모집글일수 있습니다',
              schema: {
                $ref: '#/definitions/apiCloseStudy_ResponseForm_Failed',
              },
            },
          },
        },
      },

      '/api/auth/message/code': {
        get: {
          tags: ['회원가입시 SNS인증코드를 받는 API'],
          summary:
            'get요청이지만 END Point는 post 요청을 받게해놨음으로 그냥 BODY에 tel만 채워주면 됩니당',
          parameters: [
            {
              in: 'body',
              name: 'body',
              description:
                '아무 형식 필요없어용 그냥 01011112222 이렇게 -도 ,도 띄어쓰기도 다필요없구 번호만 주세용',
              schema: {
                $ref: '#/definitions/apiAuthMsgCodeRequestForm',
              },
            },
          ],
          responses: {
            200: {
              description: 'SMS 메세지가 정상적으로 갔을때 200코드가 리턴됩니당',
              schema: {
                $ref: '#/definitions/apiAuthMessageCode_ResponseForm_Success',
              },
            },
            404: {
              description:
                'SMS메세지를 보내는 과정에서 상당히 많은 변수로 인해 문제가 발생했을때 404에러가 발생합니다',
              schema: {
                $ref: '#/definitions/apiAuthMessageCode_ResponseForm_Failed404',
              },
            },
            500: {
              description: 'SMS메세지가 정상적으로 전달되지 않았을때 500코드가 리턴됩니당',
              schema: {
                $ref: '#/definitions/apiAuthMessageCode_ResponseForm_Failed500',
              },
            },
          },
        },
      },

      '/api/auth/message/verifySMSMsg': {
        get: {
          tags: ['회원가입시 받은 인증코드가 맞는지 확인시켜주는 API'],
          summary:
            'get요청이지만 END Point는 post 요청을 받게해놨음으로 그냥 BODY에 tel과 SMSMsg만 채워주면 됩니당',
          parameters: [
            {
              in: 'body',
              name: 'body',
              description:
                '아무 형식 필요없어용 그냥 01011112222 이렇게 -도 ,도 띄어쓰기도 다필요없구 번호랑 , 그번호로 받은 SMSMsg(숫자6자리)만 주세용',
              schema: {
                $ref: '#/definitions/apiAuthMsgVerifyRequestForm',
              },
            },
          ],
          responses: {
            200: {
              description: 'SMS 메세지가 간걸가지고 인증에 성공했을때 200코드를 리턴합니다',
              schema: {
                $ref: '#/definitions/apiAuthMessageVerify_ResponseForm_Success',
              },
            },
            500: {
              description:
                'SMS메세지를 인증 확인하는 과정에서 상당히 많은 변수로 인해 문제가 발생했을때 500에러가 발생합니다',
              schema: {
                $ref: '#/definitions/apiAuthMessageVerify_ResponseForm_Failed500',
              },
            },
            502: {
              description:
                'SMS메세지가 유효기간이 다 되었거나, 틀린 번호로 인증하려하면 502코드를 리턴합니다',
              schema: {
                $ref: '#/definitions/apiAuthMessageVerify_ResponseForm_Failed502',
              },
            },
          },
        },
      },

      '/api/auth/message/findPW': {
        post: {
          tags: ['SMS로 새로운 임시 비밀번호를 발급받는 API'],
          summary: '가입한 휴대폰 번호로 문자메세지를 통해 새로운 랜덤 임시 비밀번호를 발급받는다',
          parameters: [
            {
              in: 'body',
              name: 'body',
              description:
                'id와 tel 즉 아이디와 휴대폰 번호(-나,없는 01011112222 쌩 번호)를 넘겨주세요',
              schema: {
                $ref: '#/definitions/apiAuthMsgFindPwRequestForm',
              },
            },
          ],
          responses: {
            200: {
              description: '새로운 비밀번호 발급 및 SMS로 전송에 성공했을때 200코드를 리턴합니다',
              schema: {
                $ref: '#/definitions/apiAuthMsgFindPw_ResponseForm_Success200',
              },
            },
            500: {
              description:
                'SMS메세지를 전송하는 부분에서 서버의 알수없는 문제로 인해 에러가 발생했을때 500에러가 발생합니다',
              schema: {
                $ref: '#/definitions/apiAuthMsgFindPw_ResponseForm_Failed500',
              },
            },
            404: {
              description: 'SMS 메세지가 전송되지 않는 상황이 발생할때 404에러가 리턴됩니다',
              schema: {
                $ref: '#/definitions/apiAuthMsgFindPw_ResponseForm_Failed404',
              },
            },
          },
        },
      },

      '/api/auth/modifyPW': {
        post: {
          tags: ['기존의 비밀번호를 새로운 비밀번호로 변경하는 API'],
          summary: '기존의 비밀번호를 새로운 비밀번호로 변경하는 API 입니다',
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: 'id와 새로운 비밀번호 , 기존의 비밀번호를 넘겨주세요',
              schema: {
                $ref: '#/definitions/apiAuthModifyPwRequestForm',
              },
            },
          ],
          responses: {
            200: {
              description:
                '기존의 비밀번호로 본인인증이 되었고, 기존의 비밀번호가 새로운 비밀번호로 성공적으로 변경되었다면 코드 200을 리턴합니다',
              schema: {
                $ref: '#/definitions/apiAuthModifyPw_ResponseForm_Success200',
              },
            },
            202: {
              description:
                'id는 일치하지만 기존의 비밀번호를 맞추지 못해 본인인증에 실패하였을때에 코드 202를 리턴합니다',
              schema: {
                $ref: '#/definitions/apiAuthModifyPw_ResponseForm_Failed202',
              },
            },
            203: {
              description:
                '변경하려고 하는 비밀번호가 현재 비밀번호와 같은 경우 코드 203을 리턴합니다',
              schema: {
                $ref: '#/definitions/apiAuthModifyPw_ResponseForm_Failed203',
              },
            },
            500: {
              description:
                '비밀번호 변경중 서버내의 알수없는 에러가 발생하였을때 코드 500이 리턴됩니다',
              schema: {
                $ref: '#/definitions/apiAuthModifyPw_ResponseForm_Failed500',
              },
            },
          },
        },
      },

      '/api/auth/modifyNickName': {
        post: {
          tags: ['기존의 닉네임을 새로운 닉네임으로 변경하는 API'],
          summary: '기존의 닉네임을 새로운 닉네임으로 변경하는 API 입니다',
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: 'id와 새로운 닉네임, 기존의 닉네임을 넘겨주세요',
              schema: {
                $ref: '#/definitions/apiAuthModifyNickNameRequestForm',
              },
            },
          ],
          responses: {
            200: {
              description:
                '기존의 닉네임으로 본인인증이 되었고, 기존의 닉네임이 새로운 닉네임으로 성공적으로 변경되었다면 코드 200을 리턴합니다',
              schema: {
                $ref: '#/definitions/apiAuthModifyNickName_ResponseForm_Success200',
              },
            },
            203: {
              description: '변경하려고 하는 닉네임이 현재 닉네임과 같은 경우 코드 203을 리턴합니다',
              schema: {
                $ref: '#/definitions/apiAuthModifyNickName_ResponseForm_Failed203',
              },
            },
            405: {
              description: '기존의 닉네임이 존재하지 않는 닉네임이면 코드 405를 리턴합니다',
              schema: {
                $ref: '#/definitions/apiAuthModifyNickName_ResponseForm_Failed405',
              },
            },
            500: {
              description:
                '닉네임 변경중 서버내의 알수없는 에러가 발생하였을때 코드 500이 리턴됩니다',

              schema: {
                $ref: '#/definitions/apiAuthModifyNickName_ResponseForm_Failed500',
              },
            },
          },
        },
      },
      '/api/auth/withdrawal': {
        post: {
          tags: ['회원 탈퇴하는 API'],
          summary: '회원 탈퇴하는 API 입니다',
          parameters: [
            {
              in: 'body',
              name: 'body',
              description: '현재 id를 넘겨주세요',
              schema: {
                $ref: '#/definitions/apiAuthWithdrawalRequestForm',
              },
            },
          ],
          responses: {
            200: {
              description:
                '기존의 id로 본인인증이 되었고, 기존 id로 회원 탈퇴가 성공적으로 되었다면 코드 200을 리턴합니다',
              schema: {
                $ref: '#/definitions/apiAuthWithdrawal_ResponseForm_Success200',
              },
            },
            405: {
              description: '기존의 id가 존재하지 않는 id이면 코드 405를 리턴합니다',
              schema: {
                $ref: '#/definitions/apiAuthWithdrawal_ResponseForm_Failed405',
              },
            },
            500: {
              description:
                '회원 탈퇴 중 서버 내의 알 수 없는 에러가 발생하였을 때 코드 500이 리턴됩니다',

              schema: {
                $ref: '#/definitions/apiAuthWithdrawal_ResponseForm_Failed500',
              },
            },
          },
        },
      },
    },
    definitions: {
      DBuserTable: {
        properties: {
          user_no: {
            type: 'integer',
          },
          id: {
            type: 'string',
          },
          nick: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          tel: {
            type: 'string',
          },
          good_cnt: {
            type: 'integer',
          },
          bad_cnt: {
            type: 'integer',
          },
          createdAt: {
            type: 'date',
          },
          deletedAt: {
            type: 'date',
          },
          updatedAt: {
            type: 'date',
          },
        },
      },
      DBstudyTable: {
        properties: {
          study_no: {
            type: 'integer',
          },
          user_no: {
            type: 'integer',
          },
          who_open: {
            type: 'string',
          },
          study_title: {
            type: 'string',
          },
          study_category: {
            type: 'string',
          },
          study_detail_description: {
            type: 'string',
          },
          current_member_cnt: {
            type: 'integer',
            description: '현재 참여하고있는 멤버 인원수의 총계이다',
          },
          min_member_cnt: {
            type: 'integer',
            description: '이거 최소 기준점을 정해놔야겠는데..적어도 2인 이상으로 1인만 안되게',
          },
          studyAt_date: {
            type: 'date',
          },
          studyAt_location: {
            type: 'string',
          },
          tmX: {
            type: 'float',
          },
          tmY: {
            type: 'float',
          },
          deadline: {
            type: 'date',
          },
          status: {
            type: 'integer',
          },
          Dday: {
            type: 'integer',
            description: '해당 스터디 개시의 Dday',
          },
        },
      },
      DBAllStudyListTable: {
        properties: {
          study_no: {
            type: 'integer',
          },
          user_no: {
            type: 'integer',
          },
          createdAt: {
            type: 'date',
          },
          updatedAt: {
            type: 'date',
          },
        },
      },
      apiAuthLoginRequestForm: {
        properties: {
          id: {
            type: 'string',
          },
          pw: {
            type: 'string',
          },
        },
      },
      apiAuthLoginResponseForm: {
        properties: {
          code: {
            type: 'integer',
          },
          message: {
            type: 'string',
          },
          id: {
            type: 'string',
          },
          userInfo: {
            type: 'object',
            properties: {
              user_no: {
                type: 'integer',
              },
              id: {
                type: 'string',
              },
              nick: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              tel: {
                type: 'string',
              },
              good_cnt: {
                type: 'integer',
              },
              bad_cnt: {
                type: 'integer',
              },
            },
          },
        },
      },

      apiAuthLogoutResponseForm_Success: {
        properties: {
          code: {
            type: 'integer',
            description: '로그아웃이 성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
          },
        },
      },

      apiAuthLogoutResponseForm_Failed: {
        properties: {
          code: {
            type: 'integer',
            description: '로그아웃이 예상치못한 이유로 실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
          },
        },
      },

      apiAuthJoinRequestForm: {
        properties: {
          id: {
            type: 'string',
          },
          pw: {
            type: 'string',
          },
          name: {
            type: 'string',
            description: '고객의 실명이 기입된다',
          },
          /*
          tel: {
            type: "string",
            description: "고객의 휴대폰 번호이다",
          },
          */
          nick: {
            type: 'string',
            description: '고객이 웹/앱상에서 사용할 닉네임이 입력된다',
          },
        },
      },
      apiAuthJoinResponseForm: {
        properties: {
          success: {
            type: 'integer',
            description: '회원가입 성공시에 success에 200이 리턴된다',
          },
          message: {
            type: 'string',
          },
        },
      },
      apiAuthPayLoadResponseForm_VerifySuccess: {
        properties: {
          code: {
            type: 'integer',
            description: '토큰이 아직 유효할시에 code는 200이 전달된다',
          },
          message: {
            type: 'string',
            description: "토큰이 아직 유효할시에 '토큰이 정상입니다'메세지가 리턴된다",
          },
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: '로그인할때 적는 유저의 id가 리턴된다 ex)monster , admin',
              },
              profile: {
                type: 'object',
                properties: {
                  user_no: {
                    type: 'integer',
                    description:
                      'db에 기록된 해당유저의 user_no 즉 그저 가입한 순서대로 기록되는 index가 리턴된다',
                  },
                  id: {
                    type: 'string',
                    description: '로그인할때 적는 유저의 id가 리턴된다 ex)monster , admin',
                  },
                  nick: {
                    type: 'string',
                    description:
                      '해당 유저가 가입할때 적는 nick 이다 , 실제 로그인할때 쓰는 id가 아닌 그냥 웹/앱상에서 사용하는 닉네임이다',
                  },
                  name: {
                    type: 'string',
                    description: '해당유저가 가입할때 적는 유저의 실명이다',
                  },
                  good_cnt: {
                    type: 'integer',
                    description:
                      '해당 유저가 받아온 한라봉 등 스터디에 잘 참여했을때 받는 리워드의 누적 갯수이다',
                  },
                  bad_cnt: {
                    type: 'integer',
                    description:
                      '해당 유저가 받아온 썩은 과일들 즉 스터디에 잘 참여하지 않았을때 받는 리워드의 누적 갯수이다',
                  },
                  StudyStudyNo: {
                    type: 'integer',
                    description:
                      'sequelize때문에 만들어진 컬럼인데 , 추후 수정해야할듯한데.. 일단은 이게 있다고 front단에 문제는 없을듯하다',
                  },
                },
              },
            },
          },
        },
      },

      apiAuthPayLoadResponseForm_VerifyFailed401: {
        properties: {
          code: {
            type: 'integer',
            description:
              '토큰이 만료되었을시엔 419 코드가 리턴이 된다 고로 401이 리턴이되면 새로 로그인해야함으로 로그인페이지로 강제이동 시켜야한다',
          },
          message: {
            type: 'string',
            description: '유효하지 않은 토큰입니다',
          },
        },
      },

      apiAuthPayLoadResponseForm_VerifyFailed419: {
        properties: {
          code: {
            type: 'integer',
            description:
              '토큰이 만료되었을시엔 419 코드가 리턴이 된다 고로 419가 리턴이되면 새로 로그인해야함으로 로그인페이지로 강제이동 시켜야한다',
          },
          message: {
            type: 'string',
            description: '토큰이 만료되었습니다 메세지가 리턴된다',
          },
        },
      },

      apiGetStudyListCode_ResponseForm_Success: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: '성공하면 프로그래밍 관련 스터디 추출 성공 이라는 메세지가 리턴된다',
          },
          studyList: {
            type: 'object',
            properties: {
              study_no: {
                type: 'integer',
                description: 'primary Key auto_increment 그저 index표시용 컬럼',
              },
              who_open: {
                type: 'string',
                description:
                  '누가 이 스터디를 개설했는지를 알수있는 컬럼 해당 유저의 nick 즉 닉네임이 들어간다',
              },
              study_title: {
                type: 'string',
                description: '이 스터디의 제목이다. ex)Java 단체 스터디 모집',
              },
              study_category: {
                type: 'string',
                description: 'ex) 프로그래밍 , 보컬댄스 , 디자인 즉 그저 카테고리',
              },
              study_detail_description: {
                type: 'string',
                description:
                  'ex) 나랑같이 Java스터디하실분~ 8명모이면 바로시작~ 즉 그냥 스터디에 관한 설명',
              },
              current_member_cnt: {
                type: 'integer',
                description: '현재 참가해있는 멤버들의 수 총계',
              },
              min_member_cnt: {
                type: 'integer',
                description:
                  '스터디가 시작하기위한 최소인원 설정, 현석이형이 db에 더미데이터를 집어넣을때 4의 배수로 설정해달라고 했었다',
              },
              studyAt_date: {
                type: 'date',
                description:
                  '말그대로 스터디가 이루어지는 날짜이다 ex) 2022-12-25 13:00:00 즉 딱 정해져있는 시간',
              },
              studyAt_location: {
                type: 'string',
                description:
                  '스터디가 이루어지는 지역구이다 ex) 제주특별시 서귀포구 즉 긴 주소에서 뒤는 다짤리고 앞의 간략정보만 server에서 front로 넘겨준다',
              },
              tmX: {
                type: 'float',
                description: '스터디가 이루어지는 장소의 위도 경도',
              },
              tmY: {
                type: 'float',
                description: '스터디가 이루어지는 장소의 위도 경도',
              },
              deadline: {
                type: 'date',
                description:
                  '해당 스터디가 열리던 말던 언제까지 유지할지를 결정하는 날짜 컬럼 ex ) 2022-12-30 이라하면 해당 스터디는 12월30일에 delete된다',
              },
              status: {
                type: 'integer',
                description:
                  '해당 스터디의 상태 ex) 0 = 모집중 , 1 = 인원마감 , 2 = 진행중 , 3 = 완료 근데 완료가 굳이 필요할까싶은...',
              },
              Dday: {
                type: 'integer',
                description: '해당 스터디 개시의 Dday',
              },
              createdAt: {
                type: 'date',
                description:
                  "이 스터디가 언제 개설되었는지 그 '개설'버튼을 누른 즉시 날짜가 기록되는 컬럼",
              },
              updatedAt: {
                type: 'date',
                description:
                  '혹시나 스터디의 정보가 수정된다면 언제 update됬는지 update(수정)버튼을 누른 즉시 그 날짜가 기록되는 컬럼',
              },
              deletedAt: {
                type: 'date',
                description: '스터디가 언제 삭제되었는지 기록되는 컬럼',
              },
            },
          },
        },
      },
      apiGetStudyListCode_ResponseForm_Failed: {
        properties: {
          code: {
            type: 'integer',
          },
          message: {
            type: 'string',
          },
        },
      },

      apiGetStudyListSing_ResponseForm_Success: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: '성공하면 보컬댄스 관련 스터디 추출 성공 이라는 메세지가 리턴된다',
          },
          studyList: {
            type: 'object',
            properties: {
              study_no: {
                type: 'integer',
                description: 'primary Key auto_increment 그저 index표시용 컬럼',
              },
              who_open: {
                type: 'string',
                description:
                  '누가 이 스터디를 개설했는지를 알수있는 컬럼 해당 유저의 nick 즉 닉네임이 들어간다',
              },
              study_title: {
                type: 'string',
                description: '이 스터디의 제목이다. ex)Java 단체 스터디 모집',
              },
              study_category: {
                type: 'string',
                description: 'ex) 프로그래밍 , 보컬댄스 , 디자인 즉 그저 카테고리',
              },
              study_detail_description: {
                type: 'string',
                description:
                  'ex) 나랑같이 Java스터디하실분~ 8명모이면 바로시작~ 즉 그냥 스터디에 관한 설명',
              },
              current_member_cnt: {
                type: 'integer',
                description: '현재 참가해있는 멤버들의 수 총계',
              },
              min_member_cnt: {
                type: 'integer',
                description:
                  '스터디가 시작하기위한 최소인원 설정, 현석이형이 db에 더미데이터를 집어넣을때 4의 배수로 설정해달라고 했었다',
              },
              studyAt_date: {
                type: 'date',
                description:
                  '말그대로 스터디가 이루어지는 날짜이다 ex) 2022-12-25 13:00:00 즉 딱 정해져있는 시간',
              },
              studyAt_location: {
                type: 'string',
                description:
                  '스터디가 이루어지는 지역구이다 ex) 제주특별시 서귀포구 즉 긴 주소에서 뒤는 다짤리고 앞의 간략정보만 server에서 front로 넘겨준다',
              },
              tmX: {
                type: 'float',
                description: '스터디가 이루어지는 장소의 위도 경도',
              },
              tmY: {
                type: 'float',
                description: '스터디가 이루어지는 장소의 위도 경도',
              },
              deadline: {
                type: 'date',
                description:
                  '해당 스터디가 열리던 말던 언제까지 유지할지를 결정하는 날짜 컬럼 ex ) 2022-12-30 이라하면 해당 스터디는 12월30일에 delete된다',
              },
              status: {
                type: 'integer',
                description:
                  '해당 스터디의 상태 ex) 0 = 모집중 , 1 = 인원마감 , 2 = 진행중 , 3 = 완료 근데 완료가 굳이 필요할까싶은...',
              },
              Dday: {
                type: 'integer',
                description: '해당 스터디 개시의 Dday',
              },
              createdAt: {
                type: 'date',
                description:
                  "이 스터디가 언제 개설되었는지 그 '개설'버튼을 누른 즉시 날짜가 기록되는 컬럼",
              },
              updatedAt: {
                type: 'date',
                description:
                  '혹시나 스터디의 정보가 수정된다면 언제 update됬는지 update(수정)버튼을 누른 즉시 그 날짜가 기록되는 컬럼',
              },
              deletedAt: {
                type: 'date',
                description: '스터디가 언제 삭제되었는지 기록되는 컬럼',
              },
            },
          },
        },
      },
      apiGetStudyListSing_ResponseForm_Failed: {
        properties: {
          code: {
            type: 'integer',
          },
          message: {
            type: 'string',
          },
        },
      },

      apiGetStudyListDesign_ResponseForm_Success: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: '성공하면 디자인 관련 스터디 추출 성공 이라는 메세지가 리턴된다',
          },
          studyList: {
            type: 'object',
            properties: {
              study_no: {
                type: 'integer',
                description: 'primary Key auto_increment 그저 index표시용 컬럼',
              },
              who_open: {
                type: 'string',
                description:
                  '누가 이 스터디를 개설했는지를 알수있는 컬럼 해당 유저의 nick 즉 닉네임이 들어간다',
              },
              study_title: {
                type: 'string',
                description: '이 스터디의 제목이다. ex)Java 단체 스터디 모집',
              },
              study_category: {
                type: 'string',
                description: 'ex) 프로그래밍 , 보컬댄스 , 디자인 즉 그저 카테고리',
              },
              study_detail_description: {
                type: 'string',
                description:
                  'ex) 나랑같이 Java스터디하실분~ 8명모이면 바로시작~ 즉 그냥 스터디에 관한 설명',
              },
              current_member_cnt: {
                type: 'integer',
                description: '현재 참가해있는 멤버들의 수 총계',
              },
              min_member_cnt: {
                type: 'integer',
                description:
                  '스터디가 시작하기위한 최소인원 설정, 현석이형이 db에 더미데이터를 집어넣을때 4의 배수로 설정해달라고 했었다',
              },
              studyAt_date: {
                type: 'date',
                description:
                  '말그대로 스터디가 이루어지는 날짜이다 ex) 2022-12-25 13:00:00 즉 딱 정해져있는 시간',
              },
              studyAt_location: {
                type: 'string',
                description:
                  '스터디가 이루어지는 지역구이다 ex) 제주특별시 서귀포구 즉 긴 주소에서 뒤는 다짤리고 앞의 간략정보만 server에서 front로 넘겨준다',
              },
              tmX: {
                type: 'float',
                description: '스터디가 이루어지는 장소의 위도 경도',
              },
              tmY: {
                type: 'float',
                description: '스터디가 이루어지는 장소의 위도 경도',
              },
              deadline: {
                type: 'date',
                description:
                  '해당 스터디가 열리던 말던 언제까지 유지할지를 결정하는 날짜 컬럼 ex ) 2022-12-30 이라하면 해당 스터디는 12월30일에 delete된다',
              },
              status: {
                type: 'integer',
                description:
                  '해당 스터디의 상태 ex) 0 = 모집중 , 1 = 인원마감 , 2 = 진행중 , 3 = 완료 근데 완료가 굳이 필요할까싶은...',
              },
              Dday: {
                type: 'integer',
                description: '해당 스터디 개시의 Dday',
              },
              createdAt: {
                type: 'date',
                description:
                  "이 스터디가 언제 개설되었는지 그 '개설'버튼을 누른 즉시 날짜가 기록되는 컬럼",
              },
              updatedAt: {
                type: 'date',
                description:
                  '혹시나 스터디의 정보가 수정된다면 언제 update됬는지 update(수정)버튼을 누른 즉시 그 날짜가 기록되는 컬럼',
              },
              deletedAt: {
                type: 'date',
                description: '스터디가 언제 삭제되었는지 기록되는 컬럼',
              },
            },
          },
        },
      },

      apiGetStudyListDesign_ResponseForm_Failed: {
        properties: {
          code: {
            type: 'integer',
          },
          message: {
            type: 'string',
          },
        },
      },

      apiOpenStudyRequestForm: {
        properties: {
          user_no: {
            type: 'integer',
            description: '스터디를 개설하는 유저의 user_no 즉 db에서의 auto_increment되는 index값',
          },
          who_open: {
            type: 'string',
            description:
              '스터디를 개설한 사람이 누구인지 그 사람의 nick 을 기록한다 , 절대 로그인할때의 id가 아니라 웹/앱 상에서 사용하는 nickname이다',
          },
          study_title: {
            type: 'string',
            description:
              '스터디를 개설할때에 해당 스터디의 제목을 적는다 ex) 힙합댄스 스터디 모집합니다~ 12명이상되면 바로 시작해요~',
          },
          study_category: {
            type: 'string',
            description:
              '스터디 개설시에 어떤 스터디인지 카테고리를 기록한다 ex) 보컬댄스 , 프로그래밍 , 디자인',
          },
          study_detail_description: {
            type: 'string',
            description:
              '스터디 모집글에 대한 상세설명이다. ex) 20살 이하만 신청가능해요! , 18:00~19:00까지 진행합니다~',
          },
          min_member_cnt: {
            type: 'string',
            description: '스터디가 시작되기 위한 최소인원수',
          },
          studyAt_date: {
            type: 'date',
            description:
              '스터디가 이루어지는 실제 날짜이다 , 절대 스터디를 개설한 날짜가 아닌 , 개설시에 언제 스터디를 진행할지 기록한 그 날짜이다',
          },
          studyAt_location: {
            type: 'string',
            description:
              '스터디가 이루어지는 지역구이다 . ex) 제주특별시 서귀포구 성산읍 플레이 스테이션',
          },
          tmX: {
            type: 'float',
            description: '스터디가 이루어지는 장소의 위경도',
          },
          tmY: {
            type: 'float',
            description: '스터디가 이루어지는 장소의 위경도',
          },
          deadline: {
            type: 'date',
            description:
              '해당 스터디가 열리던 말던 언제까지 유지할지를 결정하는 날짜 컬럼 ex ) 2022-12-30 이라하면 해당 스터디는 12월30일에 delete된다',
          },
          status: {
            type: 'integer',
            description:
              '해당 스터디의 상태 ex) 0 = 모집중 , 1 = 인원마감 , 2 = 진행중 , 3 = 완료 근데 완료가 굳이 필요할까싶은...',
          },
        },
      },

      apiOpenStudy_ResponseForm_Success: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: '성공하면 스터디 개설 성공 메세지가 전달된다 ',
          },
        },
      },

      apiOpenStudy_ResponseForm_Failed: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
            description:
              '스터디가 모집중인 상태가 아님으로 참여 실패 즉 status값이 0(모집중) 이 아닌 상태 ',
          },
        },
      },

      apiGetStudyListNotMine_ResponseForm_Success: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description:
              '성공하면 성공적으로 다른 유저가 개설한 스터디 목록 불러오기가 성공했습니다 라는 메세지가 리턴된다',
          },
          studyListNotMine: {
            type: 'object',
            properties: {
              study_no: {
                type: 'integer',
                description: 'primary Key auto_increment 그저 index표시용 컬럼',
              },
              who_open: {
                type: 'string',
                description:
                  '누가 이 스터디를 개설했는지를 알수있는 컬럼 해당 유저의 nick 즉 닉네임이 들어간다',
              },
              study_title: {
                type: 'string',
                description: '이 스터디의 제목이다. ex)Java 단체 스터디 모집',
              },
              study_category: {
                type: 'string',
                description: 'ex) 프로그래밍 , 보컬댄스 , 디자인 즉 그저 카테고리',
              },
              study_detail_description: {
                type: 'string',
                description:
                  'ex) 나랑같이 Java스터디하실분~ 8명모이면 바로시작~ 즉 그냥 스터디에 관한 설명',
              },
              current_member_cnt: {
                type: 'integer',
                description: '현재 참가해있는 멤버들의 수 총계',
              },
              min_member_cnt: {
                type: 'integer',
                description:
                  '스터디가 시작하기위한 최소인원 설정, 현석이형이 db에 더미데이터를 집어넣을때 4의 배수로 설정해달라고 했었다',
              },
              studyAt_date: {
                type: 'date',
                description:
                  '말그대로 스터디가 이루어지는 날짜이다 ex) 2022-12-25 13:00:00 즉 딱 정해져있는 시간',
              },
              studyAt_location: {
                type: 'string',
                description:
                  '스터디가 이루어지는 지역구이다 ex) 제주특별시 서귀포구 즉 긴 주소에서 뒤는 다짤리고 앞의 간략정보만 server에서 front로 넘겨준다',
              },
              tmX: {
                type: 'float',
                description: '스터디가 이루어지는 장소의 위도 경도',
              },
              tmY: {
                type: 'float',
                description: '스터디가 이루어지는 장소의 위도 경도',
              },
              deadline: {
                type: 'date',
                description:
                  '해당 스터디가 열리던 말던 언제까지 유지할지를 결정하는 날짜 컬럼 ex ) 2022-12-30 이라하면 해당 스터디는 12월30일에 delete된다',
              },
              status: {
                type: 'integer',
                description:
                  '해당 스터디의 상태 ex) 0 = 모집중 , 1 = 인원마감 , 2 = 진행중 , 3 = 완료 근데 완료가 굳이 필요할까싶은...',
              },
              createdAt: {
                type: 'date',
                description:
                  "이 스터디가 언제 개설되었는지 그 '개설'버튼을 누른 즉시 날짜가 기록되는 컬럼",
              },
              updatedAt: {
                type: 'date',
                description:
                  '혹시나 스터디의 정보가 수정된다면 언제 update됬는지 update(수정)버튼을 누른 즉시 그 날짜가 기록되는 컬럼',
              },
              deletedAt: {
                type: 'date',
                description: '스터디가 언제 삭제되었는지 기록되는 컬럼',
              },
            },
          },
        },
      },

      apiGetStudyListNotMine_ResponseForm_Failed: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
            description:
              '실패 알수없는 서버내의 이유로 다른사람이 개설한 스터디 목록 추출 실패 라는 메서지가 전달된다',
          },
        },
      },

      apiGetStudyListMine_ResponseForm_Success: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description:
              '성공하면 성공적으로 내가 개설한 스터디 목록 불러오기가 성공했습니다 라는 메세지가 리턴된다',
          },
          studyListNotMine: {
            type: 'object',
            properties: {
              study_no: {
                type: 'integer',
                description: 'primary Key auto_increment 그저 index표시용 컬럼',
              },
              who_open: {
                type: 'string',
                description:
                  '누가 이 스터디를 개설했는지를 알수있는 컬럼 해당 유저의 nick 즉 닉네임이 들어간다',
              },
              study_title: {
                type: 'string',
                description: '이 스터디의 제목이다. ex)Java 단체 스터디 모집',
              },
              study_category: {
                type: 'string',
                description: 'ex) 프로그래밍 , 보컬댄스 , 디자인 즉 그저 카테고리',
              },
              study_detail_description: {
                type: 'string',
                description:
                  'ex) 나랑같이 Java스터디하실분~ 8명모이면 바로시작~ 즉 그냥 스터디에 관한 설명',
              },
              current_member_cnt: {
                type: 'integer',
                description: '현재 참가해있는 멤버들의 수 총계',
              },
              min_member_cnt: {
                type: 'integer',
                description:
                  '스터디가 시작하기위한 최소인원 설정, 현석이형이 db에 더미데이터를 집어넣을때 4의 배수로 설정해달라고 했었다',
              },
              studyAt_date: {
                type: 'date',
                description:
                  '말그대로 스터디가 이루어지는 날짜이다 ex) 2022-12-25 13:00:00 즉 딱 정해져있는 시간',
              },
              studyAt_location: {
                type: 'string',
                description:
                  '스터디가 이루어지는 지역구이다 ex) 제주특별시 서귀포구 즉 긴 주소에서 뒤는 다짤리고 앞의 간략정보만 server에서 front로 넘겨준다',
              },
              tmX: {
                type: 'float',
                description: '스터디가 이루어지는 장소의 위도 경도',
              },
              tmY: {
                type: 'float',
                description: '스터디가 이루어지는 장소의 위도 경도',
              },
              deadline: {
                type: 'date',
                description:
                  '해당 스터디가 열리던 말던 언제까지 유지할지를 결정하는 날짜 컬럼 ex ) 2022-12-30 이라하면 해당 스터디는 12월30일에 delete된다',
              },
              status: {
                type: 'integer',
                description:
                  '해당 스터디의 상태 ex) 0 = 모집중 , 1 = 인원마감 , 2 = 진행중 , 3 = 완료 근데 완료가 굳이 필요할까싶은...',
              },
              createdAt: {
                type: 'date',
                description:
                  "이 스터디가 언제 개설되었는지 그 '개설'버튼을 누른 즉시 날짜가 기록되는 컬럼",
              },
              updatedAt: {
                type: 'date',
                description:
                  '혹시나 스터디의 정보가 수정된다면 언제 update됬는지 update(수정)버튼을 누른 즉시 그 날짜가 기록되는 컬럼',
              },
              deletedAt: {
                type: 'date',
                description: '스터디가 언제 삭제되었는지 기록되는 컬럼',
              },
            },
          },
        },
      },

      apiGetStudyListMine_ResponseForm_Failed: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
            description:
              '실패 알수없는 서버내의 이유로 내가 개설한 스터디 목록 추출 실패 라는 메서지가 전달된다',
          },
        },
      },

      apiJoinStudyRequestForm: {
        properties: {
          study_no: {
            type: 'integer',
            description:
              '누가 어떤 스터디에 참여하는지를 알아야하니 study_no 즉 스터디의 고유 DB Index번호를 알아야한다',
          },
          user_no: {
            type: 'integer',
            description:
              '누가 어떤 스터디에 참여하는지를 알아야하니 user_no 즉 유저의 고유 DB Index번호를 알아야한다',
          },
        },
      },

      apiJoinStudy_ResponseForm_Success200: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: '성공 하면 해당 스터디에 참여 성공 이란 메세지 전달',
          },
          updated_current_member_cnt: {
            type: 'integer',
            description: '참가 하자마자 갱신된 해당 스터디의 현재 멤버수를 return해준다',
          },
        },
      },
      apiJoinStudy_ResponseForm_Failed202: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 202이 리턴된다',
          },
          message: {
            type: 'string',
            description: '실패하면 이미 참여해있는 스터디입니다 (참여실패) 메세지 리턴',
          },
        },
      },

      apiJoinStudy_ResponseForm_Failed404: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 404이 리턴된다',
          },
          message: {
            type: 'string',
            description: '실패하면 존재하지 않는 스터디입니다 (참여실패) 메세지 리턴',
          },
        },
      },
      apiJoinStudy_ResponseForm_Failed500: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
            description:
              '실패 하면 알수없는 서버내의 이유로 스터디 참여 실패 라는 메서지가 전달된다',
          },
        },
      },

      apiAuthCheckDupIdRequestForm: {
        properties: {
          id: {
            type: 'string',
            description: '중복체크를 할 (DB에 있나 검사를 할) ID를 서버로 보낸다',
          },
        },
      },

      apiAuthCheckDupId_ResponseForm_Success200: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: '성공 하면 사용 가능한 아이디 입니다 이란 메세지 전달',
          },
        },
      },
      apiAuthCheckDupId_ResponseForm_Success201: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 201이 리턴된다',
          },
          message: {
            type: 'string',
            description:
              '중복체크에서 201코드가 리턴되는 동시에 아이디 중복입니다 라는 메세지 전달',
          },
        },
      },
      apiAuthCheckDupId_ResponseForm_Failed: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
            description: '실패 하면 아이디 중복체크 시도중 에러발생 이라는 메서지가 전달된다',
          },
        },
      },

      apiViewDetail_Study_No_ResponseForm_Success: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: '성공 하면 studyInfo 전달 성공 이란 메세지 전달',
          },
          study_Detail_Info: {
            type: 'object',
            properties: {
              study_no: {
                type: 'integer',
                description: '해당 글의 db내에 저장되어있는 index이다',
              },
              who_open: {
                type: 'string',
                description: '해당 스터디를 개설한 유저의 nick 이다 (닉네임 O 로그인할때 아이디 X)',
              },
              study_title: {
                type: 'string',
                description:
                  '해당 스터디의 모집글 제목이다 ex) 제주앞바다에서 풍경을 그릴분들 찾아요~',
              },
              study_category: {
                type: 'string',
                description: '해당 스터디의 주제이다 ex) 프로그래밍 , 디자인 , 보컬댄스',
              },
              study_detail_description: {
                type: 'string',
                description: '해당 스터디 모집글의 상세 설명이다 ex) 30대 분들만 모셔갑니다~~',
              },
              current_member_cnt: {
                type: 'integer',
                description: '현재 이 스터디에 참여해있는 인원수의 총계',
              },
              min_member_cnt: {
                type: 'integer',
                description: '스터디가 진행될수있는 최소 인원수 설정을 한 정수값',
              },
              studyAt_date: {
                type: 'date',
                description:
                  '말그대로 스터디가 이루어지는 날짜이다 ex) 2022-12-25 13:00:00 즉 딱 정해져있는 시간',
              },
              studyAt_location: {
                type: 'string',
                description:
                  '스터디가 이루어지는 지역구이다 ex) 제주특별시 서귀포구 즉 긴 주소에서 뒤는 다짤리고 앞의 간략정보만 server에서 front로 넘겨준다',
              },
              tmX: {
                type: 'float',
                description: '스터디가 이루어지는 장소의 위도 경도',
              },
              tmY: {
                type: 'float',
                description: '스터디가 이루어지는 장소의 위도 경도',
              },
              deadline: {
                type: 'date',
                description:
                  '해당 스터디가 열리던 말던 언제까지 유지할지를 결정하는 날짜 컬럼 ex ) 2022-12-30 이라하면 해당 스터디는 12월30일에 delete된다',
              },
              status: {
                type: 'integer',
                description:
                  '해당 스터디의 상태 ex) 0 = 모집중 , 1 = 인원마감 , 2 = 진행중 , 3 = 완료 근데 완료가 굳이 필요할까싶은...',
              },
              createdAt: {
                type: 'date',
                description:
                  "이 스터디가 언제 개설되었는지 그 '개설'버튼을 누른 즉시 날짜가 기록되는 컬럼",
              },
              updatedAt: {
                type: 'date',
                description:
                  '혹시나 스터디의 정보가 수정된다면 언제 update됬는지 update(수정)버튼을 누른 즉시 그 날짜가 기록되는 컬럼',
              },
              deletedAt: {
                type: 'date',
                description: '스터디가 언제 삭제되었는지 기록되는 컬럼',
              },
            },
          },
        },
      },

      apiViewDetail_Study_No_ResponseForm_Failed: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패 하면 studyInfo 추출중에 서버내 알수없는 에러발생 이라는 메세지가 출력된다`,
          },
        },
      },

      apiCloseStudyRequestForm: {
        properties: {
          study_no: {
            type: 'integer',
            description:
              '누가 어떤 스터디에 참여하는지를 알아야하니 study_no 즉 스터디의 고유 DB Index번호를 알아야한다',
          },
        },
      },

      apiCloseStudy_ResponseForm_Success: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: `성공하면 study delete success 이란 메세지가 리턴된다`,
          },
        },
      },

      apiCloseStudy_ResponseForm_Failed: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패 하면 study delete 중 알수없는 에러가 서버내에서 발생 : error 또는 이미 삭제된 데이터일수 있습니다 라는 메세지가 리턴된다 확인마지막 용량때문에....`,
          },
        },
      },

      apiAuthMsgCodeRequestForm: {
        properties: {
          tel: {
            type: 'string',
            description: '더도덜도말고 01011112222 이렇게 -도 ,도 필요없이 번호만 딸랑 주세용',
          },
        },
      },

      apiAuthMessageCode_ResponseForm_Success: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: `성공하면 sms sent 이란 메세지가 리턴된다`,
          },
        },
      },

      apiAuthMessageCode_ResponseForm_Failed404: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 404이 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패 하면 SMS not sent error 라는 메세지가 리턴된다 확인마지막 용량때문에....`,
          },
        },
      },

      apiAuthMessageCode_ResponseForm_Failed500: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패 하면 회원가입 인증 SMS sent 에서 알수없는 서버 에러발생 sms server returned...등 라는 메세지가 리턴된다 확인마지막 용량때문에....`,
          },
        },
      },

      apiAuthMsgVerifyRequestForm: {
        properties: {
          tel: {
            type: 'string',
            description: '더도덜도말고 01011112222 이렇게 -도 ,도 필요없이 번호만 딸랑 주세용',
          },
          SMSMsg: {
            type: 'string',
            description: '인증번호 6자리 받은거 띡 주세용',
          },
        },
      },

      apiAuthMessageVerify_ResponseForm_Success: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: `성공하면 회원가입 SMS메세지 인증 성공 ! 이란 메세지가 리턴된다`,
          },
        },
      },

      apiAuthMessageVerify_ResponseForm_Failed500: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패 하면 회원가입 SMS메세지 인증에서 에러발생 message : e 라는 메세지가 리턴된다 확인마지막 용량때문에....`,
          },
        },
      },

      apiAuthMessageVerify_ResponseForm_Failed502: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 502이 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패 하면 회원가입 SMS메세지 인증 실패 , 인증번호 불일치 라는 메세지가 리턴된다 확인마지막 제발빌드되어줘 21`,
          },
        },
      },

      apiAuthMsgFindPwRequestForm: {
        properties: {
          id: {
            type: 'string',
            description: '가입한 당시의 ID (로그인할때 쓰는거)',
          },
          tel: {
            type: 'string',
            description: '휴대폰번호 (01011112222 와 같이 -나 ,없는 쌩 번호)',
          },
        },
      },

      apiAuthMsgFindPw_ResponseForm_Success200: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: `성공하면 New Pw Genned & SMS sent 이란 메세지가 리턴된다`,
          },
        },
      },
      apiAuthMsgFindPw_ResponseForm_Failed500: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패하면 패스워드 찾기/재발급 SMS sent 에서 알수없는 서버 에러발생 이라는 메세지가 리턴된다`,
          },
        },
      },
      apiAuthMsgFindPw_ResponseForm_Failed404: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 404가 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패하면 SMS not sent error 이란 메세지가 리턴된다`,
          },
        },
      },

      apiAuthModifyPwRequestForm: {
        properties: {
          id: {
            type: 'string',
            description: '가입한 당시의 ID (로그인할때 쓰는거)',
          },
          newPw: {
            type: 'string',
            description: '새롭게 변경을 원하는 비밀번호',
          },
          pw: {
            type: 'string',
            description: '본인확인용 기존의 비밀번호',
          },
        },
      },
      apiAuthModifyPw_ResponseForm_Success200: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: `성공하면 비밀번호 변경 성공 이란 메세지가 리턴된다`,
          },
        },
      },
      apiAuthModifyPw_ResponseForm_Failed202: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 202가 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패하면 현재 비밀번호 인증 실패 라는 메세지가 리턴된다`,
          },
        },
      },
      apiAuthModifyPw_ResponseForm_Failed203: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 203이 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패하면 현재와 동일한 비밀번호 라는 메세지가 리턴된다`,
          },
        },
      },
      apiAuthModifyPw_ResponseForm_Failed500: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패하면 비밀번호 변경 중 서버내 알수없는 에러발생 이란 메세지가 리턴된다`,
          },
        },
      },
      apiAuthModifyNickNameRequestForm: {
        properties: {
          id: {
            type: 'string',
            description: '가입한 당시의 ID (로그인할때 쓰는거)',
          },
          newNickName: {
            type: 'string',
            description: '새롭게 변경을 원하는 닉네임',
          },
          nickName: {
            type: 'string',
            description: '본인확인용 기존의 닉네임',
          },
        },
      },
      apiAuthModifyNickName_ResponseForm_Success200: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: `성공하면 닉네임 변경 성공 이란 메세지가 리턴된다`,
          },
        },
      },
      apiAuthModifyNickName_ResponseForm_Failed203: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 203이 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패하면 현재 닉네임과 수정하려는 닉네임이 같습니다 라는 메세지가 리턴된다`,
          },
        },
      },
      apiAuthModifyNickName_ResponseForm_Failed405: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 405가 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패하면 존재하지 않는 닉네임입니다 라는 메세지가 리턴된다`,
          },
        },
      },
      apiAuthModifyNickName_ResponseForm_Failed500: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패하면 닉네임 변경 중 서버 내 알 수 없는 에러발생 이란 메세지가 리턴된다`,
          },
        },
      },
      apiAuthWithdrawalRequestForm: {
        properties: {
          id: {
            type: 'string',
            description: '본인 확인용 기존 아이디',
          },
        },
      },
      apiAuthWithdrawal_ResponseForm_Success200: {
        properties: {
          code: {
            type: 'integer',
            description: '성공하면 코드 200이 리턴된다',
          },
          message: {
            type: 'string',
            description: `성공하면 회원탈퇴를 완료하였습니다 라는 메세지가 리턴된다`,
          },
        },
      },
      apiAuthWithdrawal_ResponseForm_Failed405: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 405가 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패하면 존재하지 않는 아이디입니다 라는 메세지가 리턴된다`,
          },
        },
      },
      apiAuthWithdrawal_ResponseForm_Failed500: {
        properties: {
          code: {
            type: 'integer',
            description: '실패하면 코드 500이 리턴된다',
          },
          message: {
            type: 'string',
            description: `실패하면 회원 탈퇴 중 서버 내 알 수 없는 에러발생 이란 메세지가 리턴된다`,
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './swagger/*'],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
