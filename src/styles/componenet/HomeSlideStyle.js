import styled from "styled-components";

export const HomeSlideBack = styled.div`
  font-family: "Gaegu", sans-serif;
  height: 500px;
  overflow: hidden;
  width: 100%;
  padding-bottom: 10px;
  /* max-width: 1200px; */
  @media screen and (max-width: 768px) {
    height: 300px;
  }
`;

export const HomeSlideBox = styled.div`
  height: 100%;
  transform: ${(props) =>
    props.currentNum && `translateX(-${props.currentNum * 20}%)`};
  display: flex;
  width: 100%;
  min-width: ${(props) => props.width && `${props.width * 5}px`};
`;

export const HomeSlideItem = styled.div`
  /* display: inline; */
  position: relative;
  width: 100%;
  height: 100%;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const HomeSlideBtn = styled.button``;

export const HomeSlideText = styled.h1`
  font-weight: 600;
  line-height: 120%;
  color: white;
  font-size: 30px;
  position: relative;
  bottom: 100px;
  left: 10px;
  @media screen and (max-width: 768px) {
    line-height: 130%;
    bottom: 65px;
    font-size: 18px;
  }
`;
