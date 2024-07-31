import styled from "styled-components";

export const TopPostBack = styled.div`
  width: 100%;
  padding: 20px 0 10px 0;
  max-width: 1200px;
  overflow-y: hidden;
  overflow-x: scroll;
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
  top: 50%;
  transform: translate(0, -50%);
  width: 50px;
  box-shadow: rgba(0, 0, 0, 0.5) 1px 1px 10px 0;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  border: none;
  opacity: 0.7;
  position: absolute;
  cursor: pointer;
  & > span {
    opacity: 0.7;
    color: black;
    font-size: 40px;
  }
  &:hover {
    opacity: 1;
    span {
      opacity: 1;
      color: black;
      font-size: 40px;
    }
  }
`;

export const TopPostPrevBtn = styled(TopPostBtn)`
  left: 10px;
  display: ${(props) => (props.topBoxPx === 0 ? "none" : "block")};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const TopPostNextBtn = styled(TopPostBtn)`
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
