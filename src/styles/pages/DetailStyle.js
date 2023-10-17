import styled from "styled-components";

// 디테일 페이지 백그라운드
export const DetailBack = styled.div`
  font-family: "Tilt Neon", sans-serif;
  width: 100%;
  display: flex;
  background-color: white;
  justify-content: center;
  padding: 20px 20px 40px 20px;
`;
// 디테일 페이지 전체 박스
export const DetailBox = styled.div`
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  /* padding: 20px; */
  @media screen and (max-width: 768px) {
    margin-top: 50px;
  }
`;
// 디테일 페이지의 타이틀 박스
export const DetailTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid black;
  @media screen and (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;
// 디테일 페이지의 타이틀 박스 안에 텍스트
export const DetailTitleText = styled.span`
  white-space: nowrap;
`;
// 디테일 페이지의 이미지 박스
export const DetailImgBox = styled.div`
  width: 100%;
  height: 700px;
  margin-bottom: 20px;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
  @media screen and (max-width: 768px) {
    height: 300px;
  }
`;
// 디테일 페이지의 자세한 설명
export const DetailMainText = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100px;
  font-size: 20px;
  padding: 30px 0;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  display: flex;
  flex-direction: column;
`;
// 디테일 페이지의 지도
export const DetailMap = styled.div`
  width: 100%;
  height: 300px;
  /* margin-bottom: 50px; */
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  border-bottom: 2px solid black;
`;
// 디테일 페이지의 각각의 요소들의 제목
export const DetailItemTitle = styled.span`
  font-size: 30px;
  margin-bottom: 20px;
`;
// 디테일 페이지의 타이틀 박스의 오른쪽
export const DetailTitleBoxRight = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`;

// 게시글 버튼들의 박스 스타일 태그
export const DetailBtnBox = styled.div`
  display: flex;
`;

// 게시글 버튼들의 스타일 태그
export const DetailBtn = styled.button`
  border-style: none;
  padding: 10px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    cursor: pointer;
    color: mediumorchid;
    font-size: 25px;
  }
  @media screen and (max-width: 768px) {
    padding: 0;
    margin-right: 10px;
  }
`;

export const DetailPostNameBox = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid black;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

export const DetailPostName = styled.span``;
