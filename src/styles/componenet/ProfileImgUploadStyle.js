import styled from "styled-components";

export const ProfileImgUploadModalBack = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

export const ProfileImgUploadModalBox = styled.div`
  width: 380px;
  height: 200px;
  border-radius: 10px;
  border: 3px solid mediumorchid;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 300px;
  }
`;

export const ProfileImgUploadModalTitleBox = styled.div``;

export const ProfileImgUploadModalTitleText = styled.span``;

export const UploadImgBox = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const UploadImg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 50%;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  & > span {
    font-size: 50px;
  }
`;

export const ProfileImgUploadInput = styled.input`
  display: none;
`;
export const ProfileImgUploadModalBtnBox = styled.div`
  width: 270px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  /* position: relative; */
`;

export const ProfileImgUploadModalBtn = styled.button`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid mediumorchid;
  border-radius: 10px;
  background-color: white;
  white-space: nowrap;
  cursor: pointer;
`;

export const CancelBtn = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  color: white;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  & > span {
    color: mediumorchid;
  }
`;

export const UploadImgCancelBtn = styled.button`
  border-radius: 50%;
  background-color: mediumorchid;
  color: white;
  padding: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 4px;
  cursor: pointer;
  &:hover {
    background-color: tomato;
  }
`;

export const UploadImgBtn = styled(ProfileImgUploadModalBtn)`
  border: none;
  background-color: greenyellow;
  color: black;
`;

export const SelectImgBtn = styled.label`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 50%;
  background-color: mediumorchid;
  color: white;
  white-space: nowrap;
  position: absolute;
  bottom: 0;
  right: 1px;
  cursor: pointer;
  &:hover {
    border: 2px solid black;
    color: black;
    background-color: greenyellow;
  }
`;
