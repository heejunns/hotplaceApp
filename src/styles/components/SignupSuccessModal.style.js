import styled from "styled-components";

export const SignupSuccessModalBack = styled.div`
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

export const SignupSuccessModalBox = styled.div`
  width: 380px;
  height: 120px;
  border-radius: 10px;
  border: 3px solid black;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  @media screen and (max-width: 768px) {
    width: 300px;
  }
`;

export const SignupSuccessModalTextBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const SignupSuccessModalText = styled.span`
  font-size: 20px;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;
