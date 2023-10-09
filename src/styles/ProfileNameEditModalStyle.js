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
  height: 120px;
  border-radius: 10px;
  border: 3px solid mediumorchid;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const ProfileNameEditInput = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid mediumorchid;
  padding: 10px;
  background: white;
`;

export const ProfileNameEditBtnBox = styled.div`
  width: 270px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
export const ProfileNameEditModalBtn = styled.button`
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

export const CancelBtn = styled(ProfileNameEditModalBtn)`
  &:hover {
    background-color: red;
    color: white;
  }
`;

export const EditBtn = styled(ProfileNameEditModalBtn)`
  &:hover {
    background-color: greenyellow;
  }
`;
