import styled from "styled-components";

export const HomeSlideBack = styled.div`
  display: flex;
  justify-content: center;
  background-image: url(${(props) => props.homeBack});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  font-family: "Gaegu", sans-serif;
  height: 500px;
  overflow: hidden;
  width: 100%;
  @media screen and (max-width: 768px) {
    height: 300px;
  }
`;

export const TextBox = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  max-width: 1200px;
`;

export const Text = styled.h3`
  font-weight: 600;
  line-height: 120%;
  color: white;
  font-size: 30px;
  @media screen and (max-width: 768px) {
    line-height: 130%;
    bottom: 65px;
    font-size: 18px;
  }
`;
