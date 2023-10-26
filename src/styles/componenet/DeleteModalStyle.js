import styled from "styled-components";

export const DeleteModalBack = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

export const DeleteModalBox = styled.div`
  background-color: white;
  padding: 20px;
  width: 280px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid black;
  border-radius: 10px;
`;

export const DeleteModalText = styled.span`
  font-size: 20px;
`;

export const DeleteModalBtnBox = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;

export const DeleteModalBtn = styled.button`
  width: 80px;
  height: 35px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`;

export const DeleteModalCancelBtn = styled(DeleteModalBtn)`
  background-color: #a0a0a0;
`;

export const DeleteModalConfirmBtn = styled(DeleteModalBtn)`
  background-color: black;
`;
