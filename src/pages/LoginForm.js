import { useCallback, useMemo } from "react";
import { authService } from "../reactfbase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Login from "../components/Login";
import * as LoginFormStyle from "../styles/pages/LoginFormStyle";
import { useMutation } from "react-query";
import { Loading } from "../styles/componenet/LoadingStyle";
import { PulseLoader } from "react-spinners";

const LoginForm = () => {
  const provider = useMemo(() => new GoogleAuthProvider(), []); // 구글로 로그인하기 위해서 구글 인증 프로바이더 가져오기
  const navigator = useNavigate();
  // 구글로 로그인하기 버튼 클릭 하였을 때 호출되는 콜백 함수, 팝업 창을 띄어서 사용자가 구글 계정으로 로그인 하도록 한다.
  const onclickGoogleLogin = useCallback(async () => {
    try {
      const dataGoogle = await signInWithPopup(authService, provider);
      GoogleAuthProvider.credentialFromResult(dataGoogle);
      navigator("/");
    } catch (e) {
      console.log(e);
    }
  }, [provider, navigator]);

  const { mutate: clickGoogleLogin, isLoading: googleLoginIsLoading } =
    useMutation(onclickGoogleLogin);

  return (
    <>
      <LoginFormStyle.LoginFormBack>
        <Link to="/">
          <LoginFormStyle.LoginFormTitle>
            우리동네핫플
          </LoginFormStyle.LoginFormTitle>
        </Link>

        <LoginFormStyle.LoginFormBox>
          <Login />
          <LoginFormStyle.LoginBtnBox>
            <LoginFormStyle.LoginFormGoogleLoginBtn onClick={clickGoogleLogin}>
              구글로 로그인하기
            </LoginFormStyle.LoginFormGoogleLoginBtn>

            <Link to="/signup" style={{ textDecoration: "none" }}>
              <LoginFormStyle.LoginFormSignUpBtn>
                회원가입하기
              </LoginFormStyle.LoginFormSignUpBtn>
            </Link>
          </LoginFormStyle.LoginBtnBox>
        </LoginFormStyle.LoginFormBox>
      </LoginFormStyle.LoginFormBack>
      {googleLoginIsLoading && (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      )}
    </>
  );
};

export default LoginForm;
