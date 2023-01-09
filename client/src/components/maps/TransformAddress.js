import { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;

export function getAddr(lat, lng) {
  // 주소 -> 좌표 변환
  let geocoder = new kakao.maps.services.Geocoder();

  let coord = new kakao.maps.LatLng(lat, lng);
  let callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const arr = { ...result };
      const _arr = arr[0].address.region_2depth_name;
      console.log(_arr);
    }
  };
  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}

export const TransformAddress = ({ lat, lon }) => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 5,
    };

    let map = new kakao.maps.Map(mapContainer, mapOption);

    getAddr(lat, lon);
  }, []);

  return (
    <MainContainer>
      <div id="map"></div>
    </MainContainer>
  );
};

const MainContainer = styled.section`
  #map {
    height: 200px;
  }
`;
