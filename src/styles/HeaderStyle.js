import styled from "styled-components";

// 네이게이선 배경 스타일 태그
export const HeaderBackground = styled.div`
  font-family: "Nanum Myeongjo", serif;
  height: 50px;
  width: 100%;
  padding: 0 20px;
  border-bottom: 1px solid mediumorchid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    a:nth-of-type(2) {
      display: none;
    }
  }
`;

// 애플리케이션의 이름 스타일 태그
export const AppTitleName = styled.div`
  cursor: pointer;
  font-size: 25px;
  font-weight: 600;
  color: mediumorchid;
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
`;
// Header 의 오른쪽 유저 정보 또는 로그인, 로그아웃, 회원가입 박스
export const HeaderUserInfoBox = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
// 네비게이션 요소들의 스타일 태그
export const HeaderBoxItem = styled.a`
  color: black;
  font-size: 20px;
  &:hover {
    color: mediumorchid;
  }
`;
// 로그아웃 버튼 스타일 태그
export const LogOutButton = styled.button`
  cursor: pointer;
  font-family: "Nanum Myeongjo", serif;
  font-size: 20px;
  border-style: none;
  background: transparent;
  margin-left: 20px;
  color: black;
  &:hover {
    color: mediumorchid;
  }
`;

export const HamburgerSideBar = styled.div`
  width: 210px;
  opacity: 0.8;
  background: mediumorchid;
  height: 100%;
  z-index: 3;
  top: 50px;
  position: fixed;
  /* right: -210px; */
  transition: all ease 0.5s;
  /* display: ${(props) => (props.toggle ? "block" : "none")}; */
  transition: ${(props) => (props.toggle ? "all ease 0.5s" : "")};
  right: ${(props) => (props.toggle ? "0" : "-210px")};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
export const HamburgerButtonIcon = styled.div`
  z-index: 101px;
  width: 70px;
  height: 100%;
  background: transparent;
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;
export const HamburgerIconItem = styled.div`
  width: 33px;
  height: 6px;
  border-radius: 10px;
  background-color: mediumorchid;
  z-index: 101;
  transition: all ease 0.5s;
  &:nth-child(1),
  &:nth-child(2) {
    margin-bottom: 3px;
  }
  &:nth-child(1) {
    position: ${(props) => (props.toggle ? "absolute" : "static")};
    top: ${(props) => (props.toggle ? "20px" : "0")};
    transform: ${(props) => (props.toggle ? "rotate(45deg)" : "")};
  }
  &:nth-child(2) {
    display: ${(props) => (props.toggle ? "none" : "block")};
  }
  &:nth-child(3) {
    position: ${(props) => (props.toggle ? "absolute" : "static")};
    top: ${(props) => (props.toggle ? "20px" : "0")};
    transform: ${(props) => (props.toggle ? "rotate(-45deg)" : "")};
  }
`;

export const HamburgerSideBarBox = styled.ul`
  width: 100%;
  padding: 0.5rem;
`;

export const HamburgerSideBarList = styled.li`
  margin-top: 1rem;
  cursor: pointer;
  &:hover {
    color: mediumorchid;
  }
`;
