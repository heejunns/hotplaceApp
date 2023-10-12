import styled from "styled-components";

export const NoUserClickModalBack = styled.div`
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

export const NoUserClickModalBox = styled.div`
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

export const NoUserClickModalTextBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NoUserClickModalText = styled.span`
  font-size: 20px;
`;

export const NoUserClickModalBtnBox = styled.div`
  width: 270px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const NoUserClickModalBtn = styled.button`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  color: white;
  white-space: nowrap;
  cursor: pointer;
`;

export const ConfirmBtn = styled(NoUserClickModalBtn)`
  background-color: #1e90ff;
`;

export const LoginPageBtn = styled(NoUserClickModalBtn)`
  background-color: mediumorchid;
`;
