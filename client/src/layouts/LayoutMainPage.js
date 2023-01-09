import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Titlebar from "../components/Titlebar";
import BaseLayout from "./BaseLayout";

const LayoutMainPage = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <BaseLayout>
      <Titlebar open={open} setOpen={setOpen} />
      <Content open={open}>{children}</Content>
      <Footer />
    </BaseLayout>
  );
};

export default LayoutMainPage;

const Content = styled.main`
  width: 100%;
  height: calc(100vh - 120px);
  position: fixed;
  top: 60px;
  left: 0;
  z-index: ${({ open }) => (open ? 20 : 200)};
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #faf6f2;

  padding: 0 24px;
  box-sizing: border-box;
  border-radius: 24px 24px 0 0;
`;
