import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Modal = ({
  children,
  toggle,
  setToggle,
  submitBtnLabel,
  submitBtnOnClick,
  cancleBtnLabel,
  cancleBtnOnClick,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log(toggle, children);
    if (toggle) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [toggle]);
  console.log(toggle);
  return (
    <>
      {visible && (
        <CustomModalContainer visible={visible} toggle={toggle}>
          <DimmedScreen onClick={setToggle} />
          <ModalContainer>
            <p>{children}</p>
            {(cancleBtnLabel || submitBtnLabel) && (
              <ButtonContainer>
                {cancleBtnLabel && <div onClick={cancleBtnOnClick}>{cancleBtnLabel}</div>}
                {submitBtnLabel && <div onClick={submitBtnOnClick}>{submitBtnLabel}</div>}
              </ButtonContainer>
            )}
          </ModalContainer>
        </CustomModalContainer>
      )}
    </>
  );
};

const CustomModalContainer = styled.div`
  visibility: ${(props) => (props.toggle ? 'visible' : 'hidden')};
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  animation: ${(props) => (props.toggle ? fadeIn : fadeOut)} 0.15s ease-out;
  transition: visibility 0.15s ease-out;
  z-index: 1000;
`;

const DimmedScreen = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  display: grid;
  grid-template-rows: auto 42px;
  transform: translate(-50%, -50%);
  width: calc(100% - 40px);
  min-height: 150px;
  background: #fff;
  border-radius: 20px;
  z-index: 1000;
  overflow: hidden;
  ont-family: 'NanumSquare Neo';
  ont-family: 'NanumSquare Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 17px;
  text-align: center;

  color: #000000;

  color: #000000;

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      display: block;
      margin-bottom: 10px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;

  div {
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: solid 0.5px #e47b00;

    &:nth-child(2) {
      border-left: solid 0.5px #e47b00;
      color: #e47b00;
    }
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
export default Modal;
