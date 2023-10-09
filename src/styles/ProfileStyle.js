import styled from "styled-components";
// 프로필 페이지 배경 스타일 태그
export const ProfileBack = styled.div`
  font-family: "Nanum Myeongjo", serif;
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;
export const ProfileUserInfoBox = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ProfileUserImgUploadIcon = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  & > span {
    color: mediumorchid;
    background-color: aqua;
  }
`;

export const ProfileUserImgUploadInput = styled.input`
  display: none;
`;

export const ProfileUserImgBox = styled.div`
  position: relative;
  border: 1px solid aqua;
`;

export const ProfileUserInfoImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 3px solid black;
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

export const ProfileUserInfoName = styled.span`
  font-size: 20px;
`;
// 프로필 이름을 변경하는 폼 스타일 태그
export const ProfileForm = styled.form`
  border: 1px solid mediumorchid;
  border-top: none;
  width: 78%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 400px) {
    width: 70%;
  }
  @media screen and (min-width: 820px) {
    width: 53%;
  }
`;
// 현재 사용자가 올린 게시글을 보여줄 게시글 레이아웃 스타일 태그
export const ProfileBox = styled.div`
  border-radius: 10px;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
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
// export const ProfileSelectMenuBtn = styled.button`
//   border-style: none;
//   /* width: 120px; */
//   height: 30px;
//   border: 3px solid mediumorchid;
//   background-color: transparent;
//   border-radius: 10px;
//   cursor: pointer;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;
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
// 프로필 이름 변경 폼 내부의 input 스타일 태그
export const ProfileFormInput = styled.input`
  width: 60%;
  height: 2rem;
  border-radius: 5px;
  border: 2px solid mediumorchid;
  padding: 0.5rem;
  background: white;
  margin-right: 1rem;
`;
// 프로필 이름 변경 후 버튼을 클릭하는데 닉네임 변경 버튼 스타일 태그
export const ProfileFormSubmit = styled.input`
  border-radius: 5px;
  border: 2px solid mediumorchid;
  padding: 0.5rem;
  width: 5rem;
  height: 2rem;
  background: white;
`;
export const NoPost = styled.div`
  font-size: 2.5rem;
  margin-top: 2rem;
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
