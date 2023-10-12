import styled from "styled-components";
// 프로필 페이지 배경 스타일 태그
export const ProfileBack = styled.div`
  font-family: "Nanum Myeongjo", serif;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  @media screen and (max-width: 768px) {
    padding: 60px 20px 20px 20px;
  }
`;
export const ProfileUserInfoBox = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ProfileUserImgUploadIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
  & > span {
    border-radius: 50%;
    color: black;
    background-color: #00b9ff;
  }
`;

export const ProfileUserImgBox = styled.div`
  position: relative;
`;

export const ProfileUserInfoImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 2px solid black;
  width: 100px;
  height: 100px;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
  & > span {
    font-size: 50px;
  }
`;

export const ProfileUserInfoName = styled.div`
  margin: 10px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    color: mediumorchid;
    cursor: pointer;
  }
`;

// 현재 사용자가 올린 게시글을 보여줄 게시글 레이아웃 스타일 태그
export const ProfileBox = styled.div`
  border-radius: 10px;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  padding-bottom: 30px;
`;
export const ProfileMenuBox = styled.div`
  width: 100%;
  position: relative;
  height: 100px;
  display: flex;
  /* align-items: center; */
  border: 1px solid black;
`;
export const ProfileSelectMenu = styled.ul`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
`;

export const ProfileMenuItem = styled.li`
  white-space: nowrap;
  border-bottom: ${(props) =>
    props.selectMenu === props.id
      ? "2px solid mediumorchid"
      : "2px solid grey"};
  width: 150px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:nth-child(1) {
    margin-right: 10px;
  }
`;
export const NoPost = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  margin-top: 10px;
  color: mediumorchid;
`;
export const ProfilePostBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
