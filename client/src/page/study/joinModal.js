import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { MdPeopleAlt } from 'react-icons/md';

import tree_1_1x from '../../img/tree_1_1x.png';
import tree_2_1x from '../../img/tree_2_1x.png';
import tree_3_1x from '../../img/tree_3_1x.png';
import tree_4_1x from '../../img/tree_4_1x.png';

const status = {
  create: {
    title: '스터디가 만들어졌어요!',
    detail: '이제 내 나무에 물을 줄<br/>스터디원을 기다리면 돼요!',
    link_title: '링크로 홍보하기',
    link: '/profile',
  },
  join: {
    title: '스터디에 참여완료!',
    detail: '이제 내 나무에 물을 줄<br/>스터디원을 기다리면 돼요!',
    link_title: '다른 스터디 보러가기',
    link: '/profile',
  },
  close: {
    title: '스터디 종료!',
    detail: '오늘도 보람찬 하루를 보내셨군요:)<br/>수확에 성공했어요!',
    link_title: '수확 현황 확인하러가기',
    link: '/profile',
  },
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  textAlign: 'center',
  p: 4,
};

export default function JoinModal({ type, open, setOpen, count, limit }) {
  const navigate = useNavigate();
  const move = () => navigate(status[type]['link']);

  const handleImage = (num) => {
    switch (Math.floor(num / 4)) {
      case 1:
        return tree_2_1x;
      case 2:
        return tree_3_1x;
      case 3:
        return tree_4_1x;
      default:
        return tree_1_1x;
    }
  };
  return (
    open && (
      <CustomModalContainer visible={open}>
        <DimmedScreen onClick={setOpen} />
        <ModalContainer>
          <ModalHeader>
            <p>
              <b>{status[type].title}</b>
            </p>
            <ImageContainer>
              <img src={handleImage(count)} alt="modal 이미지" />
            </ImageContainer>
          </ModalHeader>
          <ModalBody>
            <div dangerouslySetInnerHTML={{ __html: status[type]['detail'] }} />
          </ModalBody>
          <ModalFooter>
            <p className="mixMember">
              <MdPeopleAlt size={17} style={{ verticalAlign: 'middle' }} />
              &nbsp;
              {count} / {limit}
            </p>
            <button className="listBtn" onClick={move}>
              다른 스터디 보러가기
            </button>
            <button className="closeBtn" onClick={() => setOpen(false)}>
              닫기
            </button>
          </ModalFooter>
        </ModalContainer>
      </CustomModalContainer>
    )
  );
}

const CustomModalContainer = styled.div`
  animation: ${(props) => (props.visible ? fadeIn : fadeOut)} 0.15s ease-out;
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
  grid-template-rows: auto 42px;
  transform: translate(-50%, -50%);
  width: calc(100% - 70px);
  height: calc(100% - 212px);
  background: #fff;
  border-radius: 20px;
  z-index: 1000;
  overflow: hidden;
  ont-family: 'NanumSquare Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 17px;
  text-align: center;
  color: #000000;

  img {
    height: 140px;
  }

  .join {
    background-color: black;
    color: white;
    width: 279px;
    height: 35px;
    line-height: 35px;
    border-radius: 25px;
  }
`;

const ModalHeader = styled.div`
  height: 50%;
  p {
    margin: 16px 54px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85%;
`;

const ModalBody = styled.div`
  display: table;
  height: 20%;
  margin: 0 auto;
  div {
    display: table-cell;
    vertical-align: middle;
  }
`;

const ModalFooter = styled.div`
  button {
    height: 33px;
    margin-top: 12px;
    border-radius: 25px;
    width: calc(100% - 15px);
  }

  .listBtn {
    border: 1px solid black;
    background-color: black;
    color: white;
  }

  .closeBtn {
    border: 1px solid #e47b00;
    background-color: #fff;
    color: #e47b00;
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
