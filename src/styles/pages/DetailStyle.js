import styled from "styled-components";

// 디테일 페이지 백그라운드
export const DetailBack = styled.div`
  font-family: "Tilt Neon", sans-serif;
  width: 100%;
  display: flex;
  background-color: white;
  justify-content: center;
  padding: 60px 20px 40px 20px;
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
export const DetailTitleText = styled.div`
  font-size: 30px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
`;
// 디테일 페이지의 이미지 한개 박스
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
// 디테일 이미지 한개 이상일때 박스
export const DetailImgsBox = styled.div`
  width: 100%;
  position: relative;
  height: 700px;
  overflow: hidden;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    height: 300px;
    overflow-x: scroll;
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: black;
      border-radius: 10px;
    }
  }
`;

export const ImgsContainer = styled.div`
  width: ${(props) => `${props.imgsMaxPx}px`};
  height: 700px;
  display: flex;
  transition: 1s ease-in-out;
  transform: ${(props) =>
    props.detailImgBoxPx > 0
      ? `translateX(${props.detailImgBoxPx}px)`
      : `translateX(${props.detailImgBoxPx}px)`};
  @media screen and (max-width: 768px) {
    height: 300px;
  }
  & > img {
    width: 100%;
    max-width: 800px;
    height: 700px;
    object-fit: cover;
    @media screen and (max-width: 768px) {
      height: 300px;
      object-fit: fill;
    }
  }
`;
export const DetailImgBtn = styled.button`
  position: absolute;
  cursor: pointer;
  border-radius: 50%;
  top: 325px;
  border: none;
  background-color: #969696;
  opacity: 0.7;
  z-index: 10;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    opacity: 1;
    color: white;
    font-size: 35px;
  }
  &:hover {
    opacity: 1;
  }
`;

export const DetailImgPrevBtn = styled(DetailImgBtn)`
  left: 3px;
  display: ${(props) => (props.detailImgBoxPx === 0 ? "none" : "block")};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const DetailImgNextBtn = styled(DetailImgBtn)`
  right: 3px;
  display: ${(props) =>
    props.detailImgBoxPx === -props.imgsMaxPx + 800 ? "none" : "block"};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// 디테일 페이지의 자세한 설명
export const DetailMainText = styled.div`
  width: 100%;
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

    color: black;
    font-size: 25px;
  }
  span:nth-of-type(1) {
    color: ${(props) => (props.isLike ? "red" : "black")};
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

export const DetailPostName = styled.span`
  font-size: 25px;
`;

export const DetailWriterImgBox = styled.div`
  margin-right: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 2px solid black;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
  & > span {
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
`;
