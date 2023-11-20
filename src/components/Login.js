import { useCallback, useState } from "react";
import { authService } from "../reactfbase";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as LoginStyle from "../styles/componenet/LoginStyle";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import LoginFailModal from "./LoginFailModal";
import { Loading } from "../styles/componenet/LoadingStyle";
import { PulseLoader } from "react-spinners";
const Login = () => {
  const [inputEmail, setInputEmail] = useState(""); // 입력하는 이메일을 저장하는 state
  const [inputPassword, setInputPassword] = useState(""); // 입력하는 비밀번호를 저장하는 state
  const [isLoginFailModal, setIsLoginFailModal] = useState(false);
  const navigator = useNavigate();
  // 이메일과 비밀번호를 입력하면 input 태그에서 onchange 이벤트가 발생하면 호출
  const onchangeInput = useCallback((e) => {
    e.target.name === "email"
      ? setInputEmail(e.target.value)
      : setInputPassword(e.target.value);
  }, []);

  // 로그인 버튼 클릭 했을 때 호출
  const onsubmitLoginBtn = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        // 로그인
        await signInWithEmailAndPassword(
          authService,
          inputEmail,
          inputPassword
        );
        navigator("/");
      } catch (error) {
        setIsLoginFailModal(true);
        console.log("여기 아니야?");
        // console.log(error.message);
        setInputEmail("");
        setInputPassword("");
      }
    },
    [inputEmail, inputPassword, navigator]
  );

  const { mutate: submitLogin, isLoading: submitLoginIsLoading } =
    useMutation(onsubmitLoginBtn);
  return (
    <>
      <LoginStyle.LoginForm onSubmit={submitLogin}>
        <LoginStyle.LoginFormInput
          name="email"
          type="email"
          placeholder="아이디를 입력하세요.(이메일)"
          value={inputEmail}
          required
          onChange={onchangeInput}
        />
        <LoginStyle.LoginFormInput
          name="password"
          type="password"
          placeholder="비밀번호를 입력 하세요."
          value={inputPassword}
          required
          onChange={onchangeInput}
        />
        <LoginStyle.LoginBtn type="submit">로그인</LoginStyle.LoginBtn>
      </LoginStyle.LoginForm>
      {isLoginFailModal && (
        <LoginFailModal setIsLoginFailModal={setIsLoginFailModal} />
      )}
      {submitLoginIsLoading && (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      )}
    </>
  );
};

export default Login;
