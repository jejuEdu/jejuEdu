import { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";

// import Modal2 from "../modals/Modal2";

import { AiOutlineSearch } from "react-icons/ai";
import { MdMyLocation } from "react-icons/md";

const AddressInput = ({ update }) => {
  // 주소를 입력하면 좌표값으로 바꿔주는 컴포넌트
  const { kakao } = window;
  const [userAddress, setUserAddress] = useState(null);
  const location = useRef();
  const [popup, setPopup] = useState(false);

  const handleClick = () => {
    axios
      .post(`/api/getStudyList`, { area: "성산읍" })
      .then((data) => update(data.data));
  };

  const handleChangeAddress = () => {
    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      `${location.current.value}`,
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          setUserAddress(location);
          console.log(coords);
        } else {
          console.log("err");
        }
      }
    );
  };

  return (
    <TestBox>
      <div className="par_box">
        <input placeholder="00동 00구" className="inputBox" ref={location} />
        <AiOutlineSearch
          className="searchIcon"
          onClick={() => handleChangeAddress()}
        />
      </div>
      <div className="btnContainer">
        <p className="myLocation" onClick={handleClick}>
          <MdMyLocation className="myLocation locationIcon" />
          현재 위치로 설정
        </p>
      </div>
    </TestBox>
  );
};

export default AddressInput;

const TestBox = styled.div`
  .searchIcon {
    color: white;
    font-size: 24px;
  }
  .btnContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .par_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin: 0 0 10px;
    height: 36px;
    border-radius: 25px;
    background: #e47b00;
  }
  .inputBox {
    border-radius: 25px;
    border: none;
    background: #e47b00;
    color: white;
    font-weight: bolder;
  }

  .inputBox::placeholder {
    color: white;
    font-weight: 400;
  }

  .inputBox:focus {
    border: none;
    outline: none;

    &::placeholder {
      display: none;
      color: #e47b00;
    }
  }

  .myLocation {
    display: flex;
    align-items: center;
    margin-right: 10px;

    font-size: 12px;
    line-height: 13px;
    color: #e47b00;
  }

  .locationIcon {
    font-size: 25px;
  }
`;
