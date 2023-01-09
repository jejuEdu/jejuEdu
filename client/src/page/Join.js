import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Checkbox, Button, InputWithBtn } from "../components/form";
import CommonModal from "../components/modals/CommonModal";

import fir from "../img/fir.png";
import { BsChevronLeft, BsCheckCircle } from "react-icons/bs";
import iconWarning from "../img/icon-warning.png";
import LayoutDetailPage from "../layouts/LayoutDetailPage";

/**
 * 2022-12-12 hssuh
 * 회원가입
 */
export default function Join() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nick, setNick] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [check, setCheck] = useState(false);

  const [idDesc, setIdDesc] = useState({
    type: "DEFAULT",
    text: "6~20자의 영문,숫자만 입력해주세요.",
  });
  const [pwDesc, setPwDesc] = useState({
    type: "DEFAULT",
    text: "8~16자의 영문,숫자,특수문자를 사용해주세요.",
  });
  const [pwConfirmDesc, setPwConfirmDesc] = useState({});

  const [idOk, setIdOk] = useState(false);
  const [pwOk, setPwOk] = useState(false);
  const [pwConfirmOk, setPwConfirmOk] = useState(false);

  const [totalOk, setTotalOk] = useState(false);

  const idMount = useRef(false);
  const pwMount = useRef(false);
  const pwConfirmMount = useRef(false);

  const [openModal, setOpenModal] = useState(false);
  const [modalMsg, setModalMsg] = useState({ type: "", text: "" });

  const totalValidCheck = () => {
    return name !== "" && nick !== "" && idOk && pwOk && pwConfirmOk && check;
  };

  const idValidCheck = () => {
    if (id.length < 6)
      setIdDesc({ type: "WARN", text: "6자 이상 입력해주세요." });
    else setIdDesc({ type: "WARN", text: "아이디 중복확인을 해주세요." });
    setIdOk(false);
  };

  const pwValidCheck = () => {
    setPwConfirmDesc({});
    setPwConfirmOk(false);
    if (password.length < 8) {
      setPwOk(false);
      setPwDesc({ type: "WARN", text: "8자 이상 입력해주세요." });
    } else {
      setPwOk(true);
      setPwDesc({ type: "SUCCESS", text: "적합한 비밀번호 입니다." });
    }
  };

  const pwConfirmCheck = () => {
    if (password !== passwordConfirm) {
      setPwConfirmOk(false);
      setPwConfirmDesc({ type: "WARN", text: "비밀번호가 일치하지 않습니다." });
    } else {
      setPwConfirmOk(true);
      setPwConfirmDesc({ type: "SUCCESS", text: "비밀번호가 일치합니다." });
    }
  };

  const handleConfirmId = () => {
    axios.post("/api/auth/checkDupId", { id: id }).then((res) => {
      if (res.data?.code === 200) {
        setIdDesc({ type: "SUCCESS", text: "사용 가능한 아이디입니다." });
        setIdOk(true);
      } else {
        setIdDesc({ type: "WARN", text: "중복된 아이디입니다." });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      id: e.target.id.value,
      pw: e.target.pw.value,
      name: e.target.name.value,
      nick: e.target.nick.value,
    };

    axios.post(`/api/auth/join`, body).then((response) => {
      if (response.data.success === 200) {
        setOpenModal(true);
        setModalMsg({ type: "success", text: "가입을 완료했습니다." });
      } else {
        setOpenModal(true);
        setModalMsg({ type: "fail", text: "가입 실패" });
      }
    });
  };

  useEffect(() => {
    if (idMount.current) idValidCheck();
    else idMount.current = true;
  }, [id]);
  useEffect(() => {
    if (pwMount.current) pwValidCheck();
    else pwMount.current = true;
  }, [password]);
  useEffect(() => {
    if (pwConfirmMount.current) pwConfirmCheck();
    else pwConfirmMount.current = true;
  }, [passwordConfirm]);
  useEffect(
    () => setTotalOk(totalValidCheck()),
    [name, nick, idOk, pwOk, pwConfirmOk, check]
  );

  return (
    <LayoutDetailPage>
      <JoinContainer>
        <JoinForm onSubmit={handleSubmit}>
          <ImageContainer>
            <img src={fir} alt="logo" />
          </ImageContainer>
          <Input
            label="이름*"
            name="name"
            placeholder="이름을 입력해주세요."
            style={{ marginBottom: "20px" }}
            maxLength={10}
            value={name}
            setValue={setName}
          />
          <Input
            label="닉네임*"
            name="nick"
            placeholder="활동명으로 사용할 닉네임을 입력해주세요."
            style={{ marginBottom: "20px" }}
            maxLength={10}
            value={nick}
            setValue={setNick}
          />
          <InputWithBtn
            label="아이디*"
            name="id"
            placeholder="아이디를 입력해주세요."
            desc={idDesc}
            style={{ marginBottom: "20px" }}
            maxLength={20}
            btnTitle="중복확인"
            onClick={handleConfirmId}
            value={id}
            setValue={setId}
          />
          <Input
            label="비밀번호*"
            name="pw"
            placeholder="비밀번호를 입력해주세요."
            password
            desc={pwDesc}
            value={password}
            setValue={setPassword}
            style={{ marginBottom: "20px" }}
            maxLength={16}
          />
          <Input
            label="비밀번호 확인*"
            placeholder="비밀번호를 다시 입력해주세요."
            password
            desc={pwConfirmDesc}
            value={passwordConfirm}
            setValue={setPasswordConfirm}
            style={{ marginBottom: "20px" }}
            maxLength={16}
          />
          {/*<InputWithBtn label="휴대폰인증*" placeholder="'-' 없이 입력해주세요." btnTitle="인증요청"/>*/}
          <Checkbox
            label={
              "젠프라의 <b>서비스이용약관, 개인정보 취급 방침</b>에 동의합니다. (필수)"
            }
            value={check}
            setValue={setCheck}
            style={{ marginTop: "50px" }}
          />
          <Button
            text="회원가입 완료하기"
            marginTop="44px"
            disabled={!totalOk}
          />
        </JoinForm>
        <CommonModal
          toggle={openModal}
          setToggle={() => setOpenModal(!openModal)}
          submitBtnLabel="닫기"
          submitBtnOnClick={() => navigate("/detail/login")}
        >
          {modalMsg.type === "fail" ? (
            <img src={iconWarning} alt="경고아이콘" />
          ) : (
            <BsCheckCircle color="orange" size="32" marginBottom="10px" />
          )}
          {modalMsg.text}
        </CommonModal>
      </JoinContainer>
    </LayoutDetailPage>
  );
}

const JoinForm = styled.form`
  margin: 32px 32px;
  .header-goback {
    float: left;
    color: #727272;
  }
  .header-title {
    text-align: center;
  }
`;

const JoinContainer = styled.div`
  position: absolute;
  background: #faf6f2;
  background-size: cover;
`;

const ImageContainer = styled.div`
  text-align: center;
  margin: 38px auto 38px;
`;
