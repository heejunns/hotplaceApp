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
`;

export const ProfileImgUploadModalBtn = styled.button`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 10px;
  background-color: white;
  white-space: nowrap;
  cursor: pointer;
`;

export const CancelBtn = styled(ProfileImgUploadModalBtn)`
  &:hover {
    background-color: red;
    color: white;
  }
`;

export const UploadImgCancelBtn = styled.button`
  border-radius: 50%;
  background-color: white;
  padding: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 4px;
  &:hover {
    background-color: tomato;
    color: white;
  }
`;

export const UploadImgBtn = styled(ProfileImgUploadModalBtn)`
  &:hover {
    background-color: greenyellow;
  }
`;

export const SelectImgBtn = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 50%;
  background-color: white;
  white-space: nowrap;
  position: absolute;
  bottom: 0;
  right: 3px;
  cursor: pointer;
  &:hover {
    background-color: mediumorchid;
  }
`;
