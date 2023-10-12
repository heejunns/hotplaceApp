import styled from "styled-components";

export const HomeBack = styled.div`
  font-family: "Nanum Myeongjo", serif;
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
  color: mediumorchid;
`;

export const SelectSortMethodBox = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 1200px;
  height: 30px;
  position: relative;
  @media screen and (max-width: 768px) {
    margin-top: 70px;
  }
`;

export const SelectSortMethodBtn = styled.button`
  border: 2px solid mediumorchid;
  background-color: transparent;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  height: 30px;
  white-space: nowrap;
`;

export const SelectSortMethodList = styled.ul`
  position: absolute;
  width: 180px;
  z-index: 10;
  top: 30px;
  display: ${(props) => (props.isSelectSort ? "block" : "none")};
`;

export const SelectSortMethodItem = styled.li`
  border: 2px solid mediumorchid;
  border-radius: 5px;
  background-color: white;
  width: 180px;
  height: 30px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: grey;
  }
`;
