import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

export default function ErrorPage() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/home');
  };

  return (
    <MainContainer>
      <div className="errorMessage">
        <h1 className="error_title">404</h1>
        <p className="error_content">요청하신 페이지를 찾을 수 없습니다!</p>
        <p className="error_detail">
          찾으시려는 페이지의 주소가 잘못 입력되었거나,<br></br>페이지 주소가 변경 또는 삭제되어
          더는 사용하실 수 없습니다. <br></br> 입력하신 페이지의 주소가 정확한지 다시 한번
          확인해주세요.
        </p>
        <div className="movePage" onClick={goHome}>
          홈으로 돌아가기
        </div>
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 0 24px;

  .error_title {
    font-size: 80px;
    color: #e47b00;
  }

  .error_content{
    font-size: 18px;
    padding: 20px 0;
    font-weight: 600;
  }

  .error_detail {
    font-size: 16px;
    line-height: 24px;
    white-space:pre-wrap;
    color: #666666;
    padding: 30px 0;
  }

  .movePage {
    height: 42px;
    background: #e47b00;
    border-radius: 20px;
    font-size: 15px;
    line-height: 44px;
    color: #ffffff;
`;
