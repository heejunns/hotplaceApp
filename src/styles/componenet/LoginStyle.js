import styled from "styled-components";

// 로그인 폼 스타일 태그
export const LoginForm = styled.form`
  text-align: center;
  height: 200px;
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
  border: 2px solid #b4b4b4;
  padding: 15px;
  &:focus {
    border: 3px solid greenyellow;
  }
`;
// 이메일, 비밀번호 입력 후 클릭하는 버튼 스타일 태그
export const LoginBtn = styled.button`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  background-color: mediumorchid;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;
