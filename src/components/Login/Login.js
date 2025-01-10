import {
  LoginBack,
  LoginBtn,
  LoginForm,
  LoginFormGoogleLoginBtn,
  LoginFormInput,
  LoginFormModal,
  LoginFormModalCloseBtn,
  LoginFormModalTop,
  LoginFormSignUpBtn,
  LoginFormTitle,
} from "../../styles/components/Login/Login.style";
import { useCallback, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../reactfbase";
import { useRecoilState } from "recoil";
import { LoginModalDataAtom } from "../../recoils/UserAtom";
export default function Login() {
  const [loginModal, setLoginModal] = useRecoilState(LoginModalDataAtom);
  const provider = useMemo(() => new GoogleAuthProvider(), []); // 구글로 로그인하기 위해서 구글 인증 프로바이더 가져오기
  const [inputEmail, setInputEmail] = useState(""); // 입력하는 이메일을 저장하는 state
  const [inputPassword, setInputPassword] = useState(""); // 입력하는 비밀번호를 저장하는 state
  const navigate = useNavigate();
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
        setInputEmail("");
        setInputPassword("");
      }
    },
    [inputEmail, inputPassword, navigator]
  );

  const { mutate: submitLogin, isLoading: submitLoginIsLoading } = useMutation({
    onsubmitLoginBtn,
  });
  const onclickGoogleLogin = useCallback(async () => {
    try {
      console.log("click");
      const dataGoogle = await signInWithPopup(authService, provider);
      GoogleAuthProvider.credentialFromResult(dataGoogle);
      setLoginModal((prev) => !prev);
      document.body.style.overflow = "unset";
    } catch (e) {
      console.log(e);
    }
  }, [provider, navigator]);
  return (
    <>
      <LoginFormModal>
        <LoginFormModalTop>
          <LoginFormTitle>로그인</LoginFormTitle>
          <LoginFormModalCloseBtn
            onClick={() => {
              setLoginModal((prev) => !prev);
              document.body.style.overflow = "unset";
            }}
          >
            <span class="material-symbols-outlined">close</span>
          </LoginFormModalCloseBtn>
        </LoginFormModalTop>
        <LoginForm onSubmit={submitLogin}>
          <LoginFormInput
            name="email"
            type="email"
            placeholder="아이디를 입력하세요.(이메일)"
            value={inputEmail}
            required
            onChange={onchangeInput}
          />
          <LoginFormInput
            name="password"
            type="password"
            placeholder="비밀번호를 입력 하세요."
            value={inputPassword}
            required
            onChange={onchangeInput}
          />
          <LoginBtn type="submit">로그인</LoginBtn>
          <LoginFormGoogleLoginBtn onClick={onclickGoogleLogin}>
            구글 계정으로 로그인
          </LoginFormGoogleLoginBtn>
          <LoginFormSignUpBtn
            onClick={() => {
              navigate("/signup");
              setLoginModal((prev) => !prev);
              document.body.style.overflow = "unset";
            }}
          >
            회원가입
          </LoginFormSignUpBtn>
        </LoginForm>
      </LoginFormModal>
      <LoginBack></LoginBack>;
    </>
  );
}
