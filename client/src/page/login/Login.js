import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import fir from "../../img/fir.png";
import sec from "../../img/sec.png";

import { saveUser } from "../../store/userSlice";
import LayoutDetailPage from "../../layouts/LayoutDetailPage";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onUserIdHandler = (e) => {
    setUserId(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      id: userId,
      pw: password,
    };

    axios.post(`/api/auth/login`, body).then((response) => {
      if (response.data.code === 200) {
        dispatch(saveUser(response.data.userInfo));
        navigate("/home");
      } else {
        alert(response.data.message);
      }
    });
  };

  return (
    <LayoutDetailPage>
      <LoginContainer>
        <form className='submitForm' onSubmit={onSubmitHandler}>
          <div className='LoginHeader'>
            <h1 className='serviceName'>
              <img src={fir} alt='서비스 이름' />
            </h1>
            <p className='serviceSlogan'>
              <img src={sec} alt='서비스 슬로건' />
            </p>
          </div>
          <div className='LoginData'>
            <IdContainer>
              <input type='id' name='id' className='userId' placeholder='아이디' onChange={onUserIdHandler} />
            </IdContainer>
            <PwContainer>
              <input type='password' name='pw' className='userPw' onChange={onPasswordHandler} placeholder='비밀번호' />
            </PwContainer>
            <p className='lostPw'>비밀번호를 잊으셨나요?</p>
          </div>
          <div className='BtnBox'>
            <input type='submit' className='loginBtn' value='로그인' />
            <input type='button' className='signInBtn' onClick={() => navigate("/detail/join")} value='회원가입' />
          </div>
        </form>
      </LoginContainer>
    </LayoutDetailPage>
  );
}

const IdContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .userId {
    width: 100%;
    height: 42px;
    box-sizing: border-box;
    border-radius: 21px;
    padding: 10px;
    border: none;
    margin: 0 32px;
  }
`;

const PwContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;

  .userPw {
    box-sizing: border-box;
    width: 100%;
    height: 42px;
    border-radius: 21px;
    padding: 10px;
    border: none;
    margin: 0 32px;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #faf6f2;

  .LoginData {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .serviceName {
    display: flex;
    flex-direction: column;
    font-size: 50px;
  }

  .serviceSlogan {
    display: flex;
    flex-direction: column;
    font-size: 15px;
  }

  .submitForm {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 80vh;
    margin: 0 32px;
  }

  .lostPw {
    display: none;
    width: 100%;
    text-align: right;
    margin-top: 10px;
    font-size: 10px;
  }

  .BtnBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    .userPw {
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      border-radius: 30px;
      background-color: #e47b00;
      color: white;
      border: none;
      margin: 0 32px;
    }
  }

  .loginBtn {
    width: calc(100% - 64px);
    height: 40px;
    border-radius: 30px;
    background-color: #e47b00;
    color: white;
    border: none;
  }

  .signInBtn {
    width: calc(100% - 64px);
    height: 40px;
    border-radius: 30px;
    background-color: white;
    color: #e47b00;
    border: 1px solid #e47b00;
    margin-top: 10px;
  }
`;
