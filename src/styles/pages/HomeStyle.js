import styled from "styled-components";

export const HomeBack = styled.div`
  font-family: "Tilt Neon", sans-serif;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 60px 20px 40px 20px;
`;

export const PostLayout = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  min-height: 522px;
  padding: 5px;
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
