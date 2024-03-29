import React, { memo, useCallback, useEffect } from "react";
import * as S from "../styles/components/Map.style";
import { Loading } from "../styles/components/Loading.style";
import { PulseLoader } from "react-spinners";
const Map = ({ setUserMarkerLocation }) => {
  const getLocation = useCallback(
    async (position) => {
      const lat = await position.coords.latitude;
      const lng = await position.coords.longitude;
      // 현재 애플리케이션을 사용하는 사용자의 위치의 좌표를 가져오기

      const mapContainer = document.getElementById("map"); // 지도를 표시할 div
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      // 지도를 생성합니다
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      const options = {
        // Drawing Manager를 생성할 때 사용할 옵션입니다
        map: map, // Drawing Manager로 그리기 요소를 그릴 map 객체입니다
        drawingMode: [
          // drawing manager로 제공할 그리기 요소 모드입니다
          window.kakao.maps.drawing.OverlayType.MARKER,
        ],
        // 사용자에게 제공할 그리기 가이드 툴팁입니다
        // 사용자에게 도형을 그릴때, 드래그할때, 수정할때 가이드 툴팁을 표시하도록 설정합니다
        guideTooltip: ["draw", "drag", "edit"],
        markerOptions: {
          // 마커 옵션입니다
          draggable: true, // 마커를 그리고 나서 드래그 가능하게 합니다
          removable: true, // 마커를 삭제 할 수 있도록 x 버튼이 표시됩니다
        },
      };

      // 위에 작성한 옵션으로 Drawing Manager를 생성합니다
      var manager = new window.kakao.maps.drawing.DrawingManager(options);

      // 그리기 중이면 그리기를 취소합니다
      manager.cancel();

      // 클릭한 그리기 요소 타입을 선택합니다
      manager.select(window.kakao.maps.drawing.OverlayType["MARKER"]);

      manager.addListener("remove", () => {
        // 마커를 삭제하면 이벤트 발생
        const data = manager.getData();
        if (data.marker.length > 0) {
          // 불러온 데이터의 marker 에 데이터가 있다면
          setUserMarkerLocation([data.marker[0].y, data.marker[0].x]); // 마커로 지정한 좌표를 state 로 업데이트
          return;
        } else if (data.marker.length === 0) {
          // 마커를 삭제하고 완료 버튼을 클릭하면 마커의 좌표를 저장하는 state 초기화
          setUserMarkerLocation([]);
          return;
        }
      });

      manager.addListener("drawend", () => {
        // 마커를 생성하면 이벤트 발생
        const data = manager.getData();
        if (data.marker.length > 0) {
          //불러온 데이터의 marker 에 데이터가 있다면
          setUserMarkerLocation([data.marker[0].y, data.marker[0].x]); // 마커를 지정한 좌표를 state 로 업데이트
          return;
        }
        // else if (data.marker.length === 0) {
        //   // 마커를 삭제하고 완료 버튼을 클릭하면 마커의 좌표를 저장하는 state 초기화
        //   setUserMarkerLocation([]);
        //   return;
        // }
      });
    },
    [setUserMarkerLocation]
  );

  useEffect(() => {
    if (navigator.geolocation) {
      // 위치가 있다면
      navigator.geolocation.getCurrentPosition(getLocation);
    }
  }, [getLocation]);

  return (
    <>
      <S.MapImage id="map">맵 불러오는 중</S.MapImage>
    </>
  );
};

export default memo(Map);
