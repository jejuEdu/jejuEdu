import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../store/userSlice';
import axios from 'axios';

import styled from 'styled-components';

import { Input, Button } from '../../components/form';
import LayoutDetailPage from '../../layouts/LayoutDetailPage';
import CommonModal from '../../components/modals/CommonModal';

import iconSuccess from '../../img/icon-success.png';

const CHECK_NICKNAME_DEFAULT = { type: '', text: '' };

export default function ChangeNick() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user);
  const [newNick, setNewNick] = useState('');
  const [checkNickname, setCheckNickname] = useState({ type: '', text: '' });
  const [openModal, setOpenModal] = useState(false);

  // 닉네임 유효성 체크
  useEffect(() => {
    newNick === userInfo.nick
      ? setCheckNickname({ type: 'WARN', text: '기존 닉네임과 동일합니다.' })
      : setCheckNickname(CHECK_NICKNAME_DEFAULT);
  }, [newNick]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkNickname.type === 'WARN') {
      alert('기존 닉네임과 동일합니다.');
      return;
    }

    const body = {
      id: userInfo.id,
      newNickName: newNick,
      nickName: userInfo.nick,
    };
    axios.post(`/api/auth/modifyNickName`, body).then((response) => {
      if (response.data.code === 200) {
        dispatch(saveUser({ ...userInfo, nick: newNick }));
        setOpenModal(!openModal);
      } else {
        alert('변경실패 : 서버오류');
      }
    });
  };

  return (
    <LayoutDetailPage>
      <ChangeNickContainer>
        <ChangeNickForm onSubmit={handleSubmit}>
          <Input
            label="닉네임*"
            placeholder="닉네임을 입력해주세요."
            value={newNick || ''}
            setValue={setNewNick}
            desc={checkNickname}
            style={{ marginBottom: '20px', marginTop: '52px' }}
            maxLength={16}
          />

          <Button
            text="닉네임 변경하기"
            style={{ position: 'absolute', bottom: '20px' }}
            disabled={!newNick || checkNickname.type === 'WARN'}
          />
        </ChangeNickForm>
      </ChangeNickContainer>
      <CommonModal
        toggle={openModal}
        setToggle={() => navigate('/detail/account')}
        submitBtnLabel="확인"
        submitBtnOnClick={() => navigate('/detail/account')}
      >
        <img src={iconSuccess} alt="경고아이콘"></img>
        닉네임 변경을 완료했습니다.
      </CommonModal>
    </LayoutDetailPage>
  );
}
const ChangeNickForm = styled.form`
  margin: 32px 32px;
  display: block;
  height: calc(100% - 100px);
  position: relative;
  .header-goback {
    float: left;
    color: #727272;
  }
  .header-title {
    text-align: center;
  }
`;

const ChangeNickContainer = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 60px);
  width: 100%;
  position: absolute;
  background: #faf6f2;
  background-size: cover;
`;
