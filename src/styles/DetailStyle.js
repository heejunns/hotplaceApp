import styled from "styled-components";

export const DetailBack = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 20px 40px 20px;
`;
export const DetailBox = styled.div`
  /* border: 3px solid mediumorchid; */
  border-radius: 10px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
export const DetailTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid black;
`;
export const DetailTitleText = styled.span``;
export const DetailImgBox = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;
export const DetailMainText = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100px;
  font-size: 20px;
  margin-bottom: 20px;
  padding: 30px 0;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
`;
export const DetailMap = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 100px;
`;
export const DetailTitleBoxLeft = styled.div`
  display: flex;
  align-items: center;
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
    color: mediumorchid;
    font-size: 25px;
  }
`;
