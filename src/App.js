import React, { useEffect, useState } from "react";
import AppRouter from "./route/Router";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "./reactfbase";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { userAtom, userProfilePhotoUrl } from "./recoils/UserAtom";
import { PulseLoader } from "react-spinners";

// 처음 로딩 될때 화면을 보여줄 컴포넌트
const Loading = styled.div`
  width: 100%;
  height: 100%;
  font-size: 100px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
`;

// 어플리케이션이 로드 될때 너무 빨라서 파이어 베이스는 사용자가 로그인 되었는지 확인할 시간이 없음.
// 그럼 항상 애플리케이션은 항상 로그아웃 되어 있어서 로그인 폼이 브라우저 화면에 보일 것이다.
// 파이어 베이스가 초기화되고 모든 걸 로드할때까지 기다려 줘야 한다.

const App = () => {
  const setUser = useSetRecoilState(userAtom);
  const [firebaseInitialize, setFirebaseInitialize] = useState(null); // 파이어 베이스의 초기화 여부 state
  // const [currentUser, setCurrentUser] = useState(null); // 현재 로그인하고 있는 유저의 정보
  const [userLocation, setUserLocation] = useState(""); // 현재 유저의 위치 정보
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUser(JSON.parse(JSON.stringify(user)));
      } else {
        setUser(null);
      }
      setFirebaseInitialize(true);
    });
  }, []);

  const userGetLocation = async (position) => {
    const lat = await position.coords.latitude;
    const lng = await position.coords.longitude;
    // 현재 애플리케이션을 사용하는 사용자의 위치의 좌표를 가져오기

    getAddr(lat, lng);
    function getAddr(lat, lng) {
      let geocoder = new window.kakao.maps.services.Geocoder();
      console.log("maps", geocoder);
      let coord = new window.kakao.maps.LatLng(lat, lng);
      let callback = function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          console.log(result);
          setUserLocation(result[0].address.region_1depth_name);
        }
      };
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }
  };

  useEffect(() => {
    // 사용자의 위치가 있다면 가지고 오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(userGetLocation);
    }
  }, []);

  return (
    <>
      {!firebaseInitialize && (
        <Loading>
          <PulseLoader color="mediumorchid" size={20} />
        </Loading>
      )}
      <AppRouter userLocation={userLocation} />
    </>
  );
};

export default App;
