import styled from "styled-components";

// 맵 이미지 스타일 태그
export const MapImage = styled.div`
  color: #a0a0a0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// 마커 버튼 레이아웃 스타일 태그
export const MarkerBtnBox = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
// 마커 버튼 스타일 태그
export const MarkerBtn = styled.button`
  border-radius: 10px;
  background: black;
  border: none;
  padding: 10px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  & > span {
    font-size: 30px;
  }
`;
