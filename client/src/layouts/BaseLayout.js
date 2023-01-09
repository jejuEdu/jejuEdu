import React from "react";
import styled from "styled-components";

const BasePage = styled.div``;

const LayoutBasePage = ({ children }) => {
  return <BasePage id="body">{children}</BasePage>;
};

export default LayoutBasePage;
