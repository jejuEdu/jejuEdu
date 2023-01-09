import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Titlebar, { DetailTitlebar } from '../components/Titlebar';
import BaseLayout from './BaseLayout';

const Content = styled.main`
  width: 100%;
  height: ${(props) => (props.top === 0 ? '100vh' : 'calc(100vh - 60px)')};
  position: fixed;
  top: ${(props) => props.top};
  left: 0;
  z-index: 300;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #faf6f2;
`;
const LayoutDetailPage = ({ children, top = '60px' }) => {
  return (
    <BaseLayout>
      <DetailTitlebar />
      <Content top={top}>{children}</Content>
    </BaseLayout>
  );
};

export default LayoutDetailPage;
