import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import LayoutDetailPage from '../../layouts/LayoutDetailPage';

export default function Account() {
  const navigate = useNavigate();

  const id = useSelector((state) => state.user.id);
  const name = useSelector((state) => state.user.name);
  const nick = useSelector((state) => state.user.nick);

  const goChangePw = () => {
    navigate('/detail/changepw');
  };
  const goChangeNick = () => {
    navigate('/detail/changenick');
  };
  return (
    <LayoutDetailPage>
      <MainContainer>
        <InfoContainer>
          <div className="myinfo-title">내 정보</div>
          <div className="myinfo-content">
            <ul className="info-list">
              <li className="list-item">
                <div className="item-label">이름</div>
                <div className="item-data">{name}</div>
              </li>
              <li className="list-item">
                <div className="item-label">아이디</div>
                <div className="item-data">{id}</div>
              </li>
              <li className="list-item">
                <div className="item-label">닉네임</div>
                <div className="item-data">{nick}</div>
                <div className="item-change" onClick={goChangeNick}>
                  변경하기
                </div>
              </li>
            </ul>
          </div>
        </InfoContainer>
        <ButtonContainer>
          <div className="movePage" onClick={goChangePw}>
            비밀번호 변경하기
          </div>
          <div className="movePage">회원 탈퇴</div>
        </ButtonContainer>
      </MainContainer>
    </LayoutDetailPage>
  );
}

const MainContainer = styled.div`
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  height: calc(100vh - 60px);
  background-color: #faf6f2;
  background-size: cover;
`;

const InfoContainer = styled.div`
  display: block;
  position: relative;
  box-sizing: border-box;
  margin: 38px 30px;
  padding: 0 30px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 13px;

  .myinfo-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 52px;
    font-size: 18px;
    border-bottom: 1px solid #dfdfdf;
    text-align: center;
  }

  .myinfo-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    font-size: 15px;
    padding: 10px 0;
  }

  .info-list {
    width: 100%;
  }
  .list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    padding: 18px 0;
  }

  .item-label {
    font-weight: 600;
    width: 80px;
  }

  .item-data {
    flex-grow: 2;
  }

  .item-change {
    font-size: 13px;
    font-weight: 350;
    color: #e47b00;
    width: 60px;
    text-align: center;
    border: 0.5px solid #e47b00;
    border-radius: 4px;
    padding 2px 0;
  }
`;

const ButtonContainer = styled.div`
  display: block;
  position: absolute;
  bottom: 40px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
  text-align: center;

  .movePage {
    height: 42px;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    font-size: 15px;
    line-height: 44px;

    &:nth-child(2) {
      margin-top: 22px;
    }
  }
`;
