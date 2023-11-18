import styled from "styled-components";
export const LoginFailModalBack = styled.div`
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

export const LoginFailModalBox = styled.div`
  background-color: white;
  padding: 15px;
  width: 370px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid black;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    width: 290px;
    height: 130px;
  }
`;
export const LoginFailModalText = styled.span`
  line-height: 120%;
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

export const LoginFailModalBtnBox = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;

export const CheckBtn = styled.button`
  background-color: black;
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
