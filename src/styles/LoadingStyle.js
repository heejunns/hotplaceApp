import styled from "styled-components";

// 처음 로딩 될때 화면을 보여줄 컴포넌트
export const Loading = styled.div`
  width: 100%;
  height: 100%;
  font-size: 100px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  z-index: 100;
`;
