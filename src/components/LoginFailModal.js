import * as LoginFailModalStyle from "../styles/components/LoginFailModalStyle";
const LoginFailModal = ({ setIsLoginFailModal }) => {
  const onclickCheckBtn = () => {
    setIsLoginFailModal(false);
  };
  return (
    <LoginFailModalStyle.LoginFailModalBack>
      <LoginFailModalStyle.LoginFailModalBox>
        <LoginFailModalStyle.LoginFailModalText>
          이메일 또는 비밀번호가 일치하지 않습니다. <br />
          다시 로그인 해주세요.
        </LoginFailModalStyle.LoginFailModalText>
        <LoginFailModalStyle.LoginFailModalBtnBox>
          <LoginFailModalStyle.CheckBtn onClick={onclickCheckBtn}>
            확인
          </LoginFailModalStyle.CheckBtn>
        </LoginFailModalStyle.LoginFailModalBtnBox>
      </LoginFailModalStyle.LoginFailModalBox>
    </LoginFailModalStyle.LoginFailModalBack>
  );
};

export default LoginFailModal;
