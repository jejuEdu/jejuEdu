import React from "react";
import { useNavigate } from "react-router-dom";

export default function AddressAPI() {
  let navigate = useNavigate();
  const { opener } = window;
  //   document.domain = "http://44.211.218.78/login";
  function init() {
    var url = navigate("/home");
    var confmKey = `devU01TX0FVVEgyMDIyMTIxNjIxMDQwMzExMzM1MDY
    `;
    // 연계신청시 부여받은 승인키입력(테스트용 승인키 : TESTJUSOGOKR)
    var resultType = "4";
    // 도로명주소 검색결과 화면 출력유형,
    // 1 : 도로명, 2 : 도로명+지번+상세보기(관련지번, 관할주민센터), 3 : 도로명+상세보기(상세
    // 건물명), 4 : 도로명+지번+상세보기(관련지번, 관할주민센터, 상세건물명)
    var inputYn = "<%=inputYn %>";
    if (inputYn !== "y") {
      document.form.confmKey.value = confmKey;
      document.form.returnUrl.value = url;
      document.form.resultType.value = resultType;
      document.form.action =
        "https://business.juso.go.kr/addrlink/addrLinkUrl.do"; //인터넷망(행정망의 경우 별도 문의)
      //** 2017년 5월 모바일용 팝업 API 기능 추가제공 **/
      //document.form.action="https://business.juso.go.kr/addrlink/addrMobileLinkUrl.do"; //모바일웹인경우, 인터넷망
      document.form.submit();
    } else {
      opener.jusoCallBack(`<%=roadFullAddr%>,<%=roadAddrPart1%>,<%=addrDetail%>,<%=roadAddrPart2%>,
<%=engAddr%>,<%=jibunAddr%>,<%=zipNo%>,<%=admCd%>,<%=rnMgtSn%>,<%=bdMgtSn%>,
<%=detBdNmList%>,<%=bdNm%>,<%=bdKdcd%>,<%=siNm%>,<%=sggNm%>,<%=emdNm%>,
<%=liNm%>,<%=rn%>,<%=udrtYn%>,<%=buldMnnm%>,<%=buldSlno%>,<%=mtYn%>,
<%=lnbrMnnm%>,<%=lnbrSlno%>,<%=emdNo%>`);
      window.close();
    }
  }
  return (
    <div onLoad={() => init()}>
      <input type="hidden" id="confmKey" name="confmKey" value="" />
      <input type="hidden" id="returnUrl" name="returnUrl" value="" />
      <input type="hidden" id="resultType" name=" resultType " value="" />
    </div>
  );
}
