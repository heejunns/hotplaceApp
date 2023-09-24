import styled from "styled-components";

export const HomeBack = styled.div`
  font-family: "Nanum Myeongjo", serif;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  min-width: 370px;
  width: ${(props) => (props.hamburgerClickInfo ? "100vw" : "")};
  height: ${(props) => (props.hamburgerClickInfo ? "100vh" : "")};
  /* z-index: ${(props) => (props.hamburgerClickInfo ? "100" : "")}; */
  background-color: ${(props) =>
    props.hamburgerClickInfo ? "rgba(0,0,0,0.2)" : ""};
  position: ${(props) => (props.hamburgerClickInfo ? "fixed" : "static")};
  top: ${(props) => (props.hamburgerClickInfo ? "0" : "")};
  right: ${(props) => (props.hamburgerClickInfo ? "0" : "")};
`;

export const PostLayout = styled.div`
  height: 100%;
  width: 80%;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 390px) and (min-height: 844px) {
    width: 85%;
  }
  @media screen and (min-width: 768px) and (min-height: 1024px) {
    width: 70%;
  }
  @media screen and (min-width: 400px) {
    width: 70%;
  }
  @media screen and (min-width: 820px) {
    width: 60%;
  }
  @media screen and (min-width: 1000px) {
    width: 50%;
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
