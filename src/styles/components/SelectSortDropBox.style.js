import styled from "styled-components";

export const SelectSortMethodBox = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 1200px;
  height: 30px;
  position: relative;
  @media screen and (max-width: 768px) {
    margin-top: 40px;
  }
`;

export const SelectSortMethodList = styled.ul`
  border: 1px solid #bebebe;
  position: absolute;
  border-radius: 5px;
  width: 190px;
  z-index: 10;
  top: 31px;
  display: none;
  &:hover {
    display: block;
  }
  /* display: ${(props) => (props.isSelectSort ? "block" : "none")}; */
`;
export const SelectSortMethodBtn = styled.button`
  color: black;
  border: 1px solid #bebebe;
  font-size: 16px;
  background-color: transparent;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 190px;
  height: 30px;
  padding: 10px;
  white-space: nowrap;
  cursor: pointer;
  & > span {
    color: black;
  }
  &:hover + ${SelectSortMethodList} {
    display: block;
  }
`;

export const SelectSortMethodItem = styled.li`
  /* box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0; */
  color: black;
  background-color: white;
  width: 100%;
  height: 30px;
  white-space: nowrap;
  display: flex;
  padding: 10px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #dcdcdc;
  }
  &:nth-child(1) {
    border-radius: 5px 5px 0 0;
  }
  &:last-child {
    border-radius: 0 0 5px 5px;
  }
`;
