import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt } from 'react-icons/fa';
import markerImg from '../../img/marker.png';

// 개설된 스터디 상세페이지에서 사용될 지도 와 마커
export default function PartyMarker({ lat, lon }) {
  const { kakao } = window;
  // La: 126.552302849197;
  // Ma: 33.2478036598913;
  useEffect(() => {
    setTimeout(() => {
      const markerPosition = new kakao.maps.LatLng(33.2478036598913, 126.552302849197);
      // 마커(스터디장소)를 찍기 위한 변수
      const container = document.getElementById('map');
      const imageSrc = <FaMapMarkerAlt />;
      const imageSize = new kakao.maps.Size(35, 35);
      const markerImage = new kakao.maps.MarkerImage(markerImg, imageSize);

      // const displayMarker = (localPosition, message) => {
      //   const marker = new kakao.maps.Marker({
      //     map: map,
      //     position: localPosition,
      //     image: markerImage,
      //   });

      //   let markerMessage = message;
      //   let markerRemoveAble = true;

      //   const infoWindow = new kakao.maps.InfoWindow({
      //     content: markerMessage,
      //     removable: markerRemoveAble,
      //   });

      //   infoWindow.open(map, marker);
      //   map.setCenter(localPosition);
      // };

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      const options = {
        center: new kakao.maps.LatLng(33.2478036598913, 126.552302849197),
        level: 5,
      };
      const map = new kakao.maps.Map(container, options);
      marker.setMap(map);
    }, 1500);
  }, [
    kakao.maps.InfoWindow,
    kakao.maps.LatLng,
    kakao.maps.Map,
    kakao.maps.Marker,
    kakao.maps.MarkerImage,
    kakao.maps.Size,
    lat,
    lon,
  ]);

  return (
    <MapContainer>
      <div className="map">
        <div className="MapContainer" id="map"></div>
      </div>
    </MapContainer>
  );
}

const MapContainer = styled.section`
  .map {
    height: 212px;
  }

  #map {
    height: 212px;
  }
`;
