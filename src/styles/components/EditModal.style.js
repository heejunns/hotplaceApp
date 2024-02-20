import styled from "styled-components";

export const EditModalBack = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
`;
export const EditModalBox = styled.div`
  width: 300px;
  height: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 3px solid black;
  background-color: white;
  border-radius: 10px;
`;
export const EditModalText = styled.span`
  font-size: 20px;
  margin-bottom: 10px;
`;
export const EditModalInputText = styled.textarea`
  width: 100%;
  height: 130px;
  border: 3px solid #a0a0a0;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  resize: none;
  &:focus {
    border: 2px solid #6edcdc;
  }
`;
export const EditModalForm = styled.form``;
export const EditModalBtnBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
`;
export const EditModalBtn = styled.button`
  width: 120px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  background-color: transparent;
  cursor: pointer;
`;
export const EditModalCancelBtn = styled(EditModalBtn)`
  background-color: #a0a0a0;
  color: white;
`;
export const EditModalConfirmBtn = styled(EditModalBtn)`
  background-color: black;
  color: white;
`;
