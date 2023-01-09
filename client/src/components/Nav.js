import React, { useState, useRef } from "react";
import styled from "styled-components";

export default function MainCategory({ selected, changeCategory }) {
  return (
    <NavContainer>
      <div
        className={selected === "code" ? "navBox addColor" : "navBox"}
        onClick={() => changeCategory("code")}
      >
        프로그래밍
      </div>
      <div
        className={selected === "sing" ? "navBox addColor" : "navBox"}
        onClick={() => changeCategory("sing")}
      >
        보컬댄스
      </div>
      <div
        className={selected === "design" ? "navBox addColor" : "navBox"}
        onClick={() => changeCategory("design")}
      >
        디자인
      </div>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  height: 31px;
  display: flex;
  color: #f4ede7;
  margin-top: 22px;
  padding: 0 30px;
  margin-bottom: 32px;

  .navBox {
    margin: 0 2px;
    color: #000000;
    background-color: #f4ede7;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    text-align: center;
    flex-grow: 1;

    font-weight: 400;
    font-size: 15px;
    line-height: 17px;
    letter-spacing: 0.025em;
  }

  .addColor {
    color: white;
    font-weight: 700;
    background-color: black;
  }
`;
