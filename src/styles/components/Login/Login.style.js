import styled from "styled-components";

export const LoginBack = styled.div`
  width: 100%;
  height: 100vh;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0px;
  z-index: 100;
  opacity: 0.7;
`;

export const LoginFormModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  width: 100%;
  max-width: 400px;
  min-width: 300px;
  border-radius: 20px;
  background-color: white;
  padding: 20px;
`;

export const LoginFormModalTop = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
// 로그인 폼 위에 로고 이름 보여주는 스타일 태그
export const LoginFormTitle = styled.div`
  color: black;
  white-space: nowrap;
  font-size: 25px;
  @media screen and (max-wdith: 768px) {
    font-size: 30px;
  }
`;

export const LoginFormModalCloseBtn = styled.button`
  position: absolute;
  right: 0;
  top: 10px;
  background-color: white;
  border: none;
`;
// 로그인 폼 스타일 태그
export const LoginForm = styled.form`
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

// 로그인 폼 내에 input 스타일 태그
export const LoginFormInput = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a0a0a0;
  padding: 10px;
  margin: 12px 0;
  &:focus {
    border: 2px solid #6edcdc;
  }
`;

// 이메일, 비밀번호 입력 후 클릭하는 버튼 스타일 태그
export const LoginBtn = styled.button`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  background-color: #a0a0a0;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
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
  margin: 10px 0;
`;

export const LoginFormSignUpBtn = styled(LoginFormBtn)`
  border: none;
  background-color: black;
  color: white;
`;
