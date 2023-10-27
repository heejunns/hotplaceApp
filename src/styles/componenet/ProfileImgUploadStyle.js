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
  border: 3px solid black;
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
`;

export const ProfileImgUploadModalBtn = styled.button`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  background-color: #a0a0a0;
  color: white;
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
    color: black;
  }
`;

export const UploadImgCancelBtn = styled.button`
  border-radius: 50%;
  border: none;
  background-color: black;
  color: white;
  padding: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 10px;
  cursor: pointer;
  &:hover {
    background-color: #a0a0a0;
  }
`;

export const UploadImgBtn = styled(ProfileImgUploadModalBtn)`
  border: none;
  background-color: black;
  color: white;
`;

export const SelectImgBtn = styled.label`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 50%;
  background-color: black;
  color: white;
  white-space: nowrap;
  position: absolute;
  bottom: 0;
  right: 1px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #a0a0a0;
  }
`;
