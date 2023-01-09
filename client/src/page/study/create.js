import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

import { MdPeopleAlt } from 'react-icons/md';

import JoinModal from './joinModal';
import Footer from '../../components/Footer';
import { BsChevronLeft } from 'react-icons/bs';
import LayoutDetailPage from '../../layouts/LayoutDetailPage';

export default function PartyJoin() {
  const navigate = useNavigate();
  const { kakao } = window;
  const [open, setOpen] = useState(false);
  const [peopleNum, setPeopleNum] = useState(1);
  const [category, setCategory] = useState('');

  const [name, setName] = useState('');

  const partyName = useRef(); // 스터디 이름
  const partyDate = useRef(); // 스터디 모임 날짜
  const partyClose = useRef(); // 스터디 모짐마감 날짜
  const partyAddress = useRef(); // 스터디 모임 장소
  const partyDesc = useRef(); // 스터디 상세설명
  const partyPeople = useRef();
  const [latLng, setLatLng] = useState();
  const [lonLng, setLonLng] = useState();
  // let latLng; // 사용자가 입력한 주소의 위도값
  // let lonLng; // 사용자가 입력한 주소의 경도값.

  let userId = useSelector((state) => {
    return state.user.id;
  });

  const [formData, setFormData] = useState({
    who_open: userId,
    study_title: '', // partyName
    study_category: '', // 값을 받아낼 좋은 방법 추천좀.
    study_detail_description: '', //partyDesc
    min_member_cnt: 0,
    studyAt_date: '',
    studyAt_location: '', // 무슨 값을 보내줘야 할지 모르겠음.
    tmX: 0,
    tmY: 0,
    deadline: new Date(),
    status: 0,
  });

  const handleAddressTransformLocation = async (e) => {
    e.preventDefault();
    let location = partyAddress.current.value;
    let geocoder = new kakao.maps.services.Geocoder();

    await geocoder.addressSearch(`${location}`, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        console.log(coords);
        setLatLng(coords.Ma);
        setLonLng(coords.La);
      } else {
        console.log('err');
      }
    });
    // setFormData({
    //   who_open: userId,
    //   study_title: partyName.current.value,
    //   study_category: category,
    //   study_detail_description: partyDesc.current.value,
    //   min_member_cnt: String(peopleNum),
    //   studyAt_date: partyDate.current.value,
    //   studyAt_location: partyAddress.current.value,
    //   tmX: latLng,
    //   tmY: lonLng,
    //   deadline: partyClose.current.value,
    //   status: 0,
    // });
  };

  const onSubmitHandler = async (e) => {
    console.log(userId);
    e.preventDefault();

    handleAddressTransformLocation(e);

    let b = setFormData({
      who_open: userId,
      study_title: partyName.current.value,
      study_category: category,
      study_detail_description: partyDesc.current.value,
      min_member_cnt: String(peopleNum),
      studyAt_date: partyDate.current.value,
      studyAt_location: partyAddress.current.value,
      tmX: latLng,
      tmY: lonLng,
      deadline: partyClose.current.value,
      status: 0,
    });
    console.log(formData);
    // setTimeout(() => {
    // .then(() => {
    // result = {
    //   who_open: userId,
    //   study_title: partyName.current.value,
    //   study_category: category,
    //   study_detail_description: partyDesc.current.value,
    //   min_member_cnt: String(peopleNum),
    //   studyAt_date: partyDate.current.value,
    //   studyAt_location: partyAddress.current.value,
    //   tmX: latLng,
    //   tmY: lonLng,
    //   deadline: partyClose.current.value,
    //   status: 0,
    // };
    // return result;
    // })
    // .then((res) => {
    // console.log(res);
    // axios.post(`/api/openStudy`, result).then((res) => {
    //   console.log(res);
    //   navigate("/");
    // });
    // })
    // }, 200);
    // console.log(category);
    // setTimeout(() => {
    // console.log(result);
    //   axios
    //     .post(`/api/openStudy`, result)
    //     .then((res) => {
    //       console.log(res);
    //       navigate("/");
    //     })
    //     .catch((err) => console.log(err));
    // }, 500);
  };
  // });

  // post 요청 보낼 때 사용 될 변수
  // setTimeout(() => {
  //   console.log(formData);
  //   axios.post(`/api/openStudy`, formData).then((res) => {
  //     console.log(res);
  //     navigate("/");
  //   });
  // }, 500);

  const handlePlusPeople = (e) => {
    e.preventDefault();
    setPeopleNum(peopleNum + 1);
  };

  const handleMinusPeople = (e) => {
    e.preventDefault();
    setPeopleNum(peopleNum - 1);
    if (peopleNum < 2) {
      setPeopleNum(1);
      return alert('1 이하는 안됩니다.');
    }
  };

  const handlePeopleChange = (e) => {
    setPeopleNum(e.target.value);
  };

  return (
    <LayoutDetailPage>
      <MainStyle>
        {/* Nav 대체품 */}
        <NavContainer>
          <div
            className={category === 'code' ? 'navBox addColor' : 'navBox'}
            onClick={() => setCategory('code')}
          >
            프로그래밍
          </div>
          <div
            className={category === 'sing' ? 'navBox addColor' : 'navBox'}
            onClick={() => setCategory('sing')}
          >
            보컬댄스
          </div>
          <div
            className={category === 'design' ? 'navBox addColor' : 'navBox'}
            onClick={() => setCategory('design')}
          >
            디자인
          </div>
        </NavContainer>
        {/* Nav 대채품 */}

        {/* <BsChevronLeft className="header-goback" onClick={() => navigate(-1)} />
      <h1 className="header-title">스터디 개설하기</h1>
      <hr /> */}
        {/* <Nav /> */}
        <div className="wrapper">
          <form className="createParty">
            <div className="partName">
              <label className="labels" htmlFor="study_name">
                스터디 이름
              </label>
              <InputStyle
                id="studyName"
                ref={partyName}
                placeholder="스터디 이름을 입력해주세요"
                name="study_name"
              />
            </div>

            <label className="labels" htmlFor="studyDate">
              스터디 날짜
            </label>
            <input ref={partyDate} name="studyDate" type="datetime-local" />

            <label className="labels" htmlFor="studyClose">
              모집 마감 날짜
            </label>
            <input name="studyClose" ref={partyClose} type="datetime-local" />

            <PeopleCountContainer>
              <MdPeopleAlt />
              <button className="peopleBtn" onClick={(e) => handleMinusPeople(e)}>
                -
              </button>
              <div ref={partyPeople} onChange={(e) => handlePeopleChange(e)}>
                {peopleNum}
              </div>
              <button className="peopleBtn" onClick={(e) => handlePlusPeople(e)}>
                +
              </button>
            </PeopleCountContainer>

            <div className="partName">
              <label className="labels" htmlFor="location">
                스터디 장소
              </label>
              <InputStyle
                ref={partyAddress}
                placeholder="스터디 장소를 입력해주세요"
                name="location"
              />
            </div>

            <label className="partyDescLabel labels">스터디 상세설명</label>
            <textarea ref={partyDesc} className="partyDesc" placeholder="스터디를 설명해주세요" />
            <button className="finish" onClick={onSubmitHandler}>
              스터디 개설 완료하기
            </button>
          </form>
        </div>
        <div className="modalLayout">
          <JoinModal open={open} handleClose={setOpen} status={0} />
        </div>
      </MainStyle>
    </LayoutDetailPage>
  );
}

const NavContainer = styled.nav`
  height: 31px;
  display: flex;
  color: #f4ede7;
  margin-top: 24px;
  padding: 0 20px;
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
  }

  .addColor {
    color: white;
    background-color: black;
  }
`;

const PeopleCountContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  input {
    width: 20%;
    border: 1px solid red;
  }

  .peopleBtn {
    margin: 0 20px;
    background-color: white;
    border: 1px solid black;
    border-radius: 50%;
    text-align: center;
  }
`;

const InputStyle = styled.input`
  width: 50%;
  height: 42px;
  border-radius: 15px;
  border: none;
  /* padding: 0; */
`;

const MainStyle = styled.div`
  background-color: white;
  box-sizing: border-box;

  padding: 32px 32px;
  .header-goback {
    float: left;
    color: #727272;
  }
  .header-title {
    text-align: center;
  }

  .wrapper {
    margin: 0 20px;
  }

  .createParty {
    margin-top: 20px;
  }

  .modalLayout {
    width: 100%;
    padding-bottom: 100px;
  }

  .titleBox {
    width: 100%;
    height: auto;
    padding: 25px 0 5px;
    display: flex;
    align-items: center;
    /* padding-bottom: 10px; */
    justify-content: center;
    border-bottom: 1px solid #727272;

    /* border: 1px solid red; */
  }

  .backImg {
    /* float: left; */
    /* margin-bottom: 9px; */
    width: 10px;
  }

  .title {
    width: 90%;
    /* height: 30px; */
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    /* padding: 0 0 9px 0; */

    /* border: 1px solid black; */
  }

  input {
    background-color: #faf6f2;
    border-radius: 16px;
    padding: 2px 10px;
    border: none;
    font-size: 15px;
    width: 90%;
    height: 40px;
  }

  /* div {
    border: none;
  } */

  textarea {
    background-color: #faf6f2;
    border: none;
    border-radius: 16px;
    font-size: 15px;
    width: 90%;
    height: 116px;
    padding: 10px 10px;
  }

  .partyName {
    margin-top: 15px;
  }

  .addressChecked {
    float: right;
    border: 1px solid black;
    border-radius: 25px;
    padding: 5px;
    background-color: #faf6f2;
    transform: translate(-10%, -110%);
    cursor: pointer;
  }

  .partyDescLabel {
    margin-top: 25px;
  }

  .partyDesc {
    width: 90%;
    height: 117px;
  }

  .finish {
    width: 100%;
    height: 35px;
    border-radius: 30px;
    background-color: black;
    border: none;
    color: white;
    margin-top: 20px;
  }

  .labels {
    display: block;
    margin: 20px 0;
  }
`;
