import styled from "styled-components";
// 에러 메세지 스타일 태그
export const PasswordCheckText = styled.div`
  width: 100%;
  margin-top: 10px;
  color: red;
  font-size: 20px;
  display: flex;
`;
// 회원가입할 때 에러가 발생하면 에러를 보여줄 스타일 태그
export const ErrorText = styled(PasswordCheckText)``;
// 에러없이 성공하면 보여줄 성공 메세지 스타일 태그
export const SuccessText = styled(PasswordCheckText)`
  color: green;
`;
// 회원가입 페이지 배경 스타일 태그
export const SignupBack = styled.div`
  font-family: "Nanum Myeongjo", serif;
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 100px;
  /* @media screen {
  } */
  @media screen and (max-width: 768px) {
    padding: 80px 10px;
  }
`;
// 회원가입 폼 스타일 태그
export const SignupForm = styled.form`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
  padding: 10px;
`;
// 이메일 입력 레이아웃 스타일 태그
export const InputBox = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 이메일 입력 라벨 스타일 태그
export const InputText = styled.label`
  font-size: 20px;
  display: block;
  margin-bottom: 10px;
  width: 100%;
  color: mediumorchid;
`;
// 이메일 입력 input 스타일 태그
export const SignupInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #b4b4b4;
  background: white;
  font-size: 15px;
  &:focus {
    border: 2px solid greenyellow;
  }
`;
// 회원가입 버튼 스타일 태그
export const SignupBtn = styled.button`
  width: 100%;
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  border: none;
  background-color: mediumorchid;
  color: white;
  cursor: pointer;
`;
// 회원가입 버튼 레이아웃 스타일 태그
export const SignupBtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// 로고 이름 스타일 태그
export const SignupTitle = styled.div`
  color: mediumorchid;
  font-size: 30px;
`;
