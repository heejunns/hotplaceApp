import styled from "styled-components";

// 네이게이선 배경 스타일 태그
export const HeaderBackground = styled.div`
  font-family: "Tilt Neon", sans-serif;
  height: 50px;
  width: 100%;
  padding: 0 20px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 100;
  }
`;

// 애플리케이션의 이름 스타일 태그
export const AppTitleName = styled.div`
  cursor: pointer;
  font-size: 25px;
  font-weight: 600;
  color: black;
  display: flex;
  align-items: center;
  margin-right: 20px;
  justify-content: center;
  white-space: nowrap;
`;
// Header 의 왼쪽 메뉴 박스
export const HeaderMenuBox = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    & > a:nth-of-type(2) {
      display: none;
    }
  }
`;
// Header 의 오른쪽 유저 정보 또는 로그인, 로그아웃, 회원가입 박스
export const HeaderUserInfoBox = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > li > a {
    text-decoration: none;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
// 네비게이션 요소들의 스타일 태그
export const HeaderBoxItem = styled.div`
  color: black;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;
// 로그아웃 버튼 스타일 태그
export const LogOutButton = styled.button`
  cursor: pointer;
  font-size: 20px;
  border-style: none;
  background: transparent;
  margin-left: 20px;
  color: black;
  display: flex;
  align-items: center;
  & > span {
    font-size: 20px;
    color: black;
  }
`;

export const HamburgerSideBar = styled.div`
  width: 210px;
  opacity: 0.8;
  background: black;
  height: 100%;
  z-index: 100;
  top: 50px;
  position: fixed;
  transition: all ease 0.5s;
  transition: ${(props) => (props.toggle ? "all ease 0.5s" : "")};
  right: ${(props) => (props.toggle ? "0" : "-210px")};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
export const HamburgerButtonIcon = styled.div`
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
export const HamburgerIconItem = styled.div`
  width: 33px;
  height: 6px;
  border-radius: 10px;
  background-color: black;
  z-index: 101;
  transition: all ease 0.3s;
  position: relative;
  cursor: pointer;
  &:nth-child(1),
  &:nth-child(2) {
    margin-bottom: 3px;
  }
  &:nth-child(1) {
    top: ${(props) => (props.toggle ? "9px" : "0")};
    transform: ${(props) => (props.toggle ? "rotate(45deg)" : "")};
  }
  &:nth-child(2) {
    display: ${(props) => (props.toggle ? "none" : "block")};
  }
  &:nth-child(3) {
    transform: ${(props) => (props.toggle ? "rotate(-45deg)" : "")};
  }
`;

export const HamburgerSideBarBox = styled.ul`
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  color: white;
  & > span {
    font-size: 20px;
    color: white;
  }
`;

export const HamburgerSideBarList = styled.li`
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 20px;
  color: white;
`;
