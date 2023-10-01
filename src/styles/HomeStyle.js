import styled from "styled-components";

export const HomeBack = styled.div`
  font-family: "Nanum Myeongjo", serif;
  width: 100%;
  height: 100%;
  padding: 0 200px;
  background: white;
  background-color: ${(props) =>
    props.hamburgerClickInfo ? "rgba(0,0,0,0.2)" : ""};
`;

export const PostLayout = styled.div`
  height: 100%;
  margin-top: 30px;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
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
