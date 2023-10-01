import styled from "styled-components";

// 맵 이미지 스타일 태그
export const MapImage = styled.div`
  color: mediumorchid;
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
  border: 3px solid mediumorchid;
  background: white;
  padding: 10px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-size: 30px;
  }
  &:hover {
    border: 3px solid purple;
  }
`;