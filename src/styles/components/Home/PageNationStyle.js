import styled from "styled-components";

export const PageNationBox = styled.div`
  width: 200px;
  height: 50px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageNationBtn = styled.button`
  background-color: transparent;
  border: none;
  width: 50px;
  height: 50px;
  pointer-events: ${(props) => (props.clickDisable ? "auto" : "none")};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    color: black;
  }
`;

export const NextBtn = styled(PageNationBtn)``;

export const PrevBtn = styled(PageNationBtn)``;

export const PageNumberBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 20px;
  color: ${(props) => (props.currentPage ? "black" : "#aaaaaa")};
`;
