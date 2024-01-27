import styled from "styled-components";

export const TopPostBack = styled.div`
  width: 100%;
  padding: 20px 0 10px 0;
  max-width: 1200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
  @media screen and (max-width: 768px) {
    overflow-x: scroll;
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #969696;
      border-radius: 10px;
    }
  }
`;

export const TopPostBox = styled.div`
  min-width: 2950px;
  padding: 5px;
  display: flex;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 15px;
  transition: 1s ease-in-out;
  transform: ${(props) =>
    props.topBoxPx > 0
      ? `translateX(${props.topBoxPx}px)`
      : `translateX(${props.topBoxPx}px)`};
`;

export const TopPostBtn = styled.button`
  width: 40px;
  box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 10px 0;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  opacity: 0.7;
  position: absolute;
  white-space: nowrap;
  cursor: pointer;
  & > span {
    opacity: 1;
    color: black;
    font-size: 25px;
  }
  &:hover {
    opacity: 1;
  }
`;

export const TopPostPrevBtn = styled(TopPostBtn)`
  top: 125px;
  left: 10px;
  display: ${(props) => (props.topBoxPx === 0 ? "none" : "block")};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const TopPostNextBtn = styled(TopPostBtn)`
  top: 125px;
  right: 15px;
  display: ${(props) => (props.topBoxPx === -2400 ? "none" : "block")};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const TopPostTitleBox = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 1200px;
  height: 30px;
  display: flex;
  align-items: center;
`;

export const TopPostTitleText = styled.h1`
  color: black;
  font-size: 25px;
  font-weight: 700;
  font-family: "Tilt Neon", sans-serif;
`;
