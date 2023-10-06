import styled from "styled-components";

export const DetailBack = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 20px 40px 20px;
`;
export const DetailBox = styled.div`
  border-radius: 10px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  /* padding: 20px; */
  @media screen and (max-width: 768px) {
    margin-top: 50px;
  }
`;
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
export const DetailTitleText = styled.span`
  white-space: nowrap;
`;
export const DetailImgBox = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;

    @media screen and (max-width: 768px) {
      object-fit: fill;
    }
  }
`;
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
export const DetailMap = styled.div`
  width: 100%;
  height: 300px;
  /* margin-bottom: 50px; */
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  border-bottom: 2px solid black;
`;
export const DetailItemTitle = styled.span`
  font-size: 30px;
  margin-bottom: 20px;
`;
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
