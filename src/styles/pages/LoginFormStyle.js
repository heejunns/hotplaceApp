import styled from "styled-components";

// 로그인 폼 배경 스타일 태그
export const LoginFormBack = styled.div`
  font-family: "Tilt Neon", sans-serif;
  width: 100%;
  background-color: white;
  padding: 30px 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > a {
    text-decoration: none;
  }
  @media screen and (max-width: 768px) {
    padding: 70px 20px;
  }
`;
// 로그인 폼 레이아웃 스타일 태그
export const LoginFormBox = styled.div`
  margin-top: 20px;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
  height: 350px;
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  @media screen and (max-width: 768px) {
  }
`;
// 로그인 폼 내에 버튼 레이아웃 스타일 태그
export const LoginBtnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: black;
  & > a {
    width: 100%;
  }
`;
// 로그인 폼 내에 버튼 스타일 태그
export const LoginFormBtn = styled.button`
  height: 50px;
  font-size: 20px;
  width: 100%;
  border-radius: 5px;
  white-space: nowrap;
  cursor: pointer;
  color: black;
`;

export const LoginFormGoogleLoginBtn = styled(LoginFormBtn)`
  border: none;
  background-color: #1e90ff;
  color: white;
  margin-bottom: 10px;
`;

export const LoginFormSignUpBtn = styled(LoginFormBtn)`
  border: none;
  background-color: black;
  color: white;
`;
// 로그인 폼 위에 로고 이름 보여주는 스타일 태그
export const LoginFormTitle = styled.div`
  color: black;
  white-space: nowrap;
  font-size: 40px;
  @media screen and (max-wdith: 768px) {
    font-size: 30px;
  }
`;
