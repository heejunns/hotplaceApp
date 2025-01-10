import styled from "styled-components";
// 헤더 전체 컨테이너
export const HeaderContainer = styled.header`
  font-family: "Tilt Neon", sans-serif;
  position: fixed;
  top: 0;
  z-index: 10;
  height: 50px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s linear;
  background-color: white;
  border-bottom: ${(props) => props.backColor && "1px solid #969696"};
  @media screen and (max-width: 768px) {
    justify-content: space-between;
  }
`;

// 헤더 내부 박스
export const HeaderBox = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
// 애플리케이션의 이름 스타일 태그
export const AppName = styled.h1`
  cursor: pointer;
  font-size: 25px;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-right: 20px;
  justify-content: center;
  white-space: nowrap;
  a {
    color: black;
  }
`;
// 헤더 내부의 네비게이션
export const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  // 로그인 스타일
  & > li:nth-last-of-type(1) {
    margin-left: 50px;
  }
`;
// 네비게이션 요소들의 스타일 태그
export const HeaderNavItem = styled.li`
  font-size: 20px;
  list-style: none;
  margin-right: 10px;
  opacity: 1;
  @media screen and (max-width: 768px) {
    display: none;
  }
  & > a {
    text-decoration: none;
    color: ${(props) => (props.currentPath ? "aqua" : "black")};
  }

  &:hover {
    opacity: 1;
  }
  & > a > img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    z-index: 1000;
  }
`;
// 로그아웃 버튼 스타일 태그
export const LogOutButton = styled.button`
  cursor: pointer;
  font-size: 20px;
  border-style: none;
  background: transparent;
  margin-left: 20px;
  display: flex;
  align-items: center;
  & > span {
    font-size: 20px;
  }
`;
// 햄버거 사이드바가 열렸을때 배경화면
export const SideBarBackground = styled.div`
  position: absolute;
  top: 300px;
  left: 0;
  width: 100%;
  height: ${(props) => (props.toggle ? "100vh" : "0")};
  background-color: black;
  opacity: 0.7;
`;
// 사이드 바
export const SideBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 20px;
  width: 100%;
  background: white;
  height: ${(props) => (props.toggle ? "300px" : "0")};
  z-index: 100;
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
export const HamburgerButton = styled.div`
  width: 70px;
  background: transparent;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;
export const HamburgerItem = styled.div`
  background-color: black;
  width: 25px;
  height: 3px;
  border-radius: 10px;
  z-index: 101;
  transition: all ease 0.3s;
  position: relative;
  cursor: pointer;
  &:nth-child(1),
  &:nth-child(2) {
    margin-bottom: 3px;
  }
  &:nth-child(1) {
    top: ${(props) => (props.toggle ? "6px" : "0")};
    transform: ${(props) => (props.toggle ? "rotate(45deg)" : "")};
  }
  &:nth-child(2) {
    display: ${(props) => (props.toggle ? "none" : "block")};
  }
  &:nth-child(3) {
    transform: ${(props) => (props.toggle ? "rotate(-45deg)" : "")};
  }
`;

export const SideBarList = styled.ul`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > a {
    text-decoration: none;
    color: black;
    cursor: pointer;
  }
`;

export const SideBarLogOutButton = styled.button`
  cursor: pointer;
  padding: 0;
  margin-top: 10px;
  border-style: none;
  background-color: transparent;
  display: ${(props) => (props.toggle ? "flex" : "none")};
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  & > span {
    font-size: 20px;
    color: white;
  }
`;

export const SideBarItem = styled.li`
  font-weight: 600;
  margin-top: 10px;
  display: ${(props) => (props.toggle ? "flex" : "none")};
  font-size: 20px;
  & > a {
    color: black;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
