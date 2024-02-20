import styled from "styled-components";

export const ProfileNameEditBack = styled.div`
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

export const ProfileNameEditBox = styled.div`
  width: 380px;
  height: 150px;
  border-radius: 10px;
  border: 3px solid black;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 300px;
  }
`;

export const ProfileNameEditInput = styled.input`
  width: 300px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #a0a0a0;
  padding: 10px;
  background: white;
  &:focus {
    border: 2px solid #6edcdc;
  }
  @media screen and (max-width: 768px) {
    width: 250px;
  }
`;

export const NicknameOverlapCheckText = styled.div`
  font-size: 15px;
  display: flex;
  width: 300px;
  height: 15px;
  margin-top: 10px;
  color: #6edcdc;
  @media screen and (max-width: 768px) {
    width: 250px;
  }
`;

export const ProfileNameEditBtnBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 35px;
  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
`;
export const ProfileNameEditModalBtn = styled.button`
  width: 120px;
  color: white;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  @media screen and (max-width: 768px) {
    width: 100px;
    font-size: 12px;
  }
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

export const NicknameoverlapCheckBtn = styled(ProfileNameEditModalBtn)`
  background-color: #a0a0a0;
`;

export const EditBtn = styled(ProfileNameEditModalBtn)`
  background-color: black;
`;
