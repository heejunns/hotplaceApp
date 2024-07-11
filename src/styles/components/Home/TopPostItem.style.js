import styled from "styled-components";

// 게시글 하나의 전체 백그라운드 스타일 태그
export const TopPostItemContainer = styled.div`
  position: relative;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 10px 0;
  width: 285px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 18px;
  border-radius: 10px;
  background-color: white;
`;

export const Ranking = styled.h3`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 23px;
  font-weight: 600;
  color: white;
`;
