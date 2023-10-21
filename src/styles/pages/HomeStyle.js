import styled from "styled-components";

export const HomeBack = styled.div`
  font-family: "Tilt Neon", sans-serif;

  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  flex-direction: column;
  padding: 40px 20px;
`;

export const PostLayout = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 1200px;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    margin-top: 30px;
  }
`;
export const EmptyPost = styled.div`
  font-size: 25px;
  font-weight: 600;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`;

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

export const SelectSortMethodBtn = styled.button`
  border: 2px solid black;
  font-size: 16px;
  background-color: transparent;
  border-radius: 3px 3px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 190px;
  height: 30px;
  padding: 10px;
  white-space: nowrap;
  cursor: pointer;
  color: black;
  & > span {
    color: black;
  }
`;

export const SelectSortMethodList = styled.ul`
  position: absolute;
  border: 2px solid black;
  border-radius: 0 0 3px 3px;
  border-top: none;
  width: 190px;
  z-index: 10;
  top: 30px;
  display: ${(props) => (props.isSelectSort ? "block" : "none")};
`;

export const SelectSortMethodItem = styled.li`
  /* border-left: 2px solid mediumorchid;
  border-right: 2px solid mediumorchid;
  border-bottom: 2px solid mediumorchid;
  border-radius: 3px; */
  background-color: white;
  width: 100%;
  height: 30px;
  white-space: nowrap;
  display: flex;
  padding: 10px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #b4b4b4;
  }
`;
