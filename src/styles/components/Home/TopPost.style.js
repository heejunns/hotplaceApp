import styled from "styled-components";

export const TopPostOutContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
`;
export const TopPostInnerContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  margin: 0 10px;
  overflow: hidden;
  display: flex;
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
  max-width: 3240px;
  padding: 5px;
  display: flex;
  gap: 15px;
  transition: 1s ease-in-out;
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
  border-radius: 15px;
  border: 1px solid #c8c8c8;
  opacity: 1;
  cursor: pointer;
  & > span {
    color: black;
    font-size: 45px;
  }
`;

export const TopPostPrevBtn = styled(TopPostBtn)`
  opacity: ${(props) => (props.topBoxPx === 0 ? "0" : "1")};
  pointer-events: ${(props) => (props.topBoxPx === 0 ? "none" : "auto")};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const TopPostNextBtn = styled(TopPostBtn)`
  opacity: ${(props) => (props.topBoxPx === -2160 ? "0" : "1")};
  pointer-events: ${(props) => (props.topBoxPx === -2160 ? "none" : "auto")};
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
