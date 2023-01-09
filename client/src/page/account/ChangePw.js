import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Input, Button } from '../../components/form';
import styled from 'styled-components';

import CommonModal from '../../components/modals/CommonModal';
import axios from 'axios';
import LayoutDetailPage from '../../layouts/LayoutDetailPage';
import iconWarning from '../../img/icon-warning.png';

/**
 * 2022-12-18 hssuh
 * 패스워드 변경
 */
export default function ChangePw() {
  const navigate = useNavigate();

  const id = useSelector((state) => state.user.id);

  const [pw, setPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwConfirm, setNewPwConfirm] = useState('');

  const pwRef = useRef(false);
  const newPwRef = useRef(false);
  const newPwConfirmRef = useRef(false);

  const [pwDesc, setPwDesc] = useState({});
  const [newPwDesc, setNewPwDesc] = useState({
    type: 'DEFAULT',
    text: '8~16자의 영문,숫자, 특수문자를 사용해주세요.',
  });
  const [newPwConfirmDesc, setNewPwConfirmDesc] = useState({});

  const [pwOk, setPwOk] = useState(false);
  const [newPwOk, setNewPwOk] = useState(false);
  const [newPwConfirmOk, setNewPwConfirmOk] = useState(false);

  const [totalOk, setTotalOk] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const pwValidCheck = () => {
    if (pw.length < 8) {
      setPwOk(false);
      setPwDesc({ type: 'WARN', text: '8자 이상 입력해주세요.' });
    } else {
      setPwOk(true);
      setPwDesc({});
    }
  };

  const newPwValidCheck = () => {
    if (newPw.length < 8) {
      setNewPwOk(false);
      setNewPwDesc({ type: 'WARN', text: '8자 이상 입력해주세요.' });
    } else {
      setNewPwOk(true);
      setNewPwDesc({ type: 'SUCCESS', text: '적합한 비밀번호 입니다.' });
    }
  };

  const newPwConfirmValidCheck = () => {
    if (newPw !== newPwConfirm) {
      setNewPwConfirmOk(false);
      setNewPwConfirmDesc({
        type: 'WARN',
        text: '비밀번호가 일치하지 않습니다.',
      });
    } else {
      setNewPwConfirmOk(true);
      setNewPwConfirmDesc({ type: 'SUCCESS', text: '비밀번호가 일치합니다.' });
    }
  };

  const totalValidCheck = () => {
    return pwOk && newPwOk && newPwConfirmOk;
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const handleSubmit = () => {
    const body = {
      id: id,
      pw: pw,
      newPw: newPw,
    };

    axios
      .post(`/api/auth/modifyPW`, body)
      .then((response) => {
        if (response.data.code === 200) {
          navigate('/detail/login');
        } else if (response.data.code === 202) {
          setPwOk(false);
          setPwDesc({ type: 'WARN', text: '현재 비밀번호가 아니에요' });
        } else if (response.data.code === 203) {
          setNewPwOk(false);
          setNewPwDesc({ type: 'WARN', text: response.data.message });
        } else {
          alert('변경실패 : 서버오류');
        }
      })
      .finally(() => setOpenModal(false));
  };

  useEffect(() => {
    if (pwRef.current) pwValidCheck();
    else pwRef.current = true;
  }, [pw]);

  useEffect(() => {
    if (newPwRef.current) newPwValidCheck();
    else newPwRef.current = true;
  }, [newPw]);

  useEffect(() => {
    if (newPwConfirmRef.current) newPwConfirmValidCheck();
    else newPwConfirmRef.current = true;
  }, [newPwConfirm]);

  useEffect(
    () => setTotalOk(totalValidCheck()),
    [pw, newPw, newPwConfirm, pwOk, newPwOk, newPwConfirmOk],
  );

  return (
    <LayoutDetailPage>
      <ChangePwContainer>
        <ChangePwForm onSubmit={handleClick}>
          <Input
            label="현재 비밀번호*"
            name="pw"
            placeholder="현재 사용하고 있는 비밀번호를 입력해주세요"
            value={pw}
            setValue={setPw}
            desc={pwDesc}
            style={{ marginBottom: '20px', marginTop: '52px' }}
            maxLength={16}
            password
          />
          <Input
            label="변경하실 비밀번호*"
            name="newPw"
            placeholder="변경하실 비밀번호를 입력해주세요"
            value={newPw}
            setValue={setNewPw}
            desc={newPwDesc}
            style={{ marginBottom: '20px' }}
            maxLength={16}
            password
          />
          <Input
            label="변경하실 비밀번호 확인*"
            name="newPwConfirm"
            placeholder="변경하실 비밀번호를 입력해주세요"
            value={newPwConfirm}
            setValue={setNewPwConfirm}
            desc={newPwConfirmDesc}
            style={{ marginBottom: '20px' }}
            maxLength={16}
            password
          />
          <Button
            text="비밀번호 변경완료"
            style={{ position: 'absolute', bottom: '20px' }}
            disabled={!totalOk}
          />
        </ChangePwForm>
        <CommonModal
          toggle={openModal}
          setToggle={() => setOpenModal(!openModal)}
          submitBtnLabel="비밀번호 변경"
          cancleBtnLabel="취소"
          submitBtnOnClick={handleSubmit}
          cancleBtnOnClick={() => setOpenModal(false)}
        >
          <img src={iconWarning} alt="경고아이콘"></img>
          비밀번호를 변경하시겠어요?
        </CommonModal>
      </ChangePwContainer>
    </LayoutDetailPage>
  );
}

const ChangePwForm = styled.form`
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

const ChangePwContainer = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 60px);
  width: 100%;
  position: absolute;
  background: #faf6f2;
  background-size: cover;
`;
