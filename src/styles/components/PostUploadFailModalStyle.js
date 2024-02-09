import styled from "styled-components";

export const PostUploadFailModalBack = styled.div`
  z-index: 100;
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

export const PostUploadFailModalBox = styled.div`
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

export const PostUploadFailModalTextBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

export const PostUploadFailModalFailText = styled.span`
  font-size: 20px;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const PostUploadFailModalBtnBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
`;

export const PostUploadFailModalConfirmBtn = styled.button`
  font-size: 15px;
  cursor: pointer;
  border: none;
  background-color: black;
  color: white;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
