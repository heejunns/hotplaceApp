import styled from "styled-components";

export const RejectSignupModalBack = styled.div`
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

export const RejectSignupModalBox = styled.div`
  width: 450px;
  height: 120px;
  border-radius: 10px;
  border: 3px solid black;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
  @media screen and (max-width: 768px) {
    width: 300px;
  }
`;

export const RejectSignupModalTextBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RejectSignupModalText = styled.span`
  font-size: 20px;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const RejectSignupModalBtnBox = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;

export const RejectSignupModalConfirmBtn = styled.button`
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  background-color: #a0a0a0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`;
