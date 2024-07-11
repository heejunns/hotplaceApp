import { useCallback, useMemo } from "react";
import { authService } from "../reactfbase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Login from "../components/Login";
import * as S from "../styles/pages/LoginForm.style";
import { Loading } from "../styles/components/Loading.style";
import { PulseLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  const provider = useMemo(() => new GoogleAuthProvider(), []); // 구글로 로그인하기 위해서 구글 인증 프로바이더 가져오기
  const navigator = useNavigate();
  // 구글로 로그인하기 버튼 클릭 하였을 때 호출되는 콜백 함수, 팝업 창을 띄어서 사용자가 구글 계정으로 로그인 하도록 한다.
  const onclickGoogleLogin = useCallback(async () => {
    try {
      console.log("click");
      const dataGoogle = await signInWithPopup(authService, provider);
      GoogleAuthProvider.credentialFromResult(dataGoogle);
      navigator("/");
    } catch (e) {
      console.log(e);
    }
  }, [provider, navigator]);

  // const { mutate: clickGoogleLogin, isLoading: googleLoginIsLoading } =
  //   useMutation({ onclickGoogleLogin });

  return (
    <>
      <S.LoginFormBack>
        <Link to="/">
          <S.LoginFormTitle>우리동네핫플</S.LoginFormTitle>
        </Link>

        <S.LoginFormBox>
          <Login />
          <S.LoginBtnBox>
            <S.LoginFormGoogleLoginBtn onClick={onclickGoogleLogin}>
              구글로 로그인하기
            </S.LoginFormGoogleLoginBtn>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <S.LoginFormSignUpBtn>회원가입하기</S.LoginFormSignUpBtn>
            </Link>
          </S.LoginBtnBox>
        </S.LoginFormBox>
      </S.LoginFormBack>
      {/* {googleLoginIsLoading && (
        <Loading>
          <PulseLoader color="black" size={20} />
        </Loading>
      )} */}
    </>
  );
};

export default LoginForm;
