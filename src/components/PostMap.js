import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

const PostMapStyle = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 300px;
`;
const PostMap = ({ data }) => {
  const { location } = data;

  const getMap = useCallback(() => {
    const mapContainer = document.getElementById("postMap"); // 지도를 표시할 div
    const mapOption = {
      center: new window.kakao.maps.LatLng(location[0], location[1]), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커가 표시될 위치입니다
    const markerPosition = new window.kakao.maps.LatLng(
      location[0],
      location[1]
    );

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, [location]);

  useEffect(() => {
    getMap();
  }, [getMap]);

  return (
    <>
      <PostMapStyle id="postMap"></PostMapStyle>
    </>
  );
};

export default PostMap;
