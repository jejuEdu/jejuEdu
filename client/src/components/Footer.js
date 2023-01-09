import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';

export default function Footer() {
  const [page, setPage] = useState('search');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setPage(pathname);
  }, [pathname]);

  const goSearch = () => {
    navigate('/home');
  };

  const goJoin = () => {
    navigate('/detail/partyjoin');
  };

  const goProfile = () => {
    navigate('/profile');
  };

  return (
    <FooterContainer>
      <div onClick={goSearch}>
        <FiSearch className="icon" color={page === '/home' ? '#000000' : '#bababa'} />
        <p className="iconText">스터디 탐색</p>
      </div>
      <div>
        <AiOutlinePlus className="plusbtn" onClick={goJoin} />
        <p className="iconText">스터디 생성</p>
      </div>
      <div onClick={goProfile}>
        <BsFillPersonFill className="icon" color={page === '/profile' ? '#000000' : '#bababa'} />
        <p className="iconText">스터디 관리</p>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 60px;
  font-size: 48px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 20;
  background: #faf6f2;

  .iconText {
    font-size: 8px;
    margin-top: 10px;
  }

  .plusbtn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    color: white;
    background-color: black;
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon {
      height: 24px;
    }
  }
`;
