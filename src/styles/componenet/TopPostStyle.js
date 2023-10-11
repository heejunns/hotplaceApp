import styled from "styled-components";

export const TopPostBack = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 1200px;
  height: 400px;
  border: 1px solid mediumorchid;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
`;

export const TopPostBox = styled.div`
  min-width: 2950px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 15px;
  transition: 2s ease;
  transform: ${(props) =>
    props.topBoxPx > 0
      ? `translateX(${props.topBoxPx}px)`
      : `translateX(${props.topBoxPx}px)`};
`;

export const TopPostBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: absolute;
  white-space: nowrap;
  cursor: pointer;
`;

export const TopPostPrevBtn = styled(TopPostBtn)`
  top: 175px;
  left: 0;
  display: ${(props) => (props.topBoxPx === 15 ? "none" : "block")};
`;

export const TopPostNextBtn = styled(TopPostBtn)`
  top: 175px;
  right: 0;
  display: ${(props) => (props.topBoxPx === -2359 ? "none" : "bloack")};
`;

export const TopPostTitleBox = styled.div`
  width: 100%;
  margin-top: 20px;
  max-width: 1200px;
  height: 30px;
  display: flex;
  align-items: center;
`;

export const TopPostTitleText = styled.h1`
  font-size: 20px;
  font-weight: 500;
`;
