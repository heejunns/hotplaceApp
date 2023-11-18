import styled from "styled-components";

export const ReportModalBack = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  top: 0;
  right: 0;
`;

export const ReportModalBox = styled.div`
  width: 380px;
  height: 250px;
  border: 3px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-color: white;
  padding: 25px;
  @media screen and (max-width: 768px) {
    width: 300px;
  }
`;

export const ReportModalTitle = styled.h1`
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 20px;
`;
export const ReportModalInputTextBox = styled.div``;

export const ReportModalInput = styled.textarea`
  padding: 10px;
  width: 320px;
  border-radius: 5px;
  height: 120px;
  resize: none;
  border: 1px solid #a0a0a0;
  &:focus {
    border: 2px solid #6edcdc;
  }
  @media screen and (max-width: 768px) {
    width: 250px;
  }
`;

export const ReportModalBtnBox = styled.div`
  width: 100%;
`;

export const ReportModalCancelBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
`;

export const ReportModalReportBtn = styled.button`
  width: 100%;
  cursor: pointer;
  border-radius: 10px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border: none;
  color: white;
`;
