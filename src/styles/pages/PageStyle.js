import styled from "styled-components";

export const PageBack = styled.div`
  font-family: "Tilt Neon", sans-serif;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 60px 20px 40px 20px;
`;

// export const PageTitle = styled.h1`
//   width: 100%;
//   max-width: 1200px;
//   display: flex;
//   font-size: 30px;
// `;
export const PostBox = styled.div`
  /* border: 1px solid black; */
  margin-top: 30px;
  width: 100%;
  max-width: 1200px;
  /* height: 100%; */
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
