import React, { useState } from "react";
import axios from "axios";

// KakaoAddress 클릭하면 팝업 창이 나오는데,
// 도로명 주소만 검색됨.
export default function KaKaoAddress() {
  const [data, setData] = useState("");
  const { daum } = window;
  const handleGetAddress = () => {
    document
      .getElementById("address_kakao")
      .addEventListener("click", function () {
        //주소입력칸을 클릭하면
        //카카오 지도 발생
        new daum.Postcode({
          oncomplete: function (data) {
            //선택시 입력값 세팅
            document.getElementById("address_kakao").value = data.address; // 주소 넣기
            setData(data.address);
            // document.querySelector("input[name=address_detail]").focus(); //상세입력 포커싱
          },
        }).open();
      });
  };

  const handleAddressCheck = () => {
    console.log(data);
  };
  return (
    <>
      <div id="address_kakao" onClick={handleGetAddress}>
        KaKaoAddress
      </div>
      <div onClick={handleAddressCheck}>주소확인!</div>
    </>
  );
}
