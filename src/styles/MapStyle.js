import styled from "styled-components";

// 맵 이미지 스타일 태그
export const MapImage = styled.div`
  color: mediumorchid;
  width: 100%;
  height: 10rem;
  border-radius: 5px;
  @media screen and (min-width: 390px) and (min-height: 844px) {
    height: 15rem;
  }
  @media screen and (min-width: 768px) and (min-height: 1024px) {
    height: 18rem;
  }
`;
// 마커 버튼 레이아웃 스타일 태그
export const MarkerBtnBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;
// 마커 버튼 스타일 태그
export const ButtonMarker = styled.button`
  border-radius: 10px;
  border: 3px solid mediumorchid;
  background: white;
  padding: 0.3rem;
  font-size: 1rem;
  @media screen and (min-width: 768px) and (min-height: 1024px) {
    font-size: 1.3rem;
  }
  @media screen and (min-width: 800px) {
    font-size: 1.5rem;
  }
`;
