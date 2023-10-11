import styled from "styled-components";
// 에러 메세지 스타일 태그
export const ErrorText = styled.div`
  margin-top: 2rem;
  color: red;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
`;
// 회원가입할 때 에러가 발생하면 에러를 보여줄 스타일 태그
export const ErrorTextPassword = styled(ErrorText)`
  margin: 0.5rem 0 0 50%;
  @media screen and (min-width: 600px) {
    margin: 0.5rem 0 0 50%;
    font-size: 1.5rem;
  }
  @media screen and (min-width: 1024px) {
    margin: 0.5rem 0 0 50%;
    font-size: 2rem;
  }
`;
// 에러없이 성공하면 보여줄 성공 메세지 스타일 태그
export const SuccessText = styled.div`
  margin-top: 0.5rem;
  color: green;
  font-size: 0.8rem;
  margin: 0.5rem 0 0 50%;
  @media screen and (min-width: 600px) {
    margin: 0.5rem 0 0 50%;
    font-size: 1.5rem;
  }
  @media screen and (min-width: 1024px) {
    margin: 0.5rem 0 0 50%;
    font-size: 2rem;
  }
`;
// 회원가입 페이지 배경 스타일 태그
export const SignupBack = styled.div`
  font-family: "Nanum Myeongjo", serif;
  background: white;
  width: 100%;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 100px;
`;
// 회원가입 폼 스타일 태그
export const SignupForm = styled.form`
  margin-top: 20px;
  width: 100%;
  border: 3px solid mediumorchid;
  border-radius: 5px;
  padding: 10px;
`;
// 이메일 입력 레이아웃 스타일 태그
export const InputEmailBox = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;
// 비밀번호 입력 레이아웃 스타일 태그
export const InputPasswordBox = styled.div`
  width: 100%;
  margin: 10px 0;
`;
// 비밀번호 확인 입력 레이아웃 스타일 태그ㄴ
export const InputPasswordCheckBox = styled.div`
  width: 100%;
  margin: 10px 0;
`;
// 이메일 입력 라벨 스타일 태그
export const InputEmailText = styled.label`
  font-size: 20px;
  display: inline-block;
  width: 100%;
  color: mediumorchid;
`;
// 이메일 입력 input 스타일 태그
export const InputEmail = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: 2px solid mediumorchid;
  padding: 10px;
  background: white;
`;
// 비밀번호 입력 라벨 스타일 태그
export const InputPasswordText = styled.label`
  font-size: 20px;
  display: inline-block;
  width: 100%;
  color: mediumorchid;
`;
// 비밀번호 입력 스타일 태그
export const InputPassword = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: 2px solid mediumorchid;
  padding: 10px;
  background: white;
`;
// 비밀번호 확인 입력 라벨 스타일 태그
export const InputPasswordCheckText = styled.label`
  display: inline-block;
  width: 100%;
  font-size: 20px;
  color: mediumorchid;
`;
// 비밀번호 확인 입력 input 스타일 태그
export const InputPasswordCheck = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: 2px solid mediumorchid;
  padding: 10px;
  background: white;
`;
// 비밀번호 확인 입력에 기존에 입력한 비밀번호와 일치하는지 꼭 입력해달라는 메세지 스타일 태그
export const InputPasswordCheckMessage = styled.div`
  font-size: 0.8rem;
  margin: 10px 0;
`;
// 회원가입 버튼 스타일 태그
export const SignupBtn = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 5px;
  border: 3px solid mediumorchid;
  background: white;
`;
// 회원가입 버튼 레이아웃 스타일 태그
export const SignupBtnBox = styled.div`
  width: 100%;
  text-align: center;
`;
// 로고 이름 스타일 태그
export const SignupTitle = styled.div`
  color: mediumorchid;
  font-size: 20px;
`;
