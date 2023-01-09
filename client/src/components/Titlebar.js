import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components'; // 1.컴포넌트 추가
import { logout } from './func';
import CommonModal from './modals/CommonModal';
// 2.이미지 불러옴
import fir from '../img/logo_white.png';
import backbtn from '../img/icon-back.svg';
import normalFruit from '../img/normal_fruit.png';
import sickFruit from '../img/sick_fruit.png';
import iconWarning from '../img/icon-warning.png';

// height & align 맞추기
// 3.타이틀바 : 로고(img), 메뉴(StyledBurger)
export default function Titlebar({ open, setOpen }) {
  const [bg, setBg] = useState('#E47B00');

  return (
    <TitlebarContainer bg={bg}>
      <img src={fir} alt="logo" width="67px" height="21px" />
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <Menu open={open} setOpen={setOpen} />
    </TitlebarContainer>
  );
}

export function DetailTitlebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [title, setTitle] = useState('');
  const [bg, setBg] = useState('#FAF6F2');
  const [none, setNone] = useState('');

  useEffect(() => {
    switch (pathname) {
      case '/detail/login':
        return setTitle('로그인하기');
      case '/detail/account':
        return setTitle('계정 관리');
      case '/detail/changepw':
        return setTitle('비밀번호 변경');
      case '/detail/changenick':
        return setTitle('닉네임 변경');
      case '/detail/partyjoin':
        return setTitle('스터디 개설하기'), setBg('#ffffff');
      case '/detail/join':
        return setTitle('회원가입');
      default:
        return setTitle(''), setNone('none');
    }
  }, [pathname]);

  return (
    <TitlebarContainer detail={true} bg={bg} none={none}>
      <div className="backbtn" onClick={() => navigate(-1)}>
        <img src={backbtn} alt="뒤로가기" height="24px" />
      </div>
      <div className="title">{title}</div>
    </TitlebarContainer>
  );
}

// 3-1.타이틀바 전체 스타일 정의
const TitlebarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: #ffffff;
  z-index: 100;

  /* border-bottom: ${({ detail }) => (detail ? 'none' : '1px solid #dddddd')}; */

  width: 100%;
  height: 60px;
  font-size: 48px;
  left: 0;
  bottom: 0;
  background: ${(props) => props.bg};
  box-sizing: border-box;
  width: 100%;
  padding: 0px 24px;
  display: ${(props) => props.none};

  .plusbtn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    color: white;
    background-color: black;
  }

  .backbtn {
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    margin-left: 12px;
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
    color: #000000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

//3-2.메뉴 버튼 스타일 정의 (메뉴버튼-닫기버튼 바뀌는거)
const StyledBurger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;

  &:focus {
    outline: none;
  }

  div {
    width: 1.5rem;
    height: 0.15rem;
    background: ${({ open }) => (open ? '#333333' : '#333333')};
    background-color: ${({ open }) => (open ? '#000000' : '#ffffff')};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 23px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(-20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
  }
`;

//4.슬라이딩 박스 : 로고, 유저이름, 열매현황, 액션버튼, 유틸메뉴, 저작권표기
const Menu = ({ open, setOpen }) => {
  let user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const goPartyJoin = () => {
    navigate('/detail/partyjoin');
  };
  const goJejuFruits = () => {
    navigate('#');
  };
  const gologin = () => {
    navigate('/detail/login');
  };
  const goJoin = () => {
    navigate('/detail/join');
  };
  const goAccount = () => {
    navigate('/detail/account');
  };
  const handleBackSpace = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (open) {
      document.body.classList.add('scroll_lock');
      return () => {
        document.body.classList.remove('scroll_lock');
      };
    }
  }, [open]);

  const [openModal, setOpenModal] = useState(false);

  const handleCommonModal = () => {
    setOpenModal(!openModal);
  };
  const modalSubmit = () => {
    logout(navigate);
    window.location.reload();
  };
  return (
    <>
      {open && <Dimmed onClick={handleBackSpace} />}
      <StyledMenu open={open}>
        <MenuHead>
          <LogoImg src={fir} alt="logo" />
        </MenuHead>
        {/* 로그인 상태일 때 */}
        {user.id && (
          <MenuContents>
            <div className="greeting">
              <div className="greeting-title">만나서 반가워요!</div>
              <div className="greeting-name">
                <p className="userName">
                  <span className="biColor">{user.nick}</span>님
                </p>
              </div>
            </div>

            <div className="fruit-dashboard">
              <div className="fruit-normal">
                <img
                  className="fruit_badge"
                  src={normalFruit}
                  alt="수확 열매"
                  width="40px"
                  height="40px"
                />
                <span className="fruit_type">수확 열매</span>
                <span className="fruit_count">
                  <b>{user.good_cnt}</b>개
                </span>
              </div>
              <div className="fruit-sick">
                <img
                  className="fruit_badge"
                  src={sickFruit}
                  alt="아픈 열매"
                  width="40px"
                  height="40px"
                />
                <span className="fruit_type">아픈 열매</span>
                <span className="fruit_count">
                  <b>{user.bad_cnt}</b>개
                </span>
              </div>
            </div>

            <GoMainActionBtn onClick={goPartyJoin}>스터디 만들기</GoMainActionBtn>

            <GoSubActionBtn onClick={goJejuFruits}>제주 열매 현황</GoSubActionBtn>

            <LinkItemGroup>
              <LinkItem onClick={() => navigate('#')}>이용약관</LinkItem>
              {/* 페이지 연결해야함 */}
              <LinkItem onClick={goAccount}>계정 관리</LinkItem>
              {/* 로그아웃 기능 넣어야함 */}
              <LinkItem onClick={() => handleCommonModal()}>로그아웃</LinkItem>
            </LinkItemGroup>
            <Copyright>Copyright © 2022 abang All Rights Reserved.</Copyright>
          </MenuContents>
        )}
        {/* 로그인 안한 상태일 때 */}
        {!user.id && (
          <MenuContents>
            <div className="greeting">
              <div className="greeting-title">만나서 반가워요!</div>
              <div className="greeting-name">
                <span className="biColor">스터디</span>를 시작해보세요.
              </div>
            </div>

            <div className="fruit-dashboard">
              <div className="fruit-normal">
                <img
                  className="fruit_badge"
                  src={normalFruit}
                  alt="수확 열매"
                  width="40px"
                  height="40px"
                />
                <span className="fruit_type">수확 열매</span>
                <span className="fruit_count">
                  <b>0</b>개
                </span>
              </div>
              <div className="fruit-sick">
                <img
                  className="fruit_badge"
                  src={sickFruit}
                  alt="아픈 열매"
                  width="40px"
                  height="40px"
                />
                <span className="fruit_type">아픈 열매</span>
                <span className="fruit_count">
                  <b>0</b>개
                </span>
              </div>
            </div>

            <GoMainActionBtn onClick={gologin}>로그인</GoMainActionBtn>

            <GoSubActionBtn onClick={goJoin}>회원가입</GoSubActionBtn>

            <Copyright>Copyright © 2022 abang All Rights Reserved.</Copyright>
          </MenuContents>
        )}
      </StyledMenu>

      <CommonModal
        toggle={openModal}
        setToggle={handleCommonModal}
        submitBtnLabel="로그아웃"
        cancleBtnLabel="취소"
        submitBtnOnClick={modalSubmit}
        cancleBtnOnClick={handleCommonModal}
      >
        <img src={iconWarning} alt="경고아이콘"></img>
        정말 로그아웃 하시겠습니까?
      </CommonModal>
    </>
  );
};

//4-1. 백그라운드 딤드 애니메이션 정의
const handleFade = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 100;
    }
`;

//4-2. 딤드 스타일 정의
const Dimmed = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);

  transform: all;
  animation: ${handleFade} 0.2s linear alternate;
`;

//4-3. 슬라이딩 박스 스타일 정의
const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  background: #faf6f2;
  transform: ${({ open }) => (open ? 'translateX(0px)' : 'translateX(105%)')};
  width: calc(80%);
  height: 100vh;
  text-align: left;
  position: fixed;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 100;

  filter: drop-shadow(-5px 0px 2px rgba(0, 0, 0, 0.3));

  .greeting {
    padding: 40px 20px 22px;
  }

  .greeting-title {
    font-size: 20px;
    font-weight: 400;
    padding-bottom: 10px;
  }

  .greeting-name {
    font-size: 24px;
    font-weight: 600;
    padding-bottom: 14px;
    border-bottom: 0.5px solid #4f4f4f;
  }

  .biColor {
    color: #e47b00;
  }

  .fruit-dashboard {
    background: #ffffff;
    padding: 0 14px;
    border: 1px solid #dddddd;
    margin: 0 20px;
    border-radius: 13px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }

  .fruit-normal {
    font-size: 16px;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #dddddd;
  }

  .fruit-sick {
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;
    padding: 10px 0;
  }

  .fruit_badge {
    margin-right: 10px;
  }

  .fruit_type {
    flex-grow: 10;
  }

  .fruit_count {
    text-align: right;
  }
`;

//4-4. 로고 이미지 스타일 정의
const LogoImg = styled.img`
  width: 67px;
  display: inline-block;
  margin-left: 20px;
`;

//4-5-1. 스터디 만들기 버튼 스타일 정의
const GoMainActionBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  border-radius: 30px;
  background-color: #e47b00;
  color: white;
  border: none;
  margin: 35px 20px 10px;
  font-size: 15px;
`;

//4-5-2. 제주 열매 현황 버튼 스타일 정의
const GoSubActionBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  border-radius: 30px;
  background-color: #ffffff;
  color: black;
  border: 1px solid #666666;
  margin: 0 20px;
  font-size: 15px;
`;

//4-6-1. 유틸메뉴 그룹 스타일정의
const LinkItemGroup = styled.div`
  margin-top: 50px;
`;

//4-6-2. 유틸메뉴 3개 스타일 정의
const LinkItem = styled.div`
  border-bottom: 1px solid #dddddd;
  text-align: right;
  margin: 5px 20px;
  padding: 10px 0px;
  color: #666666;
  font-size: 14px;
`;

//4-7. 슬라이딩 박스 영역 스크롤 정의
const MenuContents = styled.div`
  overflow: scroll;
`;

//4-8. 저작권 영역 스타일 정의
const Copyright = styled.div`
  font-size: 10px;
  color: #999999;
  margin: 40px 0;
  text-align: center;
`;

//4-9. 슬라이딩 박스 해드영역 스타일 정의
const MenuHead = styled.div`
  border-bottom: 1px solid #dddddd;
  height: 60px;
  min-height: 60px;
`;
